(function () {
  const step=(label,text,takeaway='')=>({label,text,takeaway});
  const low={model:'income-gap',autonomous:100,mpc:.75,full:600,max:900};
  const scenes={
    'opening-story':{model:'opening-story',steps:[
      step('Spending falls before production adjusts','Across the economy, planned purchases fall below current output.\nUnsold inventories rise.','Firms now have a reason to cut production.'),
      step('Lower output also means lower incomes','Firms reduce production and employment.\nLower incomes reduce consumption, adding to the initial fall in demand.','Spending and income influence each other.'),
      step('Balance returns before full employment does','Output eventually matches planned spending again.\nBut workers and productive equipment remain unused.','Equilibrium describes a balance; full employment describes resource use.')
    ]},
    'equilibrium-below-capacity':{...low,mode:'equilibrium',steps:[
      step('The 45° line marks AE = Y','Both axes use annual £m at unchanged prices.\nAE = 100 + 0.75Y.','The intersection identifies equilibrium income.'),
      step('Equilibrium income is £400m','At E₀, planned spending equals output.\nThere is no unplanned inventory change.','Spending provides no signal for aggregate production to expand.'),
      step('Full-employment income is £600m','Available resources could sustainably produce £600m.\nThis lies to the right of equilibrium income.','The economy can be in equilibrium with unused resources.')
    ]},
    'gaps-both':{model:'paired-gaps',steps:[
      step('Use one full-employment benchmark','At full-employment income of £600m, expenditure of £600m would buy all that output.','Measure both gaps here, at the existing price level.'),
      step('£550m planned: a £50m deflationary gap','Low AE = 100 + 0.75Y.\nAt Y = 600, AE = 550.\nShortfall: 600 − 550 = £50m.','Planned spending is below the expenditure needed for full employment.'),
      step('£650m planned: a £50m inflationary gap','High AE = 200 + 0.75Y.\nAt Y = 600, AE = 650.\nExcess: 650 − 600 = £50m.','Excess demand puts upward pressure on prices.'),
      step('The negative output gap is £200m','Output gap = actual output − potential output.\nAt E₀: 400 − 600 = −£200m.\nThe horizontal shortfall is 200; the vertical spending gap is 50.','Measure the output gap horizontally and the spending gap vertically.')
    ]},
    'closing-deflationary-gap':{model:'income-gap',autonomous:200,mpc:.8,full:1200,max:1600,currency:'$',unit:'bn',axisUnit:'$ billion',mode:'close',steps:[
      step('The original answer is an initial $40bn increase','Q26: ΔY = $200bn and k = 5.\nΔA = 200 ÷ 5 = +$40bn.','Derived diagram: C = 0.8Y; initial autonomous spending = 200.'),
      step('Autonomous spending shifts AE upward by $40bn','AE₁ = 240 + 0.8Y.\nAt income 1000, planned expenditure becomes 1040.','The first change is spending, before the induced rise in income.'),
      step('Induced consumption moves the economy to E₁','Extra production pays extra incomes.\nSome income is spent again.\nThe new equilibrium is $1200bn.','Real output can respond because usable capacity is available.'),
      step('The $40bn injection produces $200bn more income','ΔY = 5 × 40 = 200 ($bn).\nE₁: AE₁ = Y = $1200bn.','The original question assumes no government: the injection can be private investment.')
    ]},
    'essay-diagram':{...low,mode:'equilibrium',steps:[
      step('AO1: establish the axes and equilibrium condition','Draw and label expenditure and income axes, the 45° line and AE.\nExplain: “The 45° line shows where planned expenditure equals output.”','Add E₀ and full-employment income as the next steps reveal them.'),
      step('AO2: interpret E₀','“AE intersects the 45° line at E₀. At this output there is no unplanned inventory change to encourage expansion.”','Explain what the intersection means, not just where it is.'),
      step('AO2: link the diagram to unemployment','“E₀ lies to the left of full-employment income. Production at full employment would exceed planned purchases, so firms would cut output again.”','This explains why unused resources can coexist with equilibrium.')
    ]}
  };
  window.ALEVEL_LESSON.slides.forEach(s=>{if(s.kind==='diagram')s.scene=scenes[s.diagram];});
}());
