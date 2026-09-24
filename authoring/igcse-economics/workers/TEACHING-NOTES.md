# Workers lesson 1: choice of occupation

Prepared 20 September 2026. This is the next active IGCSE Economics HTML deck after **Households: spending, saving and borrowing**. Preparation does not imply taught coverage.

## Canonical files and sequence

- Edit `apps/library/lessons/unit-3-decision-makers/3-3-workers/slides.js` directly for later classroom feedback. Preserve existing slide IDs.
- The lesson owns `index.html`, `workers.css`, `workers.js` and `sources.js`. Shared presentation code was not changed.
- The Economics landing page links lesson, handout, quiz and flashcards immediately after Households.

## Syllabus and definition audit

The original **Cambridge IGCSE Economics 0455 syllabus for 2027, 2028 and 2029**, page 16, places this immediately after 3.2 Households:

> 3.3.1 Factors affecting an individual’s choice of occupation
>
> - wage and non-wage factors

The retained definitions reference identifies wage factors as pay, wages, pensions, bonuses and other financial rewards. It identifies non-wage factors as working conditions, job satisfaction, interest, status, vocation, family tradition, job security, fringe benefits, pensions, working hours and promotion prospects.

The lesson keeps the syllabus categories visible throughout: **wage factors** and **non-wage factors**. It defines wage factors as payments and other monetary benefits, explicitly teaching basic pay, overtime, bonus, commission and pensions. It notes that some classifications describe pensions as a fringe benefit. To avoid ambiguity in assessed Identify answers, students use clear non-wage examples such as job security, hours, location and working conditions.

Wage determination, labour-market diagrams, wage differences and labour mobility remain later 3.3 lessons. The final builder/teacher question is answerable entirely through pay, working conditions and job satisfaction already taught here; mobility terminology is not required.

## Original questions checked

Question papers and matching official mark schemes were read from `C:/Users/oehle/Documents/past-papers/`. Relevant pages were rendered to confirm exact stems and option order.

| Paper | QP page | MS page | Lesson use and verified basis |
|---|---:|---:|---|
| 0455/13 M/J/2025 Q11 | 6 | 2 | Original MCQ on a non-wage factor. Options preserved. Official answer **D**, risk of unemployment / job security. |
| 0455/13 O/N/2024 Q12 | 5 | 2 | Original MCQ on increasing the supply of nurses. Options preserved. Official answer **B**, improving working conditions. |
| 0455/21 O/N/2025 Q4(a) | 4 | 21 | Identify two non-wage factors [2]. The complete accepted list and “first three” guidance are retained in the source record. |
| 0455/22 F/M/2025 Q3(b) | 4 | 17 | Explain two reasons building workers may not become teachers [4]. The lesson model uses accepted higher-pay/danger and job-satisfaction/working-condition points. |
| 0455/21 M/J/2023 Q4(a) | 4 | 17 | Identify two influences on which country a person decides to work in [2]. The lesson model uses wages and working conditions. |
| 0455/22 M/J/2025 Q4(d) | 4 | 25 | Discuss whether a doctor benefits from working in another country [8]. The model develops both sides and a conditional judgement. |

The Paper 2 question and mark-scheme archive entry in `3-microeconomic-decision-makers.md` was used for discovery, but the original PDFs were the final authority.

## Teaching logic and pacing

The revised deck contains 52 slides and is planned for about 90 minutes with independent writing and feedback. The additional slides include a question-led teaching hook, sourced data charts and original past-paper practice.

1. **Opening and wage factors.** Retrieve the preceding Households lesson, then ask why someone may choose teaching over a higher-paid job on a full-screen teaching image. Emma's two photographed offers and the complete choice question appear together. Students then name the assessed categories, learn pay / wages, overtime pay, bonuses and commission, and complete the original 2025 Paper 1 distinction question.
2. **Non-wage factors.** Students infer factors from an eight-picture gallery. Each numbered factor has a short sentence with highlighted defining phrases and two concise examples from *different* occupations. Striking examples include a rainy roofer, an investment banking analyst whose work can extend very late, and an offshore technician away from home for weeks. Generated images show these situations clearly. U.S. Bureau of Labor Statistics charts show 2024 fatal-injury rates for selected jobs and 2025 average hours actually worked across broad occupation groups. A separate chart contrasts an illustrative 40-hour schedule with mean weeks of 98 and 105 hours reported by a group of 13 first-year analysts in 2021; the caption explicitly warns that this small group is not representative of all analysts. The safety/security contrast uses two pictures, highlighted definitions and no blanks.
3. **Past-paper questions.** Students complete the original Lanzarote non-wage Identify question, 2023 Philippines country-choice Identify question, and four-mark Estonia builder/teacher question. A two-workplace doctor image leads into the original 2025 eight-mark discussion on working in another country. Extract and question remain on the same slide; teacher-written models are separate from official mark schemes. None of these question IDs appears in the current IC2 monthly-exam selection.

## Assumptions and safeguards

- Emma, Jack and Lucy are fictional adults. The job offers are fictional and use yuan only as classroom comparison units; they are not claims about current salaries.
- Offer A pays ¥7,200 monthly and Offer B ¥6,600, so the visible difference is ¥600. The lesson does not invent unknown overtime or pension amounts.
- A better occupation is not universal. Workers can rationally choose differently because their circumstances and priorities differ.
- The opposing examples are illustrative jobs in different occupations. They do not assert that every job in an occupation has identical conditions.
- The 2024 Wall Street Oasis survey documents 90+ hour weeks among some investment-banking respondents; it is self-selected and not an average for every analyst. OPITO describes a technician working a three-week offshore rotation; schedules vary. These examples are intentionally unusual to prompt discussion, with the source context available on demand.
- A separate 2021 first-year analyst survey reports mean weeks of 98 and 105 hours among only 13 respondents. The chart contrasts those observations with an illustrative 40-hour schedule and states the sample and year visibly.
- The lesson does not teach that a lower-paid job is always preferable or that pay is unimportant; it requires students to compare the whole offer.

## Design

The local design adapts the approved Enterprise classroom palette: warm white teaching slides, navy text, teal explanations and red only for errors. Emma's offers use specific photographs and high-contrast headings. The non-wage sequence uses local, credited photographs and disclosed OpenAI-generated teaching images where a photograph was not sufficiently self-explanatory. Past-paper settings open with image-only full-screen pauses, so no white title sits over a bright image; the academic title follows on the extract slide. Original question sources, official mark schemes, photograph credits, generated-image disclosures and teacher-written models are exposed through distinct source buttons and a keyboard-safe modal.

## Validation

- JavaScript syntax checks passed for `slides.js` and `workers.js`.
- `npx playwright test tests/workers.spec.js --project=chromium-desktop --workers=1` passed all three tests after the new working-hours chart and images. The fit test opens and completes every one of the 52 slides at 1440×810 and 390×844; a specific check keeps the full discussion model above the footer.
- The in-app browser was used to inspect the teacher question overlay, completed working-conditions slide with two different occupations and highlighted definition, both sourced charts, the safety/security photograph comparison, doctor discussion opener, original extract and completed model.
- The library desktop smoke run completed 161 passes, one skip and five failures outside this Workers lesson. Three selector/attendance cases timed out, one homework leader screen timed out, and one A-level file selector expectation disagreed with an existing cache-buster query string.
- `/api/config` returned HTTP 200. The isolated EconMark student single-answer HTTP test and 30-student feedback-pack test passed (five platform tests total). `npm run build:content` was not run because this revision changes neither routes nor titles, quiz data, referenced quiz files, or the content builder.

No deployment was requested.
