export const imageSets = {
  v1: {
    hero: {
      file: "assets/v1/35638690.jpg",
      creator: "Jakub Zerdzicki",
      page: "https://www.pexels.com/photo/finance-professional-analyzing-data-on-calculator-and-monitor-35638690/",
      alt: "A finance professional calculating while reviewing market charts on a monitor",
    },
    calculation: {
      file: "assets/v1/7054421.jpg",
      creator: "Kindel Media",
      page: "https://www.pexels.com/photo/a-person-using-a-calculator-7054421/",
      alt: "Hands using a calculator and pen for a financial calculation",
    },
    comparison: {
      file: "assets/v1/6289026.jpg",
      creator: "Monstera Production",
      page: "https://www.pexels.com/photo/graph-with-increasing-euro-profitable-investment-6289026/",
      alt: "Currency coins and an upward return chart",
    },
    evidence: {
      file: "assets/v1/36633860.jpg",
      creator: "Jakub Zerdzicki",
      page: "https://www.pexels.com/photo/man-taking-notes-with-stock-market-data-on-screen-36633860/",
      alt: "An investor recording notes while viewing stock-market data",
    },
  },
  v2: {
    hero: {
      file: "assets/v2/10024577.jpg",
      creator: "Jessica Lewis",
      page: "https://www.pexels.com/photo/financial-diagram-notes-10024577/",
      alt: "Handwritten financial planning and investment notes",
    },
    calculation: {
      file: "assets/v2/9433330.jpg",
      creator: "Monstera Production",
      page: "https://www.pexels.com/photo/paper-graphs-on-straw-surface-9433330/",
      alt: "Financial charts and planning notes arranged on a desk",
    },
    comparison: {
      file: "assets/v2/11350082.jpg",
      creator: "Towfiqu barbhuiya",
      page: "https://www.pexels.com/photo/notebook-and-envelope-with-money-11350082/",
      alt: "A notebook, calculator and money prepared for investment planning",
    },
    evidence: {
      file: "assets/v2/34862432.jpg",
      creator: "Jakub Zerdzicki",
      page: "https://www.pexels.com/photo/calculating-finances-at-night-in-office-setting-34862432/",
      alt: "A hand recording figures on financial documents beside a calculator",
    },
  },
  v3: {
    hero: {
      file: "assets/v3/33175649.jpg",
      creator: "Bia Limova",
      page: "https://www.pexels.com/photo/business-calculation-with-financial-document-on-desk-33175649/",
      alt: "A person calculating values from a financial document",
    },
    calculation: {
      file: "assets/v3/7948045.jpg",
      creator: "RDNE Stock project",
      page: "https://www.pexels.com/photo/close-up-shot-of-a-pen-on-a-paper-with-stock-report-7948045/",
      alt: "A stock report with pen and calculator for return analysis",
    },
    comparison: {
      file: "assets/v3/6779341.jpg",
      creator: "Artem Podrez",
      page: "https://www.pexels.com/photo/colleagues-computing-using-a-calculator-6779341/",
      alt: "Colleagues comparing financial reports with a calculator",
    },
    evidence: {
      file: "assets/v3/20801620.jpg",
      creator: "Jakub Zerdzicki",
      page: "https://www.pexels.com/photo/business-and-finance-office-table-20801620/",
      alt: "An investment-analysis workspace with charts and calculator",
    },
  },
};

export function imageCredit(source) {
  return `Pexels photograph by ${source.creator}: ${source.page} (Pexels License).`;
}
