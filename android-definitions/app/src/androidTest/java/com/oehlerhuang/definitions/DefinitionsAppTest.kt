package com.oehlerhuang.definitions

import android.Manifest
import android.content.pm.PackageManager
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Assert.assertFalse
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class DefinitionsAppTest {
    @get:Rule
    val composeRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun appDoesNotRequestInternetPermission() {
        val context = ApplicationProvider.getApplicationContext<android.content.Context>()
        val permissions = context.packageManager
            .getPackageInfo(context.packageName, PackageManager.GET_PERMISSIONS)
            .requestedPermissions
            .orEmpty()

        assertFalse(permissions.contains(Manifest.permission.INTERNET))
    }

    @Test
    fun browseSearchAndStudyFlowRenderOfflineContent() {
        composeRule.onNodeWithText("Key Definitions").assertIsDisplayed()
        composeRule.onNodeWithText("Search ref, English, Chinese, or wording").performTextInput("Market failure")
        composeRule.onNodeWithText("Market failure").assertIsDisplayed()

        composeRule.onNodeWithText("Study").performClick()
        composeRule.onNodeWithText("Due now").assertIsDisplayed()
        composeRule.onNodeWithText("All definitions").assertIsDisplayed()
    }
}
