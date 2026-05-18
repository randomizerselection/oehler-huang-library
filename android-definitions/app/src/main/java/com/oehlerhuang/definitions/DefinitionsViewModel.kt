package com.oehlerhuang.definitions

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.oehlerhuang.definitions.data.CardProgress
import com.oehlerhuang.definitions.data.Definition
import com.oehlerhuang.definitions.data.DefinitionRepository
import com.oehlerhuang.definitions.data.ProgressRepository
import com.oehlerhuang.definitions.data.ProgressSnapshot
import com.oehlerhuang.definitions.data.ReviewGrade
import com.oehlerhuang.definitions.data.Stats
import com.oehlerhuang.definitions.data.UnitGroup
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

enum class AppTab {
    Browse,
    Study,
    Stats,
}

data class StudySession(
    val scope: String,
    val cards: List<Definition>,
    val index: Int = 0,
    val revealed: Boolean = false,
    val known: Int = 0,
    val hard: Int = 0,
    val again: Int = 0,
) {
    val current: Definition? = cards.getOrNull(index)
    val complete: Boolean = cards.isNotEmpty() && index >= cards.size
    val left: Int = (cards.size - index).coerceAtLeast(0)
}

class DefinitionsViewModel(application: Application) : AndroidViewModel(application) {
    private val progressRepository = ProgressRepository(application)
    val definitions: List<Definition> = DefinitionRepository(application).loadDefinitions()

    val query = MutableStateFlow("")
    val selectedUnitId = MutableStateFlow("all")
    val activeTab = MutableStateFlow(AppTab.Browse)
    val selectedDefinition = MutableStateFlow<Definition?>(null)
    val studySession = MutableStateFlow<StudySession?>(null)

    val progress: StateFlow<ProgressSnapshot> = progressRepository.progress.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = ProgressSnapshot(),
    )

    val unitGroups: List<UnitGroup> = definitions
        .groupBy { it.unitId }
        .map { (_, entries) ->
            val first = entries.first()
            UnitGroup(first.unitId, first.unitTitle, first.unitTitleZh, entries.size)
        }

    fun setQuery(value: String) {
        query.value = value
    }

    fun setUnit(unitId: String) {
        selectedUnitId.value = unitId
    }

    fun openTab(tab: AppTab) {
        activeTab.value = tab
        if (tab != AppTab.Browse) selectedDefinition.value = null
    }

    fun openDefinition(definition: Definition) {
        selectedDefinition.value = definition
    }

    fun closeDefinition() {
        selectedDefinition.value = null
    }

    fun toggleFavorite(definitionId: String) {
        viewModelScope.launch {
            progressRepository.toggleFavorite(definitionId)
        }
    }

    fun startStudy(scope: String) {
        val snapshot = progress.value
        val cards = cardsForScope(scope, snapshot).shuffled()
        viewModelScope.launch {
            progressRepository.saveLastScope(scope)
        }
        studySession.value = StudySession(scope = scope, cards = cards)
        activeTab.value = AppTab.Study
        selectedDefinition.value = null
    }

    fun studySingle(definition: Definition) {
        studySession.value = StudySession(scope = "single:${definition.id}", cards = listOf(definition))
        activeTab.value = AppTab.Study
        selectedDefinition.value = null
    }

    fun revealCurrentCard() {
        val session = studySession.value ?: return
        studySession.value = session.copy(revealed = true)
    }

    fun markCurrentCard(grade: ReviewGrade) {
        val session = studySession.value ?: return
        val current = session.current ?: return
        viewModelScope.launch {
            progressRepository.recordReview(current.id, grade)
        }

        studySession.value = session.copy(
            index = session.index + 1,
            revealed = false,
            known = session.known + if (grade == ReviewGrade.Know) 1 else 0,
            hard = session.hard + if (grade == ReviewGrade.Hard) 1 else 0,
            again = session.again + if (grade == ReviewGrade.Again) 1 else 0,
        )
    }

    fun resetStudySession() {
        val scope = studySession.value?.scope ?: progress.value.lastStudyScope
        startStudy(scope)
    }

    fun filteredDefinitions(snapshot: ProgressSnapshot): List<Definition> {
        val normalizedQuery = query.value.trim().lowercase()
        val unit = selectedUnitId.value
        return definitions.filter { definition ->
            val unitMatches = unit == "all" || definition.unitId == unit
            val queryMatches = normalizedQuery.isBlank() ||
                listOf(
                    definition.ref,
                    definition.term,
                    definition.termZh,
                    definition.definition,
                    definition.definitionZh,
                    definition.topicTitle,
                    definition.unitTitle,
                ).any { it.lowercase().contains(normalizedQuery) }
            unitMatches && queryMatches
        }.sortedWith(compareByDescending<Definition> { snapshot.cards[it.id]?.favorite == true }
            .thenBy { it.ref }
            .thenBy { it.term })
    }

    fun cardsForScope(scope: String, snapshot: ProgressSnapshot): List<Definition> {
        val today = currentEpochDay()
        return when {
            scope == "all" -> definitions
            scope == "due" -> definitions.filter { definition ->
                val card = snapshot.cards[definition.id]
                card == null || card.dueAtEpochDay <= today
            }
            scope == "favorites" -> definitions.filter { snapshot.cards[it.id]?.favorite == true }
            scope.startsWith("unit:") -> {
                val unitId = scope.removePrefix("unit:")
                definitions.filter { it.unitId == unitId }
            }
            scope.startsWith("topic:") -> {
                val topicId = scope.removePrefix("topic:")
                definitions.filter { it.topicId == topicId }
            }
            scope.startsWith("single:") -> {
                val definitionId = scope.removePrefix("single:")
                definitions.filter { it.id == definitionId }
            }
            else -> definitions
        }
    }

    fun topicsForUnit(unitId: String): List<Pair<String, String>> {
        return definitions
            .filter { it.unitId == unitId }
            .groupBy { it.topicId }
            .map { (topicId, entries) -> topicId to entries.first().topicTitle }
    }

    fun stats(snapshot: ProgressSnapshot): Stats {
        val today = currentEpochDay()
        return Stats(
            total = definitions.size,
            favorites = snapshot.cards.values.count { it.favorite },
            dueNow = definitions.count { definition ->
                val progress = snapshot.cards[definition.id]
                progress == null || progress.dueAtEpochDay <= today
            },
            reviewedToday = snapshot.cards.values.count { it.lastReviewedAtEpochDay == today },
            knownCount = snapshot.cards.values.sumOf(CardProgress::knownCount),
            againCount = snapshot.cards.values.sumOf(CardProgress::againCount),
        )
    }

    private fun currentEpochDay(): Long = System.currentTimeMillis() / MILLIS_PER_DAY

    private companion object {
        const val MILLIS_PER_DAY = 86_400_000L
    }
}
