// Diagram teaching states. Shared SVG geometry derives positions from these models.
(function () {
  const state = (label, text, takeaway) => ({ label, text, takeaway });
  const scenes = {
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
      model: 'ae', mode: 'shift', max: 800, mpc: 0.75, investment: 100, delta: 50,
      steps: [
        state('Begin at the old equilibrium', 'Planned investment is £100m.\nThe economy is at $Y₀ = £400m$.', 'This is the position reached in the multiplier lesson.'),
        state('Confidence raises autonomous investment', 'Firms plan £50m more investment at every income level.', 'AE shifts upward; the slope is unchanged.'),
        state('Separate cause from response', 'The vertical £50m shift is the autonomous change.\nThe later rise in income induces further expenditure.', 'Autonomous investment shifts the line; induced spending moves the economy along it.')
      ]
    },
    'accelerator-response': {
      model: 'accelerator', output: [100, 110, 125, 135, 140, 140], coefficient: 2,
      steps: [
        state('Track the level of output', 'Output rises from £100bn to £140bn before becoming constant.', 'The accelerator does not respond simply to the level of GDP.'),
        state('Measure each change', 'Annual increases are +10, +15, +10, +5 and 0.', 'Induced investment depends on $ΔY$: the change in output.'),
        state('Apply v = 2', 'In Years 2–6, induced investment is £20bn, £30bn, £20bn, £10bn and zero.', 'A larger rise in output requires a larger addition to productive capacity.'),
        state('Notice the accelerator effect', 'Between Years 3 and 5, GDP keeps rising but at a slower rate.\nInduced investment falls from 30 to 10.', 'Slower growth can reduce investment even while output is still increasing.')
      ]
    }
  };
  window.ALEVEL_LESSON.slides.forEach(slide => {
    if (slide.kind === 'diagram') slide.scene = scenes[slide.diagram];
  });
}());
