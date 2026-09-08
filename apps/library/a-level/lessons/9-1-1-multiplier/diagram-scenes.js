// Diagram teaching states. The shared renderer derives every coordinate from these numbers.
// Change a caption here; change I/MPC once in `base` to change the plotted model.
(function () {
  const base = { model: 'ae', max: 800, mpc: 0.75, investment: 100, delta: 50 };
  const state = (label, text, takeaway) => ({ label, text, takeaway });
  const scenes = {
    'ae-axes': { mode: 'axes', steps: [
      state('Horizontal axis: income and output', 'Producing output creates the same value of income.\nThe model therefore labels the horizontal axis Y.', 'Each horizontal position is a possible level of national income.'),
      state('Vertical axis: planned expenditure', 'The vertical value shows how much buyers intend to spend at that income.', 'This is AE, not the price level.'),
      state('Read one possible position', 'At A, output and income are £400m while planned expenditure is £350m.', 'The point compares spending plans with current output.')
    ]},
    'ae-consumption-function': { mode: 'consumption', steps: [
      state('Consumption depends on income', 'Higher income allows households to plan more consumption.', 'We begin with the rule C = 0.75Y.'),
      state('Plot the consumption function', 'At zero income, planned consumption is zero in this simplified model.\nThe line slopes upward.', 'Consumption rises as national income rises.'),
      state('Interpret the slope', 'At Y = £400m, C = £300m.\nA £1 rise in income adds £0.75 to consumption.', 'The slope is MPC = 0.75.')
    ]},
    'ae-investment-function': { mode: 'investment', steps: [
      state('Investment is autonomous here', 'Firms plan investment of £100m at every level of current income.', 'This simplifying assumption isolates the multiplier.'),
      state('Plot the investment function', 'A constant £100m appears as a horizontal line.', 'Its slope with respect to current income is zero.'),
      state('Read one position', 'At Y = £400m, planned investment remains £100m.', 'The same £100m will be added to consumption at every income.')
    ]},
    'ae-equality-line': { mode: 'equality', steps: [
      state('Compare equal numerical values', 'The axes use the same scale.\n£200m has the same plotted length vertically and horizontally.', 'Equal rise and run produce a 45° line.'),
      state('Every point has AE = Y', 'The line collects all positions where planned expenditure equals output.', 'It is a reference line, not a spending function.'),
      state('Check another equal pair', 'At Y = £600m, the line also has AE = £600m.', 'Equilibrium occurs only where the AE function crosses this reference line.')
    ]},
    'ae-build-from-functions': { mode: 'build', steps: [
      state('Start with planned consumption', 'C = 0.75Y.\nIts slope is the marginal propensity to consume.', 'This is the induced part of expenditure.'),
      state('Add planned investment', 'I = £100m at every income.\nAdd £100m vertically to consumption at each income.', 'Autonomous investment changes the intercept.'),
      state('Construct aggregate expenditure', 'AE = C + I = £100m + 0.75Y.', 'The AE line is parallel to C and starts at £100m.'),
      state('Check one point', 'At Y = £400m, C = £300m and I = £100m.\nTherefore planned AE = £400m.', 'Each point on AE adds the component spending plans.')
    ]},
    'ae-equilibrium': { mode: 'equilibrium', steps: [
      state('Compare the two lines', 'One line shows planned spending.\nThe other shows spending equal to output.', 'Where do they meet?'),
      state('Identify the intersection', 'At E₀, planned expenditure equals output.', 'No unplanned change in stocks.'),
      state('Read equilibrium income', 'Trace down to the horizontal axis: Y₀ = £400m.', 'Equilibrium need not be full employment.')
    ]},
    'ae-below-equilibrium': { mode: 'below', steps: [
      state('Start below equilibrium', 'At Y = £200m, planned expenditure is £250m.', 'Buyers want more than firms currently produce.'),
      state('Identify the stock change', 'Planned spending exceeds output by £50m.\nStocks run down unexpectedly.', 'Firms receive a signal to increase output.'),
      state('Move along AE toward equilibrium', 'Firms increase production and incomes rise.\nHigher income raises consumption.', 'The AE line has not shifted.')
    ]},
    'ae-above-equilibrium': { mode: 'above', steps: [
      state('Start above equilibrium', 'At Y = £600m, planned expenditure is £550m.', 'Buyers want less than firms currently produce.'),
      state('Identify the stock change', '£50m of output is not purchased as planned.\nUnsold goods add to stocks.', 'Firms receive a signal to reduce output.'),
      state('Move along AE toward equilibrium', 'Firms cut production and incomes fall.\nConsumption falls as income falls.', 'The AE line has not shifted.')
    ]},
    'ae-injection-shift': { mode: 'shift', steps: [
      state('Before the change', 'Investment is £100m.\nEquilibrium income is £400m.', 'AE₀ = £100m + 0.75Y.'),
      state('Shift the whole AE line upward', 'Autonomous investment rises by £50m.\nAt every income, AE is now £50m higher.', 'The slope stays the same and the intercept rises.'),
      state('Hold income fixed to measure the shift', 'At the old Y = £400m, new AE is £450m.', 'The vertical gap is ΔI = £50m, not ΔY.')
    ]},
    'ae-new-equilibrium': { mode: 'multiplier', steps: [
      state('Start at the old equilibrium', 'AE₀ = £100m + 0.75Y.\nIncome is £400m.', 'Keep the original line as a reference.'),
      state('First: an autonomous shift', 'Investment rises by £50m.\nAE shifts upward by £50m at every income.', 'Investment rises from £100m to £150m.'),
      state('Then: move along the new AE line', 'Extra income induces extra consumption.\nThe economy moves toward E₁ on AE₁.', 'Income-induced consumption does not shift AE again.'),
      state('Read the final change in income', 'Y rises from £400m to £600m.\nk = 1 / (1 − 0.75) = 4.', 'ΔY = £200m = £50m of extra I + £150m of extra C.')
    ]},
    'ae-negative-multiplier': { mode: 'multiplier', delta: -50, steps: [
      state('Reset to the original equilibrium', 'Investment is £100m and Y is £400m.\nMPC remains 0.75.', 'This is a new experiment, not a second change after £600m.'),
      state('Investment falls by £50m', 'AE shifts down to £50m + 0.75Y.\nAt old income, AE is only £350m.', 'Unsold output adds to stocks.'),
      state('Move along the lower AE line', 'Firms cut output and income falls.\nLower income reduces consumption.', 'The multiplier also works in reverse.'),
      state('Read the new equilibrium', 'New Y = £200m.\nΔY = 4 × (−£50m) = −£200m.', 'The income fall is larger than the initial fall in I.')
    ]},
    'adas-recall': { model: 'adas', mode: 'recall', steps: [
      state('Switch models: check the axes', 'The vertical axis is now the price level.\nThe horizontal axis is real GDP.', 'The 45° line is not part of this model.'),
      state('Recall AD and SRAS', 'AD slopes downward. SRAS slopes upward.\nTheir intersection determines the equilibrium.', 'This is the familiar AS-level model.'),
      state('Read output and the price level', 'Trace down for Y₀ and left for P₀.', 'This diagram is schematic, not the £m calculation.')
    ]},
    'adas-initial-injection': { model: 'adas', mode: 'first', steps: [
      state('Begin at AD₀', 'The original equilibrium is where AD₀ meets SRAS.', 'Hold SRAS unchanged.'),
      state('Autonomous spending shifts AD', 'Higher investment raises demand at each price level.\nAD shifts from AD₀ to AD₁.', 'This is a shift in AD, not a movement along AD₀.'),
      state('Move along SRAS', 'The new intersection has higher real GDP and a higher price level.', 'Extra production generates extra income.')
    ]},
    'adas-multiplier-outcome': { model: 'adas', mode: 'rounds', roundValues: [50, 37.5, 28.125], steps: [
      state('Begin at the original AD curve', 'AD₀ shows demand before investment rises.', 'The shifts are schematic, but their relative sizes match MPC = 0.75.'),
      state('Initial autonomous shift', 'A £50m rise in investment moves AD from AD₀ to AD₁.', 'This is the largest single shift in the sequence.'),
      state('First induced shift', 'The new income creates £37.5m of extra consumption.\nAD moves from AD₁ to AD₂.', '£37.5m is smaller than the initial £50m.'),
      state('Second induced shift', 'The next income round creates about £28.1m of extra consumption.\nAD moves from AD₂ to AD₃.', 'Each later increment is 0.75 of the previous one.'),
      state('Remaining rounds and the outcome', 'Later shifts continue to shrink.\nThe final AD position would include all remaining induced spending.', 'Along an upward-sloping SRAS, rising prices reduce the real-output response.')
    ]}
  };
  window.ALEVEL_LESSON.slides.forEach(slide => {
    if (slide.kind === 'diagram') slide.scene = { ...base, ...scenes[slide.diagram] };
  });
}());
