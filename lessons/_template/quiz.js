window.IGCSE = window.IGCSE || {};

IGCSE.quiz = {
  id: 'lesson-template-quiz',
  version: '1.0.0',
  title: 'Lesson quiz',
  description: 'Answer each question after reviewing the lesson.',
  questions: [
    {
      id: 'q1',
      type: 'multipleChoice',
      prompt: '<Question>',
      choices: ['<Correct answer>', '<Distractor>', '<Distractor>'],
      answer: 0,
      explanation: '<Short explanation>',
    },
    {
      id: 'q2',
      type: 'fillBlank',
      prompt: '<Statement with __________ for the target key term>',
      acceptedAnswers: ['<key term>'],
      explanation: '<Short explanation>',
    },
  ],
};
