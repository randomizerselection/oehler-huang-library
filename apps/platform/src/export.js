function downloadBlob(content, mimeType, filename) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value) {
  const text = value == null ? "" : typeof value === "string" ? value : JSON.stringify(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function exportJson(record) {
  downloadBlob(JSON.stringify(record, null, 2), "application/json", `${record.input.run_id}.econmark.json`);
}

export function exportCsv(record) {
  const { input, output } = record;
  const rows = [
    ["run_id", "student_ref", "command_word", "provisional_mark", "final_mark", "confidence", "decision", "schema_version", "workflow_version", "prompt_version", "model_version"],
    [
      input.run_id,
      input.student_ref,
      input.command_word,
      output.provisional_mark,
      output.final_mark,
      output.confidence,
      output.teacher_review?.decision ?? "pending",
      output.schema_version,
      output.workflow_version,
      output.prompt_version,
      output.model_version
    ]
  ];
  downloadBlob(rows.map((row) => row.map(csvCell).join(",")).join("\r\n"), "text/csv;charset=utf-8", `${input.run_id}.econmark.csv`);
}

export function printReport() {
  window.print();
}
