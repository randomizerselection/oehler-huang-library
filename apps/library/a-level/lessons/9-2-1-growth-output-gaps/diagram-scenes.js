(function () {
  const step=(label,text,takeaway='')=>({label,text,takeaway});
  const scenes={
    'keynesian-as-ranges':{model:'growth-ranges',steps:[
      step('Aggregate supply relates output to the price level','AS is the total real output producers are willing and able to supply at each general price level.','AD is total planned expenditure on domestic output at each general price level.'),
      step('Horizontal range: AD raises output at constant prices','Many resources are idle. Firms can expand production without bidding up input costs.','An AD increase raises real output; the price level stays constant in this simplified range.'),
      step('Upward-sloping range: AD raises output and prices','Some labour and capital are becoming scarce. Expanding production raises costs.','As the economy approaches full employment, a larger share of extra demand raises prices.'),
      step('Vertical range: AD raises prices, not real output','Resources are fully employed at Y_{fe}. With capacity fixed, output cannot rise further in this model.','The vertical limit shifts only when productive capacity changes.')
    ]},
    'fiscal-expansion-adas':{model:'growth-fiscal',steps:[
      step('Initial equilibrium is below full employment','Real output is 400; potential output is 600. The output shortfall is £200bn.','We will examine the same shortfall in an expenditure–output diagram.'),
      step('Rising prices can reduce the real-output response','Fiscal expansion shifts AD right. At the original price level it would support 600, but the rising AS range pushes prices up. Actual output reaches Y_{1}, below 600.','The fixed-price multiplier overstates the output gain when supply becomes less responsive.'),
      step('Closing the gap may require more demand','A further AD increase reaches Y_{fe} = 600 at a higher price level. More demand at the vertical limit would raise prices alone.','Use AD/AS to evaluate the fixed-price assumption in the following numerical model.')
    ]},
    'keynesian-growth':{model:'growth-keynesian',steps:[
      step('Read two different output measures','AD₀ meets AS₀ below Y_{fe,0}: equilibrium actual output is Y₀. The vertical AS section marks full-employment capacity.','AD: total planned spending. AS: output firms supply at each price level.'),
      step('Stronger AD uses existing spare capacity','AD shifts to AD₁. Output rises from Y₀ to Y₁, while Y_{fe,0} stays fixed.','Actual growth without potential growth; this flat-range illustration holds prices constant.'),
      step('More capacity need not raise actual output','AS shifts outward to AS₁; capacity rises to Y_{fe,1}. AD₁ still meets the flat AS section at Y₁.','Potential growth without immediate actual growth.'),
      step('Demand can use the additional capacity','AD₂ raises actual output to Y₂. Compare the initial and final positions.','Both actual and potential growth; an output gap can remain.')
    ]},
    'growth-at-full-employment':{model:'growth-keynesian-capacity',steps:[
      step('Initial equilibrium is at full employment','AD₀ intersects the vertical section of AS₀ at Y_{fe,0}.','What must change to increase sustainable output?'),
      step('An outward AS shift raises potential output','Better resources or technology shift AS to AS₁. Its vertical limit moves to Y_{fe,1}.','This is potential growth, equivalent to an outward PPC shift.'),
      step('Unchanged AD can use some extra capacity','The new intersection E₁ has a lower price level and higher actual output Y₁. Some new capacity remains unused.','Compare with the flat-range example: there, expanding capacity alone did not raise output.'),
      step('Further demand uses the new full-employment capacity','AD₁ intersects AS₁ at Y_{fe,1}. Actual output and potential output have both increased.','Explain both the capacity shift and how the extra capacity is used.')
    ]},
    'negative-gap-adas':{model:'growth-keynesian-gap',steps:[
      step('Equilibrium output is set by AD and AS','Their intersection E gives actual output Y₁ and price level P₁.','Equilibrium output is the level at which aggregate demand equals aggregate supply.'),
      step('Potential output is at the vertical AS section','Project the vertical section down to Y_{fe}. This is the convention used in the original Paper 3 diagram.','Full employment excludes cyclical unemployment; frictional and structural unemployment can remain.'),
      step('Actual output below potential leaves a negative gap','Y₁ − Y_{fe} < 0. The horizontal distance measures the output shortfall.','Label the equilibrium, price level, actual output, potential output and gap.')
    ]},
    'negative-gap-sras':{model:'growth-adas',positive:false,steps:[
      step('Mark the same potential output on LRAS','Keep Y_{fe} as the sustainable full-employment benchmark.','The separate SRAS curve will also let us show temporary output above potential on the next slide.'),
      step('AD and SRAS set short-run equilibrium output','E gives Y₁ below Y_{fe}. This is the same negative-gap relationship in an alternative model.','Actual output is determined at the intersection, not by the position of LRAS alone.'),
      step('The output shortfall is horizontal','Y₁ − Y_{fe} < 0. Keep these axes and Y_{fe} for the next positive-gap diagram.','Explain why both AD/AS versions show unemployed resources here.')
    ]},
    'positive-gap-adas':{model:'growth-adas',positive:true,steps:[
      step('Keep the same sustainable benchmark','LRAS and SRAS use the same scales as the preceding diagram.','A vertical LRAS does not prevent temporary output above Y_{fe}.'),
      step('Stronger AD gives output above Y_{fe}','The short-run AD–SRAS equilibrium E lies to the right of LRAS.','Overtime and deferred maintenance allow unusually intensive resource use.'),
      step('The positive gap brings cost pressure','Y₁ − Y_{fe} > 0. Scarce labour and inputs put upward pressure on costs and prices.','This cannot be sustained indefinitely; do not interpret it as potential growth.')
    ]},
    'multiplier-gap-bridge':{model:'growth-ae',steps:[
      step('Attempt the required injection first','Actual Y = 400; Y_{fe} = 600. AE₀ = 100 + 0.75Y. All figures are £bn. How much extra autonomous spending is needed?','Assume fixed prices, spare resources, no taxes or imports.'),
      step('At Y_{fe}, spending is £50bn too low','AE₀ = 100 + 0.75 × 600 = 550. Required expenditure = 600, so the spending gap is 50.','The vertical expenditure gap differs from the £200bn output shortfall.'),
      step('The multiplier converts 50 into 200','$k = \\frac{1}{1 − 0.75} = 4$.\nΔY = k × ΔG = 4 × 50 = 200.\nAE₁ = 150 + 0.75Y.','The new equilibrium is Y = Y_{fe} = 600. Label both changes.')
    ]},
    'stagflation-shock':{model:'growth-shock',steps:[
      step('Start at full employment','AD₀ meets SRAS₀ at E₀, with Y = Y_{fe} and price level P₀.','Hold potential output fixed to isolate a temporary rise in production costs.'),
      step('Higher costs shift SRAS left','A widespread energy-cost increase reduces supply at every price level. SRAS moves to SRAS₁.','A supply shock differs from falling demand.'),
      step('Prices rise while output falls','E₁ has a higher price level P₁ and lower output Y₁. The gap is negative despite rising prices.','One shift raises the price level; repeated shocks can sustain inflation.')
    ]},
    'stagflation-policy':{model:'growth-policy',steps:[
      step('Begin with the shocked economy','At E₁, actual output is below Y_{fe} and the price level is above its initial level.','Choose a policy direction before revealing either alternative.'),
      step('Expansion closes the gap but raises prices','Extra government spending shifts AD right. Output returns to Y_{fe} at E₂, but P rises further.','Demand expansion alone cannot solve both symptoms of this supply shock.'),
      step('Contraction lowers prices but widens the gap','Alternatively, reducing AD lowers P at E₃ while Y falls further below Y_{fe}.','Compare this alternative with the original shocked equilibrium.'),
      step('Lower costs can improve both outcomes','A successful supply measure shifts SRAS back to the right. With AD₀ unchanged, output returns to Y_{fe} and the price level falls.','Explain which bottleneck the policy removes; allow for delays and financing costs.')
    ]},
    'using-and-expanding-capacity':{model:'growth-capacity',steps:[
      step('Some productive resources are idle','Actual output is £800bn.\nExisting resources can sustainably produce £1000bn.','Each block represents £100bn of annual real output.'),
      step('Using idle resources raises output','Actual output rises to £900bn.\nSustainable capacity remains £1000bn.','Which changed: what is produced, or what could be produced?'),
      step('Better resources expand capacity','Capacity rises to £1200bn.\nActual output initially remains £900bn.','Does greater capacity guarantee more output immediately?')
    ]},
    'ppc-growth':{model:'growth-ppc',steps:[
      step('Point A leaves some resources unused','The PPC shows the combinations of two goods the economy could produce with current resources and technology.','Draw the frontier and label point A inside it.'),
      step('A to B: actual growth','More of both goods are produced by using previously idle resources.\nPPC₁ stays fixed.','Label the movement A → B: actual growth only.'),
      step('PPC₁ to PPC₂: potential growth','More or better resources and technology make additional combinations possible.','The outward shift shows increased capacity, even if output stays at B.'),
      step('B to C uses the new capacity','If demand uses the additional capacity, production can rise to C.','Across the whole sequence, both actual and potential growth occur.')
    ]},
    'negative-gap':{model:'growth-series',actual:[940,960,980],potential:[1000,1020,1040],steps:[
      step('Potential output is the sustainable benchmark','The dashed line rises as productive capacity increases.\nAll values are annual real GDP in £bn.','This is an illustrative output–time graph, not an AE–Y diagram.'),
      step('Actual output grows below potential','The solid line rises from 940 to 980.\nIt remains below the potential-output line.','Rising output does not imply a positive output gap.'),
      step('The final output gap is −£60bn','Year 3: 980 − 1040 = −60.\nThe gap is the vertical distance between the lines at that date.','Explain why positive growth can coexist with unused capacity.')
    ]},
    'positive-gap':{model:'growth-series',actual:[1020,1050,1080],potential:[1000,1020,1040],steps:[
      step('Keep the same scale and benchmark','Potential output is again 1000, 1020 and 1040.\nCompare with the previous graph.','Potential output is sustainable capacity, not an absolute physical ceiling.'),
      step('Actual output temporarily exceeds potential','Overtime and deferred maintenance can raise production above its sustainable level.','This intensity of resource use cannot continue indefinitely.'),
      step('The final output gap is +£40bn','Year 3: 1080 − 1040 = +40.\nIntensive resource use puts upward pressure on wages and prices.','A positive gap describes actual above potential, not simply a rising GDP line.')
    ]}
  };
  window.ALEVEL_LESSON.slides.forEach(s=>{if(s.kind==='diagram')s.scene=scenes[s.diagram];});
}());
