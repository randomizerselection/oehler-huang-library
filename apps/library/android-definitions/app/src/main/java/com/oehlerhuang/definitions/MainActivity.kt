package com.oehlerhuang.definitions

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.oehlerhuang.definitions.data.Definition
import com.oehlerhuang.definitions.data.ProgressSnapshot
import com.oehlerhuang.definitions.data.ReviewGrade
import com.oehlerhuang.definitions.data.Stats
import com.oehlerhuang.definitions.data.UnitGroup

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DefinitionsTheme {
                val viewModel: DefinitionsViewModel = viewModel()
                DefinitionsApp(viewModel)
            }
        }
    }
}

@Composable
private fun DefinitionsTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = androidx.compose.material3.lightColorScheme(
            primary = Color(0xFF0F766E),
            secondary = Color(0xFF1D4ED8),
            tertiary = Color(0xFFB45309),
            background = Color(0xFFF8FAFC),
            surface = Color.White,
            surfaceVariant = Color(0xFFE2E8F0),
            onPrimary = Color.White,
            onSecondary = Color.White,
        ),
        content = content,
    )
}

@Composable
private fun DefinitionsApp(viewModel: DefinitionsViewModel) {
    val progress by viewModel.progress.collectAsState()
    val activeTab by viewModel.activeTab.collectAsState()
    val selectedDefinition by viewModel.selectedDefinition.collectAsState()
    val studySession by viewModel.studySession.collectAsState()

    Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
    Scaffold(
            bottomBar = {
                NavigationBar {
                    AppTab.entries.forEach { tab ->
                        NavigationBarItem(
                            selected = activeTab == tab,
                            onClick = { viewModel.openTab(tab) },
                            icon = { Text(tab.name.first().toString()) },
                            label = { Text(tab.name) },
                        )
                    }
                }
            },
        ) { padding ->
            val detailDefinition = selectedDefinition
            when {
                detailDefinition != null -> DefinitionDetailScreen(
                    definition = detailDefinition,
                    progress = progress,
                    onBack = viewModel::closeDefinition,
                    onFavorite = { viewModel.toggleFavorite(detailDefinition.id) },
                    onStudy = { viewModel.studySingle(detailDefinition) },
                    modifier = Modifier.padding(padding),
                )
                activeTab == AppTab.Browse -> BrowseScreen(viewModel, progress, Modifier.padding(padding))
                activeTab == AppTab.Study -> StudyScreen(viewModel, progress, studySession, Modifier.padding(padding))
                activeTab == AppTab.Stats -> StatsScreen(viewModel, progress, Modifier.padding(padding))
            }
        }
    }
}

