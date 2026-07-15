(function attachInvestmentGeneratorContext(global) {
  const SYLLABUS_SOURCES = Object.freeze({
    default: "./course-map-financial-decisions-data.js",
    "company-analysis": "./course-map-data.js",
    "financial-decisions": "./course-map-financial-decisions-data.js",
  });

  const MATERIAL_TARGETS = Object.freeze({
    deck: {
      label: "Lesson deck",
      output: "slides.js",
      requiredFields: [
        "guidingQuestion",
        "decisionFirst",
        "coreClaim",
        "retrievalBase",
        "newKnowledge",
        "formativeAssessment",
        "exitTicket",
        "primaryOutput",
        "investmentAction",
        "stockMarketGame",
        "artifactBlueprint.deckArc",
      ],
    },
    handout: {
      label: "Lesson handout",
      output: "print handout",
      requiredFields: [
        "handoutContract",
        "groundedScenario",
        "terms",
        "sourcePack",
        "decisionFirst",
        "artifactBlueprint.handoutBlocks",
        "investmentAction",
        "stockMarketGame",
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
        "investmentAction",
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
        "investmentAction",
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
        "investmentAction",
        "primaryOutput",
      ],
    },
  });

  const MATERIAL_RULES = Object.freeze({
    deck: [
        "Use the deck arc as the slide spine: hook, retrieval, teach, practice, output rehearsal and exit ticket.",
        "Preserve the decisionFirst contract: starter dilemma, first judgement, missing evidence, key idea, try it, misconception check and exit judgement.",
        "Include the lesson investmentAction so students finish with a concrete next action, not only a concept summary.",
        "Use the lesson stockMarketGame action as a substantial slide-deck lab before the individual exit; do not reduce it to a note, optional extension or final reminder.",
        "Keep visible slide labels student-facing while preserving ILA and retrieval logic in notes.",
        "Use the source pack to freeze evidence before adding charts, figures or screenshots.",
    ],
    handout: [
      "Use exactly the six handout blocks in order.",
        "Begin with a short grounded scenario that includes at least one real, dated, source-backed figure or statement and clearly labels every mock or anonymised detail.",
        "Reuse the same scenario evidence in a projected lesson activity and the handout Evidence and Data Analysis task; state what the evidence cannot prove.",
        "Build the Evidence and Data Analysis block as a Section A-style worksheet: case information followed by structured questions.",
        "End the worksheet with the lesson investmentAction: consider, watch, avoid, compare with another choice or gather more evidence.",
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
      "Assess the analyse-why chain and the evidence-based classroom judgement, not personal financial advice.",
    ],
    textbook: [
      "Treat the lesson handout as the chapter.",
      "Use only light front matter, contents and unit dividers around the handout sequence.",
      "Do not write separate textbook-only teaching chapters.",
    ],
  });

  function normaliseSyllabusKey(syllabus = "default") {
    const key = String(syllabus || "default").toLowerCase();
    if (!SYLLABUS_SOURCES[key]) {
      fail(`syllabus must be one of ${Object.keys(SYLLABUS_SOURCES).join(", ")}, got ${syllabus}`);
    }
    return key;
  }

  function loadCourseMap(syllabus = "default") {
    const key = normaliseSyllabusKey(syllabus);
    if (typeof require === "function") return require(SYLLABUS_SOURCES[key]);
    if (global.INVEST && global.INVEST.courseMap) return global.INVEST.courseMap;
    return null;
  }

  function loadDefaultCourseMap() {
    return loadCourseMap("default");
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
    if (typeof map === "string") return getMap(loadCourseMap(map));
    if (!map || !Array.isArray(map.lessons)) {
      fail("course map is missing or does not contain lessons");
    }
    return map;
  }

  function normaliseLessonNumber(lessonNumber, map = defaultCourseMap) {
    const courseMap = getMap(map);
    const maxLesson = courseMap.lessons.length;
    const numeric = Number(lessonNumber);
    if (!Number.isInteger(numeric) || numeric < 1 || numeric > maxLesson) {
      fail(`lesson must be an integer from 1 to ${maxLesson}, got ${lessonNumber}`);
    }
    return numeric;
  }

  function findLesson(lessonNumber, map = defaultCourseMap) {
    const courseMap = getMap(map);
    const numeric = normaliseLessonNumber(lessonNumber, courseMap);
    const lesson = courseMap.lessons.find((item) => item.lesson === numeric);
    if (!lesson) fail(`lesson ${numeric} does not exist in the course map`);
    return lesson;
  }

  function baseCourseContext(map) {
    return {
      version: map.version,
      syllabusKey: map.syllabusKey || "default",
      courseTitle: map.courseTitle,
      mapTitle: map.mapTitle,
      currencyRule: map.currencyRule,
      writtenArtifactRule: map.writtenArtifactRule,
      definitionOverview: map.definitionOverview,
      groundedScenarioContract: map.groundedScenarioContract,
      handoutContract: map.handoutContract,
      textbookAssembly: map.textbookAssembly,
      sourceFitAudit: map.sourceFitAudit,
      generatorAccess: map.generatorAccess,
      practicalInvestingBoundary: map.practicalInvestingBoundary,
      stockMarketGameIntegration: map.stockMarketGameIntegration,
      decisionFirstSyllabus: map.decisionFirstSyllabus,
      investmentWorkflow: map.investmentWorkflow,
      simpleLessonStructure: map.simpleLessonStructure,
    };
  }

  function lessonSummary(lesson) {
    return {
      lesson: lesson.lesson,
      unit: lesson.unit,
      unitTitle: lesson.unitTitle,
      company: lesson.company,
      caseAnchor: lesson.company,
      caseRole: lesson.caseRole,
      guidingQuestion: lesson.guidingQuestion,
      guidingQuestionZh: lesson.guidingQuestionZh,
      coreClaim: lesson.coreClaim,
      decisionFirst: lesson.decisionFirst,
      primaryOutput: lesson.primaryOutput,
      groundedScenario: lesson.groundedScenario,
      caseReview: lesson.caseReview,
      analyseWhy: lesson.analyseWhy,
      investmentAction: lesson.investmentAction,
      stockMarketGame: lesson.stockMarketGame,
      studentHook: lesson.studentHook,
      simpleFlow: lesson.simpleFlow,
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
      studentHook: lesson.studentHook,
      simpleFlow: lesson.simpleFlow,
      decisionFirst: lesson.decisionFirst,
      retrievalPractice: lesson.retrievalPractice,
      analyseWhy: lesson.analyseWhy,
      worksheet: lesson.worksheet,
      groundedScenario: lesson.groundedScenario,
      investmentAction: lesson.investmentAction,
      stockMarketGame: lesson.stockMarketGame,
    };
  }

  function courseRules(map) {
    const rules = map.generatorAccess && Array.isArray(map.generatorAccess.rules)
      ? map.generatorAccess.rules
      : [];
    return [
      ...rules,
      ...(map.currencyRule ? [map.currencyRule] : []),
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
        decisionFirst: lesson.decisionFirst,
        caseRole: lesson.caseRole,
        primaryOutput: lesson.primaryOutput,
        investmentAction: lesson.investmentAction,
        stockMarketGame: lesson.stockMarketGame,
        formativeAssessment: lesson.formativeAssessment,
        exitTicket: lesson.exitTicket,
        futureReuse: lesson.futureReuse,
      },
      contentContract: {
        terms: lesson.terms,
        formulaOrNoFormula: lesson.formulaOrNoFormula,
        evidenceSummary: lesson.evidenceSummary,
        check: lesson.check,
        retrievalPractice: lesson.retrievalPractice,
        analyseWhy: lesson.analyseWhy,
      },
      evidenceContract: {
        evidenceTask: lesson.evidenceTask,
        groundedScenario: lesson.groundedScenario,
        sourcePack: lesson.sourcePack,
        stockMarketGame: lesson.stockMarketGame,
        caseReview: lesson.caseReview,
        worksheet: lesson.worksheet,
      },
      artifactContract: {
        handoutSections: lesson.handoutSections,
        artifactBlueprint: lesson.artifactBlueprint,
        worksheet: lesson.worksheet,
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
    SYLLABUS_SOURCES,
    MATERIAL_TARGETS,
    loadCourseMap,
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
