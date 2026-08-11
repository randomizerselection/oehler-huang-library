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
    "activity-insert": {
      label: "Lesson activity insert",
      output: "one-page activity insert filed with the SMG workbook",
      requiredFields: [
        "groundedScenario",
        "sourcePack",
        "worksheet",
        "stockMarketGame.workbook",
        "writtenRecord",
        "primaryOutput",
        "investmentAction",
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
    "activity-insert": [
      "Generate the activity insert only when the canonical workbook assignment says that no suitable official workbook pages are assigned.",
      "Keep the insert to one printed page and one coherent evidence task; do not reproduce the lesson handout, official workbook pages or team decision log.",
      "Use the lesson's frozen scenario and source limitation, then include only the calculation, classification, source check or judgement required for the individual record.",
      "End with the exact individual exit output and a short source/date field; do not add a second homework task.",
      "Label the page Lesson Activity Insert and tell the student to file it with the SMG Essentials Workbook.",
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

  const WORKBOOK_MATERIAL_RULES = Object.freeze({
    handout: [
      "Generate a bilingual exam-revision handout, not a worksheet or workbook companion task.",
      "Print every lesson term in English and Simplified Chinese. Turn selected English key words into fill-in blanks answerable during the lesson, preserve the exact ordered answers for the toggle and print the complete Chinese definition.",
      "After the definitions, give four to seven short numbered revision points containing only knowledge explicitly taught in the lesson; pair every English statement with faithful Simplified Chinese.",
      "Make each numbered point a complete examinable statement; include the core principle, essential relationship, formula or qualitative decision rule and misconception correction.",
      "Exclude workbook page directions, scenarios to analyse, evidence tasks, extended questions, writing lines, individual outputs and team-log instructions. Definition blanks are the only handout response fields.",
      "Keep the SMG Essentials Workbook and any separately labelled activity insert as the student work record; keep the team decision log authoritative for team evidence and decisions.",
    ],
    textbook: [
      "Compile the content-only lesson handouts verbatim as a knowledge handbook.",
      "Add only light front matter, contents and unit dividers; do not add textbook-only teaching chapters or workbook activities.",
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
      writtenRecord: lesson.writtenRecord,
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
      writtenRecord: lesson.writtenRecord,
    };
  }

  function materialTargetsForMap(map) {
    const targets = clone(MATERIAL_TARGETS);
    if (map.stockMarketGameIntegration && map.stockMarketGameIntegration.workbook) {
      targets.handout = {
        ...targets.handout,
        label: "Bilingual exam revision handout",
        output: "fill-in definitions and bilingual numbered revision points",
        requiredFields: [
          "handoutContract",
          "terms",
          "newKnowledge",
          "formulaOrNoFormula",
          "misconception",
          "artifactBlueprint.handoutBlocks",
        ],
      };
      targets.textbook = {
        ...targets.textbook,
        label: "Compiled knowledge handbook",
        output: "content-only lesson handouts with unit navigation",
        requiredFields: [
          "writtenArtifactRule",
          "textbookAssembly",
          "handoutContract",
          "artifactBlueprint.handoutBlocks",
        ],
      };
    }
    return targets;
  }

  function materialRulesForMap(targetKey, map) {
    if (map.stockMarketGameIntegration && map.stockMarketGameIntegration.workbook && WORKBOOK_MATERIAL_RULES[targetKey]) {
      return WORKBOOK_MATERIAL_RULES[targetKey];
    }
    return MATERIAL_RULES[targetKey] || [];
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
      materialTargets: materialTargetsForMap(courseMap),
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
        writtenRecord: lesson.writtenRecord,
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
        writtenRecord: lesson.writtenRecord,
        caseReview: lesson.caseReview,
        worksheet: lesson.worksheet,
      },
      artifactContract: {
        handoutSections: lesson.handoutSections,
        artifactBlueprint: lesson.artifactBlueprint,
        worksheet: lesson.worksheet,
        writtenRecord: lesson.writtenRecord,
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

    const courseMap = getMap(map);
    const lessonContext = getLessonGeneratorContext(lessonNumber, courseMap);
    const targets = materialTargetsForMap(courseMap);
    const knowledgeHandout = targetKey === "handout" && Boolean(courseMap.stockMarketGameIntegration?.workbook);
    const activityInsert = targetKey === "activity-insert";
    const activityInsertApplicable = activityInsert && lessonContext.teachingContract.stockMarketGame?.workbook?.hasAssignedPages === false;
    const generatorBrief = knowledgeHandout
      ? {
          newKnowledge: lessonContext.generatorBrief.newKnowledge,
          misconception: lessonContext.generatorBrief.misconception,
        }
      : lessonContext.generatorBrief;
    const requiredInputs = knowledgeHandout
      ? {
          teachingContract: {
            coreClaim: lessonContext.teachingContract.coreClaim,
          },
          contentContract: lessonContext.contentContract,
          evidenceContract: {
            sourcePack: lessonContext.evidenceContract.sourcePack,
          },
          artifactContract: {
            handoutSections: lessonContext.artifactContract.handoutSections,
            handoutBlocks: lessonContext.artifactContract.artifactBlueprint.handoutBlocks,
          },
        }
      : {
          teachingContract: lessonContext.teachingContract,
          contentContract: lessonContext.contentContract,
          evidenceContract: lessonContext.evidenceContract,
          artifactContract: lessonContext.artifactContract,
          assessmentContract: lessonContext.assessmentContract,
        };
    return clone({
      schemaVersion: 1,
      contextType: "lesson-material-generator-context",
      target: targetKey,
      materialTarget: targets[targetKey],
      applicable: activityInsert ? activityInsertApplicable : true,
      applicabilityReason: activityInsert
        ? (activityInsertApplicable
          ? "No suitable official workbook pages are assigned; generate one lesson-specific insert."
          : `Official workbook pages ${lessonContext.teachingContract.stockMarketGame?.workbook?.pages || "are assigned"}; do not generate a duplicate insert.`)
        : "This target is available for the selected lesson.",
      course: lessonContext.course,
      lesson: lessonContext.lesson,
      guidingQuestion: lessonContext.guidingQuestion,
      generatorBrief,
      requiredInputs,
      generationRules: [
        ...(activityInsert && !activityInsertApplicable ? ["Do not generate this activity insert because the canonical lesson already assigns suitable official workbook pages."] : []),
        ...materialRulesForMap(targetKey, courseMap),
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