@Composable
private fun BrowseScreen(
    viewModel: DefinitionsViewModel,
    progress: ProgressSnapshot,
    modifier: Modifier = Modifier,
) {
    val query by viewModel.query.collectAsState()
    val selectedUnit by viewModel.selectedUnitId.collectAsState()
    val definitions = viewModel.filteredDefinitions(progress)

    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text("Key Definitions", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
                Text(
                    "${viewModel.definitions.size} offline IGCSE Economics definitions with Chinese support",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                OutlinedTextField(
                    value = query,
                    onValueChange = viewModel::setQuery,
                    label = { Text("Search ref, English, Chinese, or wording") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                UnitFilterRow(
                    units = viewModel.unitGroups,
                    selectedUnit = selectedUnit,
                    onSelected = viewModel::setUnit,
                )
                Text("${definitions.size} visible", style = MaterialTheme.typography.labelLarge)
            }
        }

        items(definitions, key = { it.id }) { definition ->
            DefinitionListCard(
                definition = definition,
                favorite = progress.cards[definition.id]?.favorite == true,
                onOpen = { viewModel.openDefinition(definition) },
                onFavorite = { viewModel.toggleFavorite(definition.id) },
            )
        }
    }
}

@Composable
private fun UnitFilterRow(
    units: List<UnitGroup>,
    selectedUnit: String,
    onSelected: (String) -> Unit,
) {
    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        item {
            FilterChip(
                selected = selectedUnit == "all",
                onClick = { onSelected("all") },
                label = { Text("All") },
            )
        }
        items(units, key = { it.unitId }) { unit ->
            FilterChip(
                selected = selectedUnit == unit.unitId,
                onClick = { onSelected(unit.unitId) },
                label = { Text(unit.unitTitle.removePrefix("Unit "), maxLines = 1, overflow = TextOverflow.Ellipsis) },
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun DefinitionListCard(
    definition: Definition,
    favorite: Boolean,
    onOpen: () -> Unit,
    onFavorite: () -> Unit,
) {
    ElevatedCard(
        onClick = onOpen,
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White),
        modifier = Modifier.fillMaxWidth(),
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Column(Modifier.weight(1f)) {
                    Text(definition.ref, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary)
                    Text(definition.term, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(definition.termZh, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.secondary)
                }
                TextButton(onClick = onFavorite) {
                    Text(if (favorite) "Saved" else "Save")
                }
            }
            Text(definition.definition, maxLines = 3, overflow = TextOverflow.Ellipsis)
            Text(
                definition.definitionZh,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Composable
private fun DefinitionDetailScreen(
    definition: Definition?,
    progress: ProgressSnapshot,
    onBack: () -> Unit,
    onFavorite: () -> Unit,
    onStudy: () -> Unit,
    modifier: Modifier = Modifier,
) {
    if (definition == null) return
    val favorite = progress.cards[definition.id]?.favorite == true

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        OutlinedButton(onClick = onBack) { Text("Back") }
        Text(definition.ref, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.primary)
        Text(definition.term, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
        Text(definition.termZh, style = MaterialTheme.typography.titleLarge, color = MaterialTheme.colorScheme.secondary)
        Card(colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Exam-ready definition", style = MaterialTheme.typography.labelLarge)
                Text(definition.definition, style = MaterialTheme.typography.bodyLarge)
                Text(definition.definitionZh, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
        Text("${definition.unitTitle} - ${definition.topicTitle}", style = MaterialTheme.typography.bodyMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            Button(onClick = onStudy) { Text("Study") }
            OutlinedButton(onClick = onFavorite) { Text(if (favorite) "Saved" else "Save") }
        }
    }
}

@Composable
private fun StudyScreen(
    viewModel: DefinitionsViewModel,
    progress: ProgressSnapshot,
    session: StudySession?,
    modifier: Modifier = Modifier,
) {
    if (session == null) {
        StudySetupScreen(viewModel, progress, modifier)
        return
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        if (session.cards.isEmpty()) {
            Text("No cards in this study set", style = MaterialTheme.typography.headlineSmall)
            Text("Choose another scope or save definitions first.")
            Button(onClick = { viewModel.studySession.value = null }) { Text("Choose scope") }
            return@Column
        }

        if (session.complete) {
            Text("Session complete", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            StatRow("Known", session.known.toString())
            StatRow("Hard", session.hard.toString())
            StatRow("Again", session.again.toString())
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Button(onClick = viewModel::resetStudySession) { Text("Study again") }
                OutlinedButton(onClick = { viewModel.studySession.value = null }) { Text("Choose scope") }
            }
            return@Column
        }

        Text("${session.left} left", style = MaterialTheme.typography.labelLarge)
        Flashcard(
            session = session,
            onReveal = viewModel::revealCurrentCard,
            onMark = viewModel::markCurrentCard,
        )
    }
}

@Composable
private fun StudySetupScreen(
    viewModel: DefinitionsViewModel,
    progress: ProgressSnapshot,
    modifier: Modifier = Modifier,
) {
    val stats = viewModel.stats(progress)
    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text("Study", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
                Text("Choose an offline review set. Your progress stays on this device.")
                ScopeButton("Due now", "${stats.dueNow} cards", "due", viewModel::startStudy)
                ScopeButton("Favorites", "${stats.favorites} cards", "favorites", viewModel::startStudy)
                ScopeButton("All definitions", "${stats.total} cards", "all", viewModel::startStudy)
            }
        }
        items(viewModel.unitGroups, key = { it.unitId }) { unit ->
            Card(colors = CardDefaults.cardColors(containerColor = Color.White), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text(unit.unitTitle, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                    Text(unit.unitTitleZh, color = MaterialTheme.colorScheme.secondary)
                    ScopeButton("Study unit", "${unit.count} cards", "unit:${unit.unitId}", viewModel::startStudy)
                    viewModel.topicsForUnit(unit.unitId).take(4).forEach { (topicId, topicTitle) ->
                        OutlinedButton(onClick = { viewModel.startStudy("topic:$topicId") }, modifier = Modifier.fillMaxWidth()) {
                            Text(topicTitle, maxLines = 1, overflow = TextOverflow.Ellipsis)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun ScopeButton(title: String, meta: String, scope: String, onStart: (String) -> Unit) {
    Button(onClick = { onStart(scope) }, modifier = Modifier.fillMaxWidth()) {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(title)
            Text(meta)
        }
    }
}

@Composable
private fun Flashcard(
    session: StudySession,
    onReveal: () -> Unit,
    onMark: (ReviewGrade) -> Unit,
) {
    val card = session.current ?: return
    ElevatedCard(colors = CardDefaults.elevatedCardColors(containerColor = Color.White)) {
        Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Text(card.ref, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.primary)
            Text(card.term, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold)
            if (session.revealed) {
                Text(card.definition, style = MaterialTheme.typography.bodyLarge)
                Text(card.termZh, style = MaterialTheme.typography.titleMedium, color = MaterialTheme.colorScheme.secondary)
                Text(card.definitionZh, style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
                    OutlinedButton(onClick = { onMark(ReviewGrade.Again) }, modifier = Modifier.weight(1f)) { Text("Again") }
                    OutlinedButton(onClick = { onMark(ReviewGrade.Hard) }, modifier = Modifier.weight(1f)) { Text("Hard") }
                    Button(onClick = { onMark(ReviewGrade.Know) }, modifier = Modifier.weight(1f)) { Text("Know") }
                }
            } else {
                Text("Say the definition before revealing the answer.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                Button(onClick = onReveal, modifier = Modifier.fillMaxWidth()) { Text("Show answer") }
            }
        }
    }
}

@Composable
private fun StatsScreen(
    viewModel: DefinitionsViewModel,
    progress: ProgressSnapshot,
    modifier: Modifier = Modifier,
) {
    val stats = viewModel.stats(progress)
    LazyColumn(
        modifier = modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        item {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text("Progress", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
                StatsGrid(stats)
            }
        }
        items(viewModel.unitGroups, key = { it.unitId }) { unit ->
            val entries = viewModel.definitions.filter { it.unitId == unit.unitId }
            val reviewed = entries.count { (progress.cards[it.id]?.reviewCount ?: 0) > 0 }
            Card(colors = CardDefaults.cardColors(containerColor = Color.White), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text(unit.unitTitle, fontWeight = FontWeight.Bold)
                    Text(unit.unitTitleZh, color = MaterialTheme.colorScheme.secondary)
                    Text("$reviewed / ${entries.size} reviewed")
                }
            }
        }
    }
}

@Composable
private fun StatsGrid(stats: Stats) {
    Card(colors = CardDefaults.cardColors(containerColor = Color.White), modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            StatRow("Definitions", stats.total.toString())
            StatRow("Due now", stats.dueNow.toString())
            StatRow("Favorites", stats.favorites.toString())
            StatRow("Reviewed today", stats.reviewedToday.toString())
            StatRow("Known marks", stats.knownCount.toString())
            StatRow("Again marks", stats.againCount.toString())
        }
    }
}

@Composable
private fun StatRow(label: String, value: String) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Text(label)
        Spacer(Modifier.width(12.dp))
        Text(value, fontWeight = FontWeight.Bold)
    }
}
