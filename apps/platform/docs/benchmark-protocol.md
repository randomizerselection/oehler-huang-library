# 50-script validation protocol

## Sampling

Select 25 `Analyse [6]` and 25 `Discuss [8]` scripts, covering five questions per command word. Within each group balance weak, middle, and strong work and include both clear and challenging handwriting. Assign pseudonymous case IDs before scanning. Record exclusions and do not replace difficult cases merely because the model struggles.

## Ground truth and blinding

Mark all 50 manually using the official question-specific mark scheme before viewing any agent output. Record the mark, level, evidence rationale, and manual time. After at least seven days, blind re-mark ten preselected scripts to estimate teacher consistency. The main comparison uses the first teacher mark; report consistency separately.

Freeze a development/final split before prompt work. The final set remains untouched until prompts, workflow, schemas, and model choices are frozen. Defect fixes after the final run must use a new version and a declared rerun policy.

## Measures

- exact and within-one mark agreement;
- quadratic weighted Cohen’s kappa;
- manual versus assisted review time on at least ten scripts;
- transcription word accuracy overall and for the clear-script stratum;
- invented quotations, rubric-unsupported credit, duplicated credit, schema failures, and premature final marks;
- four teacher feedback ratings: accuracy, specificity, actionability, and tone;
- three-run repeatability on every final case.

## Release gates

Exact agreement ≥75%; within-one ≥95%; weighted kappa ≥0.80; assisted review time at least 50% lower; transcription word accuracy ≥98% for clear scripts and ≥95% overall after separately identifying genuinely illegible spans; feedback average ≥4.5/5; zero invented quotations; zero rubric-unsupported credit; and zero final marks without teacher action.

Report the denominator, confidence intervals where practical, exclusions, missing ratings, model date/version, and teacher consistency. If a gate fails, narrow the supported scope or keep the feature in pilot status.
