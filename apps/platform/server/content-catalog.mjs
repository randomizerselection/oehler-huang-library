import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CONTENT_FILES, validateContentCatalog } from "@oehler-huang/contracts/content";

export function normalizeFillBlank(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.!?\u3002\uff01\uff1f]+$/u, "")
    .trim()
    .toLocaleLowerCase("en");
}

export function createContentCatalog(libraryRoot) {
  const manifest = JSON.parse(readFileSync(join(libraryRoot, CONTENT_FILES.manifest), "utf8"));
  const bank = JSON.parse(readFileSync(join(libraryRoot, CONTENT_FILES.bank), "utf8"));
  validateContentCatalog(manifest, bank);
  const items = new Map(manifest.items.map((item) => [item.id, item]));
  const quizzes = new Map(bank.quizzes.map((quiz) => [quiz.id, quiz]));

  function publicManifest() {
    return manifest;
  }

  function get(id) {
    return items.get(id) ?? quizzes.get(id) ?? null;
  }

  function quiz(id) {
    return quizzes.get(id) ?? null;
  }

  function scoreQuiz(definition, answers = {}) {
    let score = 0;
    let maxScore = 0;
    const normalizedAnswers = {};
    const questions = definition.questions.map((question) => {
      const points = Number(question.points) || 1;
      maxScore += points;
      const supplied = answers[question.id];
      const multipleChoiceAnswer = supplied === "" || supplied == null ? null : Number(supplied);
      const normalized = question.type === "multipleChoice"
        ? (Number.isInteger(multipleChoiceAnswer) ? multipleChoiceAnswer : null)
        : normalizeFillBlank(supplied);
      normalizedAnswers[question.id] = normalized;
      const correct = question.type === "multipleChoice"
        ? normalized === Number(question.answer)
        : (question.acceptedAnswers || [question.answer]).some((answer) => normalizeFillBlank(answer) === normalized);
      const displayAnswer = question.type === "multipleChoice"
        ? (question.choices || [])[Number(question.answer)] ?? String(question.answer)
        : (question.acceptedAnswers || [question.answer])[0];
      if (correct) score += points;
      return {
        id: question.id,
        question_id: question.id,
        type: question.type,
        correct,
        points: correct ? points : 0,
        max_points: points,
        submitted_answer: question.type === "multipleChoice" ? normalized : String(supplied ?? "").trim(),
        raw_answer: supplied ?? "",
        correct_answer: question.type === "multipleChoice" ? question.answer : (question.acceptedAnswers || [question.answer])[0],
        correct_answer_text: displayAnswer,
        explanation: question.explanation || ""
      };
    });
    return { normalized_answers: normalizedAnswers, score, max_score: maxScore, percentage: maxScore ? Math.round((score / maxScore) * 100) : 0, questions };
  }

  return Object.freeze({ manifest: publicManifest, get, quiz, scoreQuiz, quizCount: () => quizzes.size });
}
