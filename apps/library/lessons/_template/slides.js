/* ============================================================
   Lesson X.Y — <Lesson title>
   IGCSE Economics Lesson Library - Unit N: <unit name>

   Copy this folder to lessons/unit-N-<slug>/X-Y-<lesson-slug>/
   then rewrite the meta and slides arrays below.

   Supported slide types (see assets/js/presentation.js):
     hero | roadmap | outcomes | term | compare | quiz | answer
     cards | split | flow | exam | modelAnswer | section | discussion
     visualPause | peerTask | classificationTask | yesNoCheck
     taxSim | indirectTaxSim | marketMechanismSim | marketSignalGame

   Available "visual" keys (see assets/js/visuals.js):
     hero · abstract · demandShift · budgetBars · progressive
     regressive · proportional · demandUp · demandDown · flowArrows
     (plus all legacy aliases)

   Reusable local photos live in assets/js/photos.js:
     IGCSE.photos.fiscalPolicy.* | IGCSE.photos.fiscalPolicyFacts.*
     IGCSE.photos.marketTeaching.* | IGCSE.photos.monetaryPolicy.*

   Optional pacing:
     partialReview: true reveals supported content blocks one at a time.
     Prefer full slides by default; use partialReview only for dense
     comparisons, answer steps, flow chains, or starter prompts.

   Eyebrow convention:
     Use eyebrow only as a student learning-stage cue:
     Overview | Recall | Objectives | Part 1 | Part 2 | Part 3 | Starter
     Learn | Example | Key idea | Discuss | Classify | Check | Pair task
     Brief link | Review | Exam practice | Model answer
     Final exit-ticket answer slides should use eyebrow: 'Check',
     title: 'Exit ticket', and zhTitle: '离堂小测'.

   Bilingual key-term convention:
     Important section, term and concept-bearing flow slides should use zhTitle
     for a concise Chinese translation. Keep the English syllabus term primary.

   Compact card convention:
     Use cardStyle: 'compactVisual' for dense overview/category cards. Prefer
     object cards with concise Chinese key-term labels and small SVG icons:
       { title: 'Economic growth', zhTitle: '经济增长', body: 'increase real GDP', icon: 'growth' }
     Use cardLayout: 'balancedGrid' when a six-card list should read as a
     balanced 3 x 2 teaching grid. Existing tuple cards remain valid for
     ordinary, less dense card slides.

   Section divider convention:
     Section titles should name the concept being taught. Use zhTitle for a
     concise Chinese translation. Omit subtitles by default.
     Add a subtitle only when it gives a student-facing bridge or contrast,
     e.g. subtitle: 'How lower rates change spending and investment'.
     Do not use section subtitles for syllabus refs or topic breadcrumbs.

   Visual pause and discussion convention:
     Fact slides are discontinued. Each major section should normally start
     with a specific visualPause slide or a student-facing discussion prompt
     before abstract explanation. Prefer local photos from assets/js/photos.js.
     Download a new specific local photo when the catalogue only has a generic
     visual, then resize oversized downloads for full-screen classroom use.
     Use objectPosition when the default crop misses the focal point.
     For mechanism lessons, prefer:
       section -> visualPause -> flow(fillBlanks) -> short check/practice.
     Teach both directions before compare/classification review.

   Recall convention:
     For lessons after lesson 1, start with a peerTask definition recall:
       taskType: 'definitionRecall', eyebrow: 'Recall',
       title: 'Recall last lesson', stepsLabel: 'Write these definitions',
       and exactly three definitionItems with label, term and full answer.
   ============================================================ */

window.IGCSE = window.IGCSE || {};

const photos = IGCSE.photos?.marketTeaching || {};

