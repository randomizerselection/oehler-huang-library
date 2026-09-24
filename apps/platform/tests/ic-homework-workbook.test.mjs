import assert from "node:assert/strict";
import test from "node:test";
import { detectIcGrade, planIcHomeworkImport } from "../scripts/lib/ic-homework-workbook.mjs";

test("detectIcGrade reads the grade from a Ketangpai filename or sheet", () => {
  assert.equal(detectIcGrade("IC3 Economics", "scores.xls"), "IC3");
  assert.equal(detectIcGrade("Sheet1", "IC2 Economics_scores.xls"), "IC2");
});

test("IC imports cover every numbered class and consolidate duplicate source accounts", () => {
  const classes = [
    { class_id: "c1", name: "IC3.1", owner_account_id: "teacher" },
    { class_id: "c2", name: "IC3.2", owner_account_id: "teacher" },
    { class_id: "ci", name: "IC3 Investment", owner_account_id: "teacher" }
  ];
  const roster = [
    { class_id: "c1", account_id: "a1", student_id: "STU-1", display_name: "张一 Amy", legal_name: "张一" },
    { class_id: "c2", account_id: "a2", student_id: "STU-2", display_name: "李二 Ben", legal_name: "李二" }
  ];
  const workbook = {
    sourceName: "IC3 scores.xls",
    sheetName: "IC3 Economics",
    assignmentColumns: [{ header: "Living standards", column: 7 }, { header: "Supply-side policy", column: 8 }, { header: "Old work", column: 9 }],
    rows: [
      { rowNumber: 2, name: "张一101", externalId: "ktp-a", studentNumber: "1", values: { "Living standards": "未交", "Supply-side policy": 80, "Old work": 90 } },
      { rowNumber: 3, name: "张一", externalId: "ktp-a-old", studentNumber: "", values: { "Living standards": 95, "Supply-side policy": "未交", "Old work": 90 } },
      { rowNumber: 4, name: "Li Er", externalId: "ktp-b", studentNumber: "2", values: { "Living standards": "未交", "Supply-side policy": 70.5, "Old work": 90 } }
    ]
  };
  const plan = planIcHomeworkImport({
    workbook,
    roster,
    classes,
    grade: "IC3",
    latest: 2,
    dates: ["2026-09-20", "2026-09-13"],
    overrides: new Map([["ktp-b", "STU-2"]]),
    ignoredExternalIds: new Set(),
    existingIdentities: new Map()
  });
  assert.deepEqual(plan.targetClasses.map((item) => item.name), ["IC3.1", "IC3.2"]);
  assert.equal(plan.assignments.length, 2);
  assert.equal(plan.assignments[0].classes[0].items[0].status, "submitted");
  assert.equal(plan.assignments[0].classes[0].items[0].score, 95);
  assert.equal(plan.assignments[1].classes[0].items[0].status, "submitted");
  assert.equal(plan.assignments[0].classes[1].items[0].status, "missing");
  assert.equal(plan.assignments[1].classes[1].items[0].status, "submitted");
  assert.equal(plan.assignments[1].classes[1].items[0].score, null);
  assert.match(plan.assignments[1].classes[1].items[0].note, /70\.5/);
  assert.equal(plan.assignments.flatMap((item) => item.classes).every((item) => item.items.length === 1), true);
});

test("IC imports stop on unmatched rows instead of guessing identities", () => {
  assert.throws(() => planIcHomeworkImport({
    workbook: {
      sourceName: "IC1.xls",
      sheetName: "IC1",
      assignmentColumns: [{ header: "Demand", column: 7 }],
      rows: [{ rowNumber: 2, name: "Unknown", externalId: "ktp-x", studentNumber: "", values: { Demand: 90 } }]
    },
    roster: [
      { class_id: "c1", account_id: "a1", student_id: "STU-1", display_name: "A", legal_name: "甲" },
      { class_id: "c2", account_id: "a2", student_id: "STU-2", display_name: "B", legal_name: "乙" }
    ],
    classes: [
      { class_id: "c1", name: "IC1.1" },
      { class_id: "c2", name: "IC1.2" }
    ],
    grade: "IC1",
    latest: 1,
    dates: ["2026-09-20"],
    overrides: new Map(),
    ignoredExternalIds: new Set(),
    existingIdentities: new Map()
  }), /do not match/);
});
