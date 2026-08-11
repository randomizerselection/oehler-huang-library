package com.oehlerhuang.definitions.data

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.emptyPreferences
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.io.IOException

private val Context.definitionProgressDataStore by preferencesDataStore(name = "definition_progress")

class ProgressRepository(
    private val context: Context,
) {
    private val json = Json {
        encodeDefaults = true
        ignoreUnknownKeys = true
    }

    val progress: Flow<ProgressSnapshot> = context.definitionProgressDataStore.data
        .catch { error ->
            if (error is IOException) emit(emptyPreferences())
            else throw error
        }
        .map { preferences ->
            preferences[PROGRESS_JSON]?.let { encoded ->
                runCatching { json.decodeFromString<ProgressSnapshot>(encoded) }.getOrDefault(ProgressSnapshot())
            } ?: ProgressSnapshot()
        }

    suspend fun update(transform: (ProgressSnapshot) -> ProgressSnapshot) {
        context.definitionProgressDataStore.edit { preferences ->
            val current = preferences[PROGRESS_JSON]?.let { encoded ->
                runCatching { json.decodeFromString<ProgressSnapshot>(encoded) }.getOrDefault(ProgressSnapshot())
            } ?: ProgressSnapshot()
            preferences[PROGRESS_JSON] = json.encodeToString(transform(current))
        }
    }

    suspend fun toggleFavorite(definitionId: String) {
        update { snapshot ->
            val current = snapshot.cards[definitionId] ?: CardProgress()
            snapshot.copy(cards = snapshot.cards + (definitionId to current.copy(favorite = !current.favorite)))
        }
    }

    suspend fun saveLastScope(scope: String) {
        update { snapshot -> snapshot.copy(lastStudyScope = scope) }
    }

    suspend fun recordReview(definitionId: String, grade: ReviewGrade, todayEpochDay: Long = currentEpochDay()) {
        update { snapshot ->
            val current = snapshot.cards[definitionId] ?: CardProgress()
            val nextBox = when (grade) {
                ReviewGrade.Again -> 0
                ReviewGrade.Hard -> (current.box - 1).coerceAtLeast(0)
                ReviewGrade.Know -> (current.box + 1).coerceAtMost(KNOW_INTERVALS.lastIndex)
            }
            val dueAt = when (grade) {
                ReviewGrade.Again -> todayEpochDay
                ReviewGrade.Hard -> todayEpochDay + 1
                ReviewGrade.Know -> todayEpochDay + KNOW_INTERVALS[nextBox]
            }

            val next = current.copy(
                box = nextBox,
                dueAtEpochDay = dueAt,
                lastReviewedAtEpochDay = todayEpochDay,
                reviewCount = current.reviewCount + 1,
                knownCount = current.knownCount + if (grade == ReviewGrade.Know) 1 else 0,
                againCount = current.againCount + if (grade == ReviewGrade.Again) 1 else 0,
            )
            snapshot.copy(cards = snapshot.cards + (definitionId to next))
        }
    }

    private companion object {
        val PROGRESS_JSON = stringPreferencesKey("progress_json")
        val KNOW_INTERVALS = listOf(1L, 3L, 7L, 14L, 30L, 60L)
        const val MILLIS_PER_DAY = 86_400_000L

        fun currentEpochDay(): Long = System.currentTimeMillis() / MILLIS_PER_DAY
    }
}
