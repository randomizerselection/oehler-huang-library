package com.oehlerhuang.definitions.data

import kotlinx.serialization.Serializable

@Serializable
data class Definition(
    val id: String,
    val ref: String,
    val term: String,
    val termZh: String,
    val definition: String,
    val definitionZh: String,
    val unitId: String,
    val unitTitle: String,
    val unitTitleZh: String,
    val topicId: String,
    val topicTitle: String,
    val isFormula: Boolean,
)

@Serializable
data class CardProgress(
    val favorite: Boolean = false,
    val box: Int = 0,
    val dueAtEpochDay: Long = 0,
    val lastReviewedAtEpochDay: Long? = null,
    val reviewCount: Int = 0,
    val knownCount: Int = 0,
    val againCount: Int = 0,
)

@Serializable
data class ProgressSnapshot(
    val cards: Map<String, CardProgress> = emptyMap(),
    val lastStudyScope: String = "due",
)

data class UnitGroup(
    val unitId: String,
    val unitTitle: String,
    val unitTitleZh: String,
    val count: Int,
)

data class Stats(
    val total: Int,
    val favorites: Int,
    val dueNow: Int,
    val reviewedToday: Int,
    val knownCount: Int,
    val againCount: Int,
)

enum class ReviewGrade {
    Again,
    Hard,
    Know,
}
