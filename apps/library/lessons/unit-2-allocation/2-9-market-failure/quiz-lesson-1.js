window.IGCSE = window.IGCSE || {};

IGCSE.quiz = {
  id: '2-9-market-failure-lesson-1',
  version: '1.0.0',
  title: 'External costs and benefits quiz',
  description: 'Check syllabus 2.9 externalities, private effects and social effects.',
  questions: [
    { id: 'market-failure', type: 'multipleChoice', prompt: 'What is market failure?', choices: ['An inefficient allocation of resources by the market.', 'Any fall in a firm profit.', 'A market where prices never change.', 'A situation where consumers always have too much choice.'], answer: 0, explanation: 'Market failure is inefficient allocation or misallocation of resources by the market.' },
    { id: 'social-cost', type: 'fillBlank', prompt: 'Social cost equals private cost plus external __________.', acceptedAnswers: ['cost', 'costs'], explanation: 'External costs are added to private costs.' },
    { id: 'social-benefit', type: 'fillBlank', prompt: 'Social benefit equals private benefit plus external __________.', acceptedAnswers: ['benefit', 'benefits'], explanation: 'External benefits are added to private benefits.' },
    { id: 'external-cost', type: 'multipleChoice', prompt: 'Which is an external cost?', choices: ['Dirty air suffered by nearby residents from a factory.', 'The wage paid to a worker.', 'The rent paid by a shop.', 'The price paid by the buyer.'], answer: 0, explanation: 'An external cost is suffered by a third party.' },
    { id: 'external-benefit', type: 'multipleChoice', prompt: 'Which is an external benefit?', choices: ['Lower disease spread after people are vaccinated.', 'The price paid for the vaccine.', 'A firm rent payment.', 'A consumer private shopping benefit only.'], answer: 0, explanation: 'An external benefit is gained by third parties who are not directly involved in the transaction.' },
    { id: 'third-party', type: 'fillBlank', prompt: 'An externality affects a third __________.', acceptedAnswers: ['party', 'parties'], explanation: 'Third parties are outside the direct buyer-seller transaction.' },
    { id: 'output-external-cost', type: 'multipleChoice', prompt: 'If external costs are ignored, what may happen to market output?', choices: ['It may be too high from society viewpoint.', 'It must be exactly efficient.', 'It will always be zero.', 'It will always be too low.'], answer: 0, explanation: 'When social cost exceeds private cost, the market may produce or consume too much.' },
    { id: 'output-external-benefit', type: 'multipleChoice', prompt: 'If external benefits are ignored, what may happen to market output?', choices: ['It may be too low from society viewpoint.', 'It must be exactly efficient.', 'It will always be too high.', 'It will always be a public good.'], answer: 0, explanation: 'When social benefit exceeds private benefit, the market may produce or consume too little.' },
  ],
};
