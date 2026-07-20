# Vegas Golf Scorecard Store Release

## Current state

- Framework: static HTML/CSS/JavaScript PWA.
- Native wrapper: Capacitor.
- Bundle/package ID: `com.stanley.vegasgolfscorecard`.
- Web build output: `www`.
- Cloud sync: Supabase REST API using a public anon key in `supabase-config.js`.

Change the bundle/package ID before the first store upload if you want a different permanent ID.

## Credentials and assets you must supply

- Apple Developer Program membership.
- App Store Connect access.
- macOS with Xcode 26 or later for App Store upload.
- Apple signing certificate/provisioning profile or automatic signing team.
- Google Play Console developer account.
- Android Studio/JDK and a Google Play upload key or Play App Signing setup.
- Privacy Policy URL and support URL.
- Store screenshots for required phone/tablet sizes.
- 1024x1024 app icon and generated iOS/Android icon assets.
- Test account or test instructions if reviewers need cloud sync access.

Do not commit Apple certificates, `.p8` API keys, Android keystores, keystore passwords, Supabase service-role keys, or Play Console service account JSON files.

## First-time setup

```powershell
npm install
npm run build
npx cap add android
npx cap add ios
npx cap sync
```

## Android release

1. Open Android Studio:

```powershell
npx cap open android
```

2. Set `targetSdk` to the current Google Play requirement or higher.
3. Configure app icons, version code, version name, package name, signing, and Play App Signing.
4. Build a signed Android App Bundle:

```powershell
cd android
.\gradlew bundleRelease
```

5. Upload `android/app/build/outputs/bundle/release/app-release.aab` to Play Console.
6. Complete Store Listing, Data Safety, App Content, pricing/distribution, and testing.

New personal Play developer accounts must complete the required closed test before requesting production access.

## iOS release

1. Use macOS with Xcode 26 or later.
2. Run:

```bash
npm install
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

3. In Xcode, set Team, Bundle Identifier, version, build number, icons, signing, and deployment target.
4. Archive with `Any iOS Device` selected.
5. Upload from Xcode Organizer or Transporter.
6. In App Store Connect, complete app metadata, privacy nutrition labels, age rating, screenshots, review notes, and TestFlight testing.

## Pre-submit checklist

- Fix any visible encoding or layout issues.
- Test on a physical iPhone and Android phone.
- Confirm offline startup works.
- Confirm Supabase sync works over cellular and Wi-Fi.
- Confirm no private data or private keys are bundled.
- Confirm privacy policy discloses Supabase cloud sync and locally stored scorecard data.
