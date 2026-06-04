/* ============================================================
   Lesson X.Y — <Lesson title>
   IGCSE Economics Lesson Library - Unit N: <unit name>

   Copy this folder to lessons/unit-N-<slug>/X-Y-<lesson-slug>/
   then rewrite the meta and slides arrays below.

   Supported slide types (see assets/js/presentation.js):
     hero | roadmap | outcomes | term | compare | quiz | answer
     cards | split | flow | exam | section | discussion | visualPause
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
     Lesson overview | Starter | Objectives | New section | Learn | Explore
     Example | Apply | Check | Exam practice | Review
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
      eyebrow:  'Lesson overview',
      title:    '<Lesson title>',
      subtitle: '<Short subtitle>',
      kicker:   '<One-line hook>',
      visual:   photos.starbucks || 'hero',
    },

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
      eyebrow: 'New section',
      title:   '<First section taught>',
      zhTitle: '<Concise Chinese title translation when useful>',
      // subtitle: '<Optional student-facing bridge, not a syllabus ref>',
    },

    {
      type: 'discussion',
      eyebrow: 'Explore',
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
      notes: 'Teacher cue: ask students what they can observe in this specific example and how it connects to the lesson concept. Preserve source/context details here when replacing an old fact slide.',
    },

    // Repeat for each section:
    // section -> visualPause/discussion -> taught content -> formative assessment.

    {
      type: 'term',
      eyebrow: 'Key term',
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
      nodes: [
        { text: '<first cause> __________', answer: '<key term>', zh: '<中文支持行>' },
        { text: '<next link> __________', answer: '<key term>', zh: '<中文支持行>' },
        { text: '<result> __________', answer: '<key term>', zh: '<中文支持行>' },
      ],
    },

    {
      type: 'compare',
      eyebrow: 'Compare',
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
