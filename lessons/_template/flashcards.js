window.IGCSE = window.IGCSE || {};

IGCSE.flashcards = {
  id: '<lesson-id>-flashcards',
  version: '1.0.0',
  title: '<Lesson title> flashcards',
  description: 'Self-check revision cards for this lesson.',
  cards: [
    {
      id: 'key-term',
      type: 'definition',
      term: '<Key term>',
      definition: '<Short definition>',
      hint: '<Optional hint>',
    },
    {
      id: 'fill-blank',
      type: 'fillBlank',
      prompt: '<Sentence with __________ for the target key term>',
      answer: '<Key term>',
    },
  ],
};
