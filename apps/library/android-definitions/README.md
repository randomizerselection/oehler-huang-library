# Oehler-Huang Definitions Android App

Offline native Android app for the definitions part of the Oehler-Huang Library.

## Runtime guarantees

- The APK bundles `app/src/main/assets/definitions.json`.
- The app does not request `android.permission.INTERNET`.
- There are no analytics SDKs, remote fonts, WebViews, Firebase, Google Play Services, CDN assets, or website fetches.
- Favorites and review progress are stored locally with Jetpack DataStore.

## Build

This workspace needs Android tooling installed before an APK can be built. Install Android Studio or the Android command-line SDK with a JDK, then build from this folder:

```powershell
.\gradlew assembleDebug
```

Expected debug APK:

```text
app\build\outputs\apk\debug\app-debug.apk
```

## Data refresh

The Android data asset is generated from the same definitions source used by the website:

```powershell
npm run build:android-data
npm run test:android-data
npm run test:android-offline
```
