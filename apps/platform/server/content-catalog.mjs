import { readFileSync } from "node:fs";
import { join } from "node:path";

function normalizeAnswer(value) {
  return String(value ?? "").normalize("NFKC").trim().toLowerCase().replace(/\s+/g, " ");
}

export function createContentCatalog(libraryRoot) {
  const manifest = JSON.parse(readFileSync(join(libraryRoot, "generated", "content-manifest.json"), "utf8"));
  const bank = JSON.parse(readFileSync(join(libraryRoot, "generated", "quiz-bank.json"), "utf8"));
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
    const responses = definition.questions.map((question) => {
      const points = Number(question.points) || 1;
      maxScore += points;
      const supplied = answers[question.id];
      const correct = question.type === "multipleChoice"
        ? Number(supplied) === Number(question.answer)
        : (question.acceptedAnswers || [question.answer]).some((answer) => normalizeAnswer(answer) === normalizeAnswer(supplied));
      if (correct) score += points;
      return {
        question_id: question.id,
        correct,
        points: correct ? points : 0,
        max_points: points,
        explanation: question.explanation || ""
      };
    });
    return { score, max_score: maxScore, percentage: maxScore ? Math.round((score / maxScore) * 100) : 0, responses };
  }

  return Object.freeze({ manifest: publicManifest, get, quiz, scoreQuiz });
}
