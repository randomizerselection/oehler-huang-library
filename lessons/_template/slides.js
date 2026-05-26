/* ============================================================
   Lesson X.Y — <Lesson title>
   IGCSE Economics Lesson Library - Unit N: <unit name>

   Copy this folder to lessons/unit-N-<slug>/X-Y-<lesson-slug>/
   then rewrite the meta and slides arrays below.

   Supported slide types (see assets/js/presentation.js):
     hero | roadmap | outcomes | term | compare | quiz | answer
     cards | split | flow | exam | section | discussion | fact
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

   Fact and discussion convention:
     Every complete deck should include both fact and discussion slides.
     Each major section should normally start with a sourced fact slide or a
     discussion prompt before abstract explanation. Prefer local photos from
     assets/js/photos.js for fact slides.
     Keep source names out of the large fact text; use the source line for
     attribution. Use flags and a China comparison where relevant. Download a
     new specific local photo when the catalogue only has a generic visual.
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
      type: 'fact',
      eyebrow: 'Specific example',
      facts: {
        left: {
          flag: '🌐',
          country: '<Country, region, firm or world economy>',
          context: 'One short real-world context sentence; no source name here.',
          question: 'One application question linked to the lesson concept?',
          questionZh: '这个例子说明了哪个经济概念？',
          answer: 'A strong answer should name the concept, link the context to the first economic effect, and then explain the likely outcome.',
          zh: '<该事实的简短中文翻译>',
          source: 'Source: <source name and year>.',
        },
        china: {
          flag: '🇨🇳',
          country: 'China',
          context: 'One China comparison context sentence when relevant; no source name here.',
          question: 'One China comparison application question?',
          questionZh: '这个例子说明了哪个经济概念？',
          answer: 'A strong answer should name the concept, link the context to the first economic effect, and then explain the likely outcome.',
          zh: '<中国比较事实的简短中文翻译>',
          source: 'Source: <China source name and year>.',
        },
      },
      visual: photos.starbucks || 'abstract',
    },

    // Repeat for each section:
    // section -> fact/discussion -> taught content -> formative assessment.

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
      type: 'answer',
      eyebrow: 'Check',
      title:   'Exit ticket',
      zhTitle: '离堂小测',
      mode:    'fillBlanks',
      steps: [
        ['1', '<Statement with __________.>', '<answer>'],
        ['2', '<Statement with __________.>', '<answer>'],
      ],
    },

    // … add more slides here …
  ],
};
