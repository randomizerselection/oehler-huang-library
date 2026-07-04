(function attachInvestmentGeneratorContext(global) {
  const MATERIAL_TARGETS = Object.freeze({
    deck: {
      label: "Lesson deck",
      output: "slides.js",
      requiredFields: [
        "guidingQuestion",
        "coreClaim",
        "retrievalBase",
        "newKnowledge",
        "formativeAssessment",
        "exitTicket",
        "primaryOutput",
        "artifactBlueprint.deckArc",
      ],
    },
    handout: {
      label: "Lesson handout",
      output: "print handout",
      requiredFields: [
        "handoutContract",
        "terms",
        "sourcePack",
        "artifactBlueprint.handoutBlocks",
        "studentOutput",
      ],
    },
    quiz: {
      label: "Follow-up quiz",
      output: "quiz.js",
      requiredFields: [
        "terms",
        "coreClaim",
        "formulaOrNoFormula",
        "misconception",
        "exitTicket",
        "primaryOutput",
      ],
    },
    exam: {
      label: "Checkpoint exam item",
      output: "exam item",
      requiredFields: [
        "assessmentBlueprint",
        "examPattern",
        "sourcePack",
        "primaryOutput",
        "misconception",
      ],
    },
    textbook: {
      label: "Compiled handout-book chapter",
      output: "compiled-handout-book.md section",
      requiredFields: [
        "writtenArtifactRule",
        "textbookAssembly",
        "artifactBlueprint.handoutBlocks",
        "primaryOutput",
      ],
    },
  });

  const MATERIAL_RULES = Object.freeze({
    deck: [
      "Use the deck arc as the slide spine: hook, retrieval, teach, practice, output rehearsal and exit ticket.",
      "Keep visible slide labels student-facing while preserving ILA and retrieval logic in notes.",
      "Use the source pack to freeze evidence before adding charts, figures or screenshots.",
    ],
    handout: [
      "Use exactly the six handout blocks in order.",
      "Keep vocabulary, source metadata, evidence task, misconception check and individual output aligned to the deck.",
      "Do not add textbook-only teaching content to the lesson handout.",
    ],
    quiz: [
      "Retrieve the same terms, formula or judgement rule, misconception correction and exit output taught in the lesson.",
      "Avoid quiz items that require later-course content listed in avoidOverlap.",
      "Include at least one evidence-before-opinion or source-discipline check when relevant.",
    ],
    exam: [
      "Use the assessment blueprint for command word, marks, stimulus, calculation and judgement.",
      "Use dated source evidence and state what the evidence can and cannot prove.",
      "Assess the lesson output without asking for personal investment advice.",
    ],
    textbook: [
      "Treat the lesson handout as the chapter.",
      "Use only light front matter, contents and unit dividers around the handout sequence.",
      "Do not write separate textbook-only teaching chapters.",
    ],
  });

  function loadDefaultCourseMap() {
    if (global.INVEST && global.INVEST.courseMap) return global.INVEST.courseMap;
    if (typeof require === "function") return require("./course-map-data.js");
    return null;
  }

  const defaultCourseMap = loadDefaultCourseMap();

  function clone(value) {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  }

  function fail(message) {
    throw new Error(`Investment generator context: ${message}`);
  }

  function getMap(map = defaultCourseMap) {
    if (!map || !Array.isArray(map.lessons)) {
      fail("course map is missing or does not contain lessons");
    }
    return map;
  }

  function normaliseLessonNumber(lessonNumber) {
    const numeric = Number(lessonNumber);
    if (!Number.isInteger(numeric) || numeric < 1 || numeric > 30) {
      fail(`lesson must be an integer from 1 to 30, got ${lessonNumber}`);
    }
    return numeric;
  }

  function findLesson(lessonNumber, map = defaultCourseMap) {
    const courseMap = getMap(map);
    const numeric = normaliseLessonNumber(lessonNumber);
    const lesson = courseMap.lessons.find((item) => item.lesson === numeric);
    if (!lesson) fail(`lesson ${numeric} does not exist in the course map`);
    return lesson;
  }

  function baseCourseContext(map) {
    return {
      version: map.version,
      courseTitle: map.courseTitle,
      mapTitle: map.mapTitle,
      writtenArtifactRule: map.writtenArtifactRule,
      handoutContract: map.handoutContract,
      textbookAssembly: map.textbookAssembly,
      sourceFitAudit: map.sourceFitAudit,
      generatorAccess: map.generatorAccess,
    };
  }

  function lessonSummary(lesson) {
    return {
      lesson: lesson.lesson,
      unit: lesson.unit,
      unitTitle: lesson.unitTitle,
      company: lesson.company,
      caseRole: lesson.caseRole,
      guidingQuestion: lesson.guidingQuestion,
      guidingQuestionZh: lesson.guidingQuestionZh,
      coreClaim: lesson.coreClaim,
      primaryOutput: lesson.primaryOutput,
      caseReview: lesson.caseReview,
      availableTargets: ["lesson", ...Object.keys(MATERIAL_TARGETS)],
    };
  }

  function lessonGeneratorBrief(lesson) {
    const brief = lesson.cardGenerator || lesson;
    return {
      retrievalBase: brief.retrievalBase,
      newKnowledge: brief.newKnowledge,
      avoidOverlap: brief.avoidOverlap,
      misconception: brief.misconception,
      evidenceTask: brief.evidenceTask,
      studentOutput: brief.studentOutput,
      futureReuse: lesson.futureReuse,
    };
  }

  function courseRules(map) {
    const rules = map.generatorAccess && Array.isArray(map.generatorAccess.rules)
      ? map.generatorAccess.rules
      : [];
    return [
      ...rules,
      "Use this generated context instead of copying lesson scope by hand.",
    ];
  }

  function getCourseGeneratorContext(map = defaultCourseMap) {
    const courseMap = getMap(map);
    return clone({
      schemaVersion: 1,
      contextType: "course-generator-index",
      course: baseCourseContext(courseMap),
      units: courseMap.units,
      examCheckpoints: courseMap.examCheckpoints,
      materialTargets: MATERIAL_TARGETS,
      lessons: courseMap.lessons.map(lessonSummary),
      generationRules: courseRules(courseMap),
    });
  }

  function getLessonGeneratorContext(lessonNumber, map = defaultCourseMap) {
    const courseMap = getMap(map);
    const lesson = findLesson(lessonNumber, courseMap);
    return clone({
      schemaVersion: 1,
      contextType: "lesson-generator-context",
      course: baseCourseContext(courseMap),
      lesson: lessonSummary(lesson),
      guidingQuestion: {
        en: lesson.guidingQuestion,
        zh: lesson.guidingQuestionZh,
      },
      generatorBrief: lessonGeneratorBrief(lesson),
      teachingContract: {
        sequenceRole: lesson.sequenceRole,
        focus: lesson.focus,
        coreClaim: lesson.coreClaim,
        caseRole: lesson.caseRole,
        primaryOutput: lesson.primaryOutput,
        formativeAssessment: lesson.formativeAssessment,
        exitTicket: lesson.exitTicket,
        futureReuse: lesson.futureReuse,
      },
      contentContract: {
        terms: lesson.terms,
        formulaOrNoFormula: lesson.formulaOrNoFormula,
        evidenceSummary: lesson.evidenceSummary,
        check: lesson.check,
      },
      evidenceContract: {
        evidenceTask: lesson.evidenceTask,
        sourcePack: lesson.sourcePack,
        caseReview: lesson.caseReview,
      },
      artifactContract: {
        handoutSections: lesson.handoutSections,
        artifactBlueprint: lesson.artifactBlueprint,
      },
      assessmentContract: {
        formativeAssessment: lesson.formativeAssessment,
        exitTicket: lesson.exitTicket,
        assessmentBlueprint: lesson.assessmentBlueprint,
        examPattern: lesson.examPattern,
      },
      generationRules: courseRules(courseMap),
    });
  }

  function getLessonMaterialContext(lessonNumber, target = "handout", map = defaultCourseMap) {
    const targetKey = String(target || "").toLowerCase();
    if (!MATERIAL_TARGETS[targetKey]) {
      fail(`target must be one of ${Object.keys(MATERIAL_TARGETS).join(", ")}, got ${target}`);
    }

    const lessonContext = getLessonGeneratorContext(lessonNumber, map);
    return clone({
      schemaVersion: 1,
      contextType: "lesson-material-generator-context",
      target: targetKey,
      materialTarget: MATERIAL_TARGETS[targetKey],
      course: lessonContext.course,
      lesson: lessonContext.lesson,
      guidingQuestion: lessonContext.guidingQuestion,
      generatorBrief: lessonContext.generatorBrief,
      requiredInputs: {
        teachingContract: lessonContext.teachingContract,
        contentContract: lessonContext.contentContract,
        evidenceContract: lessonContext.evidenceContract,
        artifactContract: lessonContext.artifactContract,
        assessmentContract: lessonContext.assessmentContract,
      },
      generationRules: [
        ...(MATERIAL_RULES[targetKey] || []),
        ...lessonContext.generationRules,
      ],
    });
  }

  const api = {
    MATERIAL_TARGETS,
    getCourseGeneratorContext,
    getLessonGeneratorContext,
    getLessonMaterialContext,
  };

  global.INVEST = global.INVEST || {};
  global.INVEST.generatorContext = api;

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
