(function () {
  const step=(label,text,takeaway='')=>({label,text,takeaway});
  const low={model:'income-gap',autonomous:100,mpc:.75,full:600,max:900};
  const scenes={
    'opening-story':{model:'opening-story',steps:[
      step('Spending matches output','£400m of planned spending.\n£400m of actual output.','Do the two amounts match?'),
      step('The economy could produce more','Available resources could sustainably produce £600m.','Does matching spending mean resources are fully used?')
    ]},
    'equilibrium-below-capacity':{...low,mode:'equilibrium',steps:[
      step('The 45° line marks AE = Y','Both axes use annual £m at unchanged prices.\nAE = 100 + 0.75Y.','The intersection identifies equilibrium income.'),
      step('Equilibrium income is £400m','At E₀, planned spending equals output.\nThere is no unplanned inventory change.','Spending provides no signal for aggregate production to expand.'),
      step('Full-employment income is £600m','Available resources could sustainably produce £600m.\nThis lies to the right of equilibrium income.','The economy can be in equilibrium with unused resources.')
    ]},
    'gaps-both':{...low,mode:'deflation',steps:[
      step('Full employment requires £600m of spending','At full-employment output of £600m, planned spending must also be £600m.','The diagram shows only the deflationary case.'),
      step('Planned spending is only £550m','At Y = 600, AE = 100 + 0.75 × 600 = 550.','Spending falls short of the amount needed for full employment.'),
      step('An extra £50m injection closes the spending gap','600 − 550 = £50m.\nRaise autonomous spending by £50m to bring equilibrium to full employment.','The deflationary gap is the vertical spending shortfall at YF.'),
      step('£50m more spending raises income by £200m','The multiplier is 4: £50m × 4 = £200m.\nIncome rises from £400m to £600m.','The initial injection is £50m; the output shortfall is £200m.')
    ]},
    'inflationary-gap-diagram':{...low,autonomous:200,mode:'inflation',steps:[
      step('Full employment requires £600m of spending','At full-employment output of £600m, planned spending must also be £600m.','The diagram shows only the inflationary case.'),
      step('Planned spending is £650m','At Y = 600, AE = 200 + 0.75 × 600 = 650.','Spending exceeds full-employment output, creating inflationary pressure.'),
      step('A £50m spending reduction removes excess demand','650 − 600 = £50m.\nReduce autonomous spending by £50m so planned spending at full employment is £600m.','The inflationary gap is the vertical spending excess at YF.')
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
