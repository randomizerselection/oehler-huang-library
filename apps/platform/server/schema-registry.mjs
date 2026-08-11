import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const SCHEMA_FILES = Object.freeze([
  "grading-input.schema.json",
  "parsed-rubric.schema.json",
  "evidence-record.schema.json",
  "grading-output.schema.json",
  "teacher-review.schema.json",
  "audit-record.schema.json",
  "batch-run.schema.json",
  "transcription-output.schema.json",
  "primary-score.schema.json",
  "reviewer-score.schema.json",
  "adjudicator-output.schema.json",
  "feedback-output.schema.json",
  "account.schema.json",
  "auth-session.schema.json",
  "persistence-record.schema.json",
  "stored-run.schema.json"
]);

function formatErrors(errors = []) {
  return errors
    .slice(0, 8)
    .map((error) => `${error.instancePath || "/"} ${error.message}`)
    .join("; ");
}

export async function createSchemaRegistry(root = process.cwd()) {
  const schemas = await Promise.all(SCHEMA_FILES.map(async (filename) => (
    JSON.parse(await readFile(resolve(root, "spec", filename), "utf8"))
  )));
  const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
  ajv.addSchema(schemas);

  return Object.freeze({
    schema(id) {
      const validate = ajv.getSchema(id);
      if (!validate) throw new Error(`Schema is not registered: ${id}`);
      return schemas.find((schema) => schema.$id === id);
    },
    assert(id, value) {
      const validate = ajv.getSchema(id);
      if (!validate) throw new Error(`Schema is not registered: ${id}`);
      if (!validate(value)) throw new Error(formatErrors(validate.errors));
      return value;
    }
  });
}

export { SCHEMA_FILES };
