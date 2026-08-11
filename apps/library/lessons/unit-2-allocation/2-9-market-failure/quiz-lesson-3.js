window.IGCSE = window.IGCSE || {};

IGCSE.quiz = {
  id: '2-9-market-failure-lesson-3',
  version: '1.0.0',
  title: 'Public goods quiz',
  description: 'Check syllabus 2.9 public goods, free riders, private revenue and non-provision.',
  questions: [
    { id: 'public-good', type: 'multipleChoice', prompt: 'Which pair of features defines a public good?', choices: ['Non-rival and non-excludable.', 'Expensive and imported.', 'Harmful and addictive.', 'Produced by one firm.'], answer: 0, explanation: 'A public good is non-rival and non-excludable, so it needs to be financed by government.' },
    { id: 'non-rival', type: 'multipleChoice', prompt: 'What does non-rival mean?', choices: ['One person using the good does not reduce use by others.', 'Only one person can use the good.', 'Non-payers can always be excluded.', 'The good is always harmful.'], answer: 0, explanation: 'Non-rival means consumption by one user does not reduce availability to others.' },
    { id: 'non-excludable', type: 'multipleChoice', prompt: 'What does non-excludable mean?', choices: ['Non-payers cannot easily be stopped from benefiting.', 'The good is always produced abroad.', 'The good has no social benefit.', 'Only rich people can use the good.'], answer: 0, explanation: 'Non-excludable means it is difficult to prevent non-payers from benefiting.' },
    { id: 'free-rider', type: 'multipleChoice', prompt: 'What is the free-rider problem?', choices: ['People can benefit without paying.', 'People always pay more tax.', 'Firms always innovate.', 'Consumers always buy too much education.'], answer: 0, explanation: 'Free riders make it difficult for private firms to charge every beneficiary.' },
    { id: 'non-provision', type: 'fillBlank', prompt: 'Weak private revenue may lead to non-__________.', acceptedAnswers: ['provision'], explanation: 'Markets may not provide public goods because private revenue may be too low to cover costs and make a profit.' },
    { id: 'public-example', type: 'multipleChoice', prompt: 'Which is the best public good example?', choices: ['Flood protection for a town', 'A sandwich', 'A private tutoring lesson', 'A cigarette'], answer: 0, explanation: 'Flood protection can be non-rival and non-excludable when many homes are protected together.' },
    { id: 'private-good', type: 'multipleChoice', prompt: 'Which feature normally helps private firms sell private goods?', choices: ['Excludability', 'Free-rider problem', 'Non-provision', 'No price possible'], answer: 0, explanation: 'If buyers can be excluded unless they pay, firms can earn private revenue.' },
    { id: 'public-merit', type: 'multipleChoice', prompt: 'Why is a merit good not automatically a public good?', choices: ['A merit good can often be sold to individual consumers.', 'A merit good is always harmful.', 'A public good is always over-consumed.', 'A merit good must have no benefits.'], answer: 0, explanation: 'Many merit goods, such as education, are excludable even though consumers may not fully recognise their benefits.' },
  ],
};
