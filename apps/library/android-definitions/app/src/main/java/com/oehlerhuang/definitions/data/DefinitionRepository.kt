package com.oehlerhuang.definitions.data

import android.content.Context
import kotlinx.serialization.json.Json

class DefinitionRepository(
    private val context: Context,
) {
    private val json = Json {
        ignoreUnknownKeys = true
    }

    fun loadDefinitions(): List<Definition> {
        val source = context.assets.open("definitions.json").bufferedReader().use { it.readText() }
        return json.decodeFromString<List<Definition>>(source)
            .sortedWith(compareBy<Definition> { sortUnit(it.unitId) }.thenBy { it.ref }.thenBy { it.term })
    }

    private fun sortUnit(unitId: String): Int {
        if (unitId == "formulas") return Int.MAX_VALUE
        return unitId.removePrefix("unit-").toIntOrNull() ?: Int.MAX_VALUE - 1
    }
}
