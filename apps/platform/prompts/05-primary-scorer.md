# Primary scoring node

## Inputs

Teacher-confirmed rubric, confirmed transcript, and extracted evidence table.

## Task

Award only credit justified by the evidence table and rubric. Apply caps and level descriptors exactly. Do not reward style, length, or generally correct economics unless the rubric permits it. Do not double-count evidence. Treat one-sided `Discuss` answers and unsupported judgments according to supplied caps.

Return an integer `primary_mark`, the applicable level, a criterion-by-criterion decision, and reasons. Preserve the supplied evidence identifiers. If a mark cannot be defended, choose the lower mark and require manual review.
