// Diagram teaching states. Shared SVG geometry derives positions from these models.
(function () {
  const state = (label, text, takeaway) => ({ label, text, takeaway });
  const scenes = {
    'accelerator-machine-visual': {
      model: 'factory-machines',
      years: [{year:1,demand:800,stock:8,retained:7,replacement:1,extra:0},{year:2,demand:1000,stock:10,retained:7,replacement:1,extra:2}],
      steps: [
        state('Most of the machines are already there', 'Each machine produces 100 units.\nOne machine wears out each year.\nPredict purchases when demand rises from 800 to 1,000 units.', 'Count what must be bought this year, not every machine the factory uses.'),
        state('Unchanged demand requires one replacement', 'Year 1 needs 8 machines to produce 800 units.\nSeven are retained; one worn-out machine is replaced.', '8 machines operating; only 1 purchased this year.'),
        state('Higher demand requires two additions and one replacement', 'Year 2 needs 10 machines to produce 1,000 units.\nThe factory buys 2 extra machines plus 1 replacement.', '10 machines operating; 3 purchased this year.'),
        state('Demand rises 25%; machine purchases rise 200%', 'Demand: $(1,000 − 800) ÷ 800 × 100 = 25\%$\nPurchases: $(3 − 1) ÷ 1 × 100 = 200\%$', 'The stock grows by only 2 machines, but annual purchases triple. With unchanged machine prices, investment spending also triples.')
      ]
    },
    'autonomous-induced-investment-diagrams': {
      model: 'investment-comparison', autonomous: 20, coefficient: 2,
      steps: [
        state('The horizontal axes measure changes in income', 'Both horizontal axes show the increase in income, ΔY.\nHold interest rates, technology and other determinants constant.', 'Predict which investment component responds when income grows faster.'),
        state('Autonomous investment stays unchanged', 'The autonomous component is £20m whether income increases by £10m or £20m.', 'Its horizontal line shows independence from current income growth.'),
        state('Faster income growth induces more investment', 'In this example, income growth of £10m induces £20m of investment.\nIncome growth of £20m induces £40m.', 'Firms need more extra capacity when demand grows faster.'),
        state('Only induced investment rises with faster income growth', 'Compare income growth of £10m and £20m in both panels.\nAutonomous investment stays at £20m; induced investment rises from £20m to £40m.', 'The right-hand relationship assumes firms need and can finance extra capacity.')
      ]
    },
    'consumption-function-graph': {
      model: 'consumption', autonomous: 100, mpc: 0.8, maxIncome: 2000, maxValue: 1800,
      steps: [
        state('Start with the intercept', 'At zero disposable income, households still consume £100m.\nThey must borrow or draw down past saving.', 'The intercept $a$ is autonomous consumption.'),
        state('Read the slope', 'When $Y_d$ rises by £500m, consumption rises by £400m.', '$MPC = ΔC ÷ ΔY_d = 400 ÷ 500 = 0.8$.'),
        state('Find break-even income', 'The 45° line shows $C = Y_d$.\nThe two lines meet at $Y_d = £500m$.', 'At break-even income, saving is zero.'),
        state('Read the two regions', 'Below £500m, $C$ exceeds income and saving is negative.\nAbove £500m, income exceeds consumption.', 'The gap $Y_d − C$ is saving.')
      ]
    },
    'autonomous-investment-shift': {
      model: 'ae', mode: 'multiplier', max: 800, mpc: 0.75, investment: 100, delta: 50,
      labelOldEquilibrium: true,
      steps: [
        state('Begin at the old equilibrium', 'Planned investment is £100m.\nThe economy is at $Y₀ = £400m$.', 'This is the position reached in the multiplier lesson.'),
        state('Confidence raises autonomous investment', 'Firms plan £50m more investment at every income level.', 'AE shifts upward; the slope is unchanged.'),
        state('Autonomous investment shifts the line; induced spending moves the economy along it.', 'The £50m rise in autonomous investment shifts AE upward.\nAs output and income rise, induced consumption moves the economy along AE₁ to E₁.', 'In this basic multiplier model, induced spending is consumption; accelerator investment is considered separately.'),
        state('Equilibrium income rises from £400m to £600m', '$k = 1 ÷ (1 − 0.75) = 4$\n$ΔY = 4 × £50m = £200m$\n$Y₁ = £400m + £200m = £600m$', 'At E₁, planned expenditure again equals income. The £50m injection produces a £200m income increase.')
      ]
    },
    'accelerator-response': {
      model: 'accelerator', output: [100, 110, 125, 135, 140, 140], coefficient: 2,
      steps: [
        state('Higher output does not tell us investment', 'Output rises from £100bn to £140bn.\nBefore revealing the bars, predict what matters: the output level or the annual addition?', 'Investment buys extra capacity; focus on how much output is added.'),
        state('Smaller annual additions need less extra capacity', 'After Year 3, the annual additions shrink:\n£15bn, £10bn, £5bn, then zero.', 'Predict the investment bars using $I = 2 × ΔY$.'),
        state('Investment falls as the additions become smaller', 'For Years 4–6, $I$ is £20bn, £10bn and £0bn.\nThese are the answers to the preceding calculation check.', 'Year 6 needs no extra capacity even though output remains at £140bn. Replacement purchases may continue.'),
        state('Smaller annual increases mean lower induced investment', 'From Year 3 to Year 5, output rises from £125bn to £140bn.\nBut the annual addition falls from £15bn to £5bn, so investment falls from £30bn to £10bn.', 'A fall in induced investment does not require a fall in output; slower output growth is enough.')
      ]
    }
  };
  window.ALEVEL_LESSON.slides.forEach(slide => {
    if (slide.kind === 'diagram') slide.scene = scenes[slide.diagram];
  });
}());
