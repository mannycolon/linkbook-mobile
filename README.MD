
  # Todo List
  - Share article urls from other apps into link-book.
    - https://github.com/alinz/react-native-share-extension

  # Done
   - Add pull down refresh feature.
   - Add better error reponse when adding a new article.
   - Handle android back button on react navigation.
   - Add screen scrolling to profile screen and the add article screen when app is resized.
   - Replaced <ScrollView> with <FlatList> where appropiately.
   - Share articles from link-book to other apps
   - Added ability to delete a collection. (Backend)
   - Added ability to remove article from a collection. (Backend)
   - Added ability to add an article to a collection. (Backend)
   - Add ability to delete a collection. (Frontend)
   - Add ability to edit a collection name in its settings. (Backend and Frontend)
   - Add ability to change an article's privacy setting. (frontend)
   - Add ability to remove article from a collection. (Frontend)
   - Add ability to add an article to a collection. (Frontend)
   - Fix bug related to adding/removing articles from a collection from the home screen. (Backend and Frontend)
   - create a component to render error messages. (Frontend)
   - Add edit collection name feature. (Frontend & Backend)
   - Allow to share public articles.
   - Add feature to add public articles to user article list.
   - Add feature to delete articles. (Frontend & Backend)
   - Add place holders for empty home screen, public screen, collections screen. (Frontend)
   - Add app intro slider for first fresh install
   - Added feature to mark articles as read/unread. (Frontend & Backend)
   - Now filtering read and not read articles. (Frontend)
   - Designed the settings screen (Frontend)
   - Showing number of items in the read and unread tabs.
   - Linked delete account function to API (Frontend)
   - Create delete account function (Backend)

  # Building Standalone Apps
  ## 1. Start the build
  - Run `exp build:android` or exp build:ios. If you don’t already have a packager running for this project, exp will start one for you.
  ### If you choose to build for Android
  The first time you build the project you will be asked whether you’d like to upload a keystore or have us handle it for you. If you don’t know what a keystore is, just leave it to us. Otherwise, feel free to upload your own.

  ```
  [exp] No currently active or previous builds for this project.

  Would you like to upload a keystore or have us generate one for you?
  If you don't know what this means, let us handle it! :)

    1) Let Expo handle the process!
    2) I want to upload my own keystore!
  ```

  > Note: If you choose the first option and later decide to upload your own keystore, we currently offer an option to clear your current Android keystore from our build servers by running `exp build:android --clear-credentials`. This is irreversible, so only run this command if you know what you are doing! You can download a backup copy of the keystore by running `exp fetch:android:keystore`. If you do not have a local copy of your keystore , you will be unable to publish new versions of your app to the Play Store. Your only option would be to generate a new keystore and re-upload your application as a new application. You can learn more about how code signing and keystores work in the Android documentation.


  ### If you choose to build for iOS
  You are given a choice of letting the exp client create the necessary credentials for you, while still having a chance to provide your own overrides. Your Apple ID and password is used locally and never saved on Expo’s servers.

  ```
  [exp] Making sure project is set up correctly...
  [exp] Your project looks good!
  [exp] Checking if current build exists...

  [exp] No currently active or previous builds for this project.
  ? How would you like to upload your credentials?
  (Use arrow keys)
  ❯ Expo handles all credentials, you can still provide overrides
    I will provide all the credentials and files needed, Expo does no validation
  ```

  ## 2. Wait for it to finish building
  We’ll print a url you can visit (such as expo.io/builds/some-unique-id) to watch your build logs. Alternatively, you can check up on it by running `exp build:status`. When it’s done, you’ll see the url of a .apk (Android) or .ipa (iOS) file — this is your app. Copy and paste the link into your browser to download the file.

  > Note: We enable bitcode for iOS, so the .ipa files for iOS are much larger than the eventual App Store download available to your users. For more information, see App Thinning.

  ## 3. Test it on your device or simulator
  - You can drag and drop the .apk into your Android emulator. This is the easiest way to test out that the build was successful. But it’s not the most satisfying.

  - To run it on your Android device, make sure you have the Android platform tools installed along with adb, then just run `adb install app-filename.apk` with USB debugging enabled on your device and the device plugged in.

  - To run it on your iOS Simulator, first build your expo project with the simulator flag by running `exp build:ios` -t simulator, then download the tarball with the link given upon completion when running `exp build:status`. Unpack the tar.gz by running `tar -xvzf your-app.tar.gz`. Then you can run it by starting an iOS Simulator instance, then running xcrun simctl install booted <app path> and xcrun simctl launch booted <app identifier>.

  - To test a device build with Apple TestFlight, download the .ipa file to your local machine. You are ready to upload your app to TestFlight. Within TestFlight, click the plus icon and create a New App. Make sure your bundleIdentifier matches what you’ve placed in exp.json.

  > Note: You will not see your build here just yet! You will need to use Xcode or Application Loader to upload your IPA first. Once you do that, you can check the status of your build under Activity. Processing an app can take 10-15 minutes before it shows up under available builds.