IGCSE.lesson = {
  meta: {
    code:         'X.Y',
    unit:         'Unit N — <unit name>',
    title:        '<Lesson title> - Oehler-Huang Library',
    lessonLabel:  '<Lesson label shown in slide footer>',
    courseLabel:  'IGCSE Economics Lesson Library',
    creatorLabel: 'Oehler-Huang Library',
  },

  slides: [
    {
      type: 'hero',
      eyebrow:  'Overview',
      title:    '<Lesson title>',
      subtitle: '<Short subtitle>',
      kicker:   '<One-line hook>',
      visual:   photos.starbucks || 'hero',
    },

    // For lessons after lesson 1, add this before the starter:
    // {
    //   type: 'peerTask',
    //   taskType: 'definitionRecall',
    //   eyebrow: 'Recall',
    //   title: 'Recall last lesson',
    //   prompt: 'On paper, write a simple definition for each term. Use one sentence for each.',
    //   stepsLabel: 'Write these definitions',
    //   definitionItems: [
    //     { label: '1', term: '<Term 1>', answer: '<Full model definition.>' },
    //     { label: '2', term: '<Term 2>', answer: '<Full model definition.>' },
    //     { label: '3', term: '<Term 3>', answer: '<Full model definition.>' },
    //   ],
    //   sharePrompt: 'Compare your definitions with a partner before revealing the model answers.',
    // },

    {
      type: 'discussion',
      eyebrow: 'Starter',
      title:   '<Hook question>',
      question: '<Concrete scenario or puzzle that creates the need for the lesson>',
      zh: '<该情境或问题的中文翻译>',
      answer: '<A short possible answer students could use if they are stuck.>',
      answerZh: '<学生没有思路时可以参考的简短中文答案。>',
      visual: 'abstract',
    },

    {
      type: 'outcomes',
      eyebrow: 'Objectives',
      title:   'By the end, you can',
      bullets: [
        '<Objective 1>',
        '<Objective 2>',
        '<Objective 3>',
      ],
      zhBullets: [
        '<目标 1>',
        '<目标 2>',
        '<目标 3>',
      ],
    },

    {
      type: 'section',
      eyebrow: 'Part 1',
      title:   '<First section taught>',
      zhTitle: '<Concise Chinese title translation when useful>',
      // subtitle: '<Optional student-facing bridge, not a syllabus ref>',
    },

    {
      type: 'discussion',
      eyebrow: 'Discuss',
      title:   '<Starter question>',
      question: '<Fact or discussion prompt that introduces this section>',
      zh: '<引入本部分的事实或讨论问题的中文翻译>',
      answer: '<A short possible answer that connects to this section.>',
      answerZh: '<与本部分内容相联系的简短中文参考答案。>',
      visual: 'abstract',
    },

    {
      type: 'visualPause',
      title: 'Visual pause: <specific example>',
      visual: photos.starbucks || 'abstract',
      notes: 'Teacher cue: ask one observation question, then bridge to the exact next economics link. Preserve source/context details here when replacing an old fact slide.',
    },

    // Repeat for each section:
    // section -> visualPause/discussion -> taught content -> formative assessment.
    // For mechanism sections: visualPause -> flow -> short peerTask/answer check.

    {
      type: 'term',
      eyebrow: 'Learn',
      definitionCue: 'Key term',
      title: '<Key term>',
      zhTitle: '<中文术语>',
      term: '<key term>',
      definition: '<Definition with key phrase included for clickable blanks.>',
      definitionZh: '<简明中文定义>',
      keyTerms: [
        { term: '<key phrase>', zh: '<中文>', note: '<short clarification>' },
      ],
      examples: [
        ['Example', '<specific example>'],
      ],
      showExamples: false,
    },

    {
      type: 'flow',
      eyebrow: 'Learn',
      title: '<Explanation flow>',
      zhTitle: '<中文标题>',
      mode: 'fillBlanks',
      nodes: [[
        { text: '<first cause> __________', answer: '<key term>', zh: '<中文支持行>' },
        { text: '<next link> __________', answer: '<key term>', zh: '<中文支持行>' },
        { text: '<result> __________', answer: '<key term>', zh: '<中文支持行>' },
      ]],
    },

    {
      type: 'peerTask',
      taskType: 'missingSentence',
      eyebrow: 'Pair task',
      title: 'Complete the missing sentence',
      zhPrompt: '<中文任务提示>',
      steps: [
        ['1', '<First cause/link already known.>'],
        ['2', '__________', '<Missing model sentence.>'],
        ['3', '<Final result or trade-off.>'],
      ],
      missingSentenceStep: 2,
      missingSentenceAnswer: '<Missing model sentence.>',
    },

    {
      type: 'compare',
      eyebrow: 'Review',
      mode: 'fillBlanks',
      leftTitle: '<Concept A>',
      left: [
        ['1', '<statement with __________>', '<answer>'],
        ['2', '<statement with __________>', '<answer>'],
      ],
      rightTitle: '<Concept B>',
      right: [
        ['1', '<statement with __________>', '<answer>'],
        ['2', '<statement with __________>', '<answer>'],
      ],
    },

    {
      type: 'classificationTask',
      eyebrow: 'Classify',
      title: 'Classify the case',
      zhTitle: '<中文标题>',
      prompt: 'Classify each case using the categories already taught.',
      zhPrompt: '<中文任务提示>',
      categories: [
        { title: '<Category A>', zhTitle: '<中文>', clue: '<short clue>' },
        { title: '<Category B>', zhTitle: '<中文>', clue: '<short clue>' },
      ],
      items: [
        { text: '<Case 1>', answer: '<Category A>', reason: '<Why it fits.>' },
        { text: '<Case 2>', answer: '<Category B>', reason: '<Why it fits.>' },
        { text: '<Case 3>', answer: '<Category A>', reason: '<Why it fits.>' },
      ],
      sharePrompt: 'Share one classification and the reason.',
    },

    {
      type: 'quiz',
      eyebrow: 'Check',
      question: '<Question>',
      choices: ['<Correct or plausible choice>', '<Distractor>', '<Distractor>'],
      answer: 0,
      prompt: '<Follow-up explanation or application task>',
      visual: 'abstract',
    },

    {
      type: 'exam',
      eyebrow: 'Exam practice',
      title: '<Full exam question. [4]>',
      keywordLabel: 'Use these keywords',
      keywords: ['<keyword 1>', '<keyword 2>', '<keyword 3>', '<keyword 4>'],
      prompt: 'Write one short paragraph. Use the keywords.',
    },

    {
      type: 'modelAnswer',
      eyebrow: 'Model answer',
      title: '<Full exam question. [4]>',
      paragraphs: [
        '<Model answer sentence 1 using keywords.>',
        '<Model answer sentence 2 using keywords.>',
      ],
      links: ['<keyword 1>', '<keyword 2>', '<keyword 3>', '<keyword 4>'],
      showLinkChips: false,
      partialReview: ['.modelAnswerCard'],
    },

    {
      type: 'answer',
      eyebrow: 'Check',
      title:   'Exit ticket',
      zhTitle: '离堂小测',
      mode:    'fillBlanks',
      steps: [
        ['1', '<Statement where __________ is the target key term.>', '<key term>'],
        ['2', '<Statement where __________ is the target concept phrase.>', '<concept phrase>'],
      ],
    },

    // … add more slides here …
  ],
};
