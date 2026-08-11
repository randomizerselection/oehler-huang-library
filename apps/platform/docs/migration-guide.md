# EconMark provider and infrastructure migration guide

EconMark 3.0 already runs as a provider-neutral custom application. Migration means either changing model APIs or moving the application/data to another domestic server; Coze and Dify are optional destinations, not the canonical record store.

## Portable assets

- `spec/*.schema.json`: grading, account, session and persistence contracts.
- `prompts/*.md`: separated OCR, rubric, scoring, review, adjudication and feedback responsibilities.
- `src/invariants.js` and `src/batch-workflow.js`: evidence and automatic-approval policies.
- `econmark.sqlite` plus the complete `images/` tree: account-owned permanent records.
- frozen development/final evaluation fixtures and recorded provider/model versions.

## Server migration

1. Stop writes during a maintenance window.
2. Create a consistent encrypted copy of the entire data directory, not only SQLite.
3. Verify file counts, SQLite integrity, image sizes and SHA-256 values.
4. Install the same EconMark release on the destination and configure secrets separately.
5. Restore data with ownership/permissions restricted to the service account.
6. Run account-login, CSRF, cross-account 404, history, image and decision tests.
7. Switch DNS only after TLS and a signed-out/signed-in smoke test pass.
8. Keep the previous server read-only until the destination backup and restore drill succeed.

## Model-provider migration

1. Change only server environment role mappings; never place model keys in browser code.
2. Record the exact provider, model, date and parameters.
3. Run the frozen benchmark before class traffic.
4. Compare OCR, exact/within-one agreement, evidence faithfulness, schema success, latency and cost.
5. Create new runs for deliberate regrading; do not silently overwrite historical provider traces.

Schema compatibility is necessary but does not demonstrate equivalent grading quality. Every model change requires empirical revalidation.

## Coze or Dify adapter

An adapter may call EconMark's grading contracts, but account registration, ownership checks, permanent images, idempotency, CSRF, quotas and audit updates must remain in the custom server unless the destination reproduces and tests them. Importing prompts alone is not a migration of the product.
