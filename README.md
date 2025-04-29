# 📊 The Skyline College Students App

This is primarily a Expo project, built with React Native and nativewind/Tailwind CSS.

The 📲 Skyline Students App is a multi-platform app made for students, made by students. 

🏆 The main goal of the app is to serve as a personal hub that centralizes all the different online web services, portals, resources, events, and basic information that a typical Skyline student may interact with day-to-day.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

<img src='/docs/assets/demo.png'>

---

## Table of Contents
- [📊 Repository Contribution Activity](#repository-contribution-activity)
- [🔰 Quick Setup / Getting Started](#quick-setup--getting-started)
- [Usage](#usage)

---

### Repository Contribution Activity

![Alt](https://repobeats.axiom.co/api/embed/fc3e0b6931ae89004ecece65f01d3db1879fa082.svg "Repobeats analytics image")

# 🔰
## Quick Setup / Getting Started

> Want to help design and add stuff to our project? Setup is easy and merely takes 5 minutes!

1. Clone this repository locally to your computer using [Git](https://git-scm.com/downloads).

- You can do so by clicking the green `<> Code` button above, copying the URL, then using the `git clone <URL>` command in a terminal
- Be sure to open your terminal to somewhere easy to access, like your Desktop or Documents folder.

2. Open the cloned folder in an IDE of your choice. Then via your terminal, cd into the directory of said folder.

- If using an external, standalone command-line shell, use the `cd` command like so:

`cd Documents\project.SkylineStudentsApp"`

- **Alternatively, if you use VSCode**: after opening the folder, you can open a built-in Terminal (via top-left bar); it will automatically navigate itself to the currently open directory. (see below)

<img src="https://github.com/Skyline-College-Computer-Science-Club/.github/blob/main/assets/tutorial_media/project.ClubWebsite/open_folder_and_terminal.gif?raw=true" width=600></img>

3. For this project, the only user-installed dependancy is the **[📘Node.js](https://nodejs.org/en) runtime.**

4. After installing Node.js, run the following command in the directory of the downloaded project to install our project's required dependencies, which includes the Next.js framework:

```
npm install
```

- We recommend installing the [yarn](https://classic.yarnpkg.com/en/docs/getting-started) package installer as well via `npm install --global yarn`!

- After installation, you should now see a new folder `node_modules` with said dependancies.

5. Now that we have everything we need (libraries), you can now test-run and host the website on your local computer using:

```bash
npx expo start

# or if you installed yarn

yarn start
```

Steps 4 & 5 can be seen here (ignore npm run dev):

<img src="https://github.com/Skyline-College-Computer-Science-Club/.github/blob/main/assets/tutorial_media/project.ClubWebsite/npm_install_and_run.gif?raw=true" width=740></img>

### Getting an Emulator

6. At this point, you should have all the required project files. Next is to get a feasible mobile development environment.

### Method 1: Android Device
📗 If you have an **Android device**, you can directly test the app on your mobile device. 

7. Install the latest .apk onto your device through here:
https://drive.google.com/drive/folders/15jLb1gyOdpGfxmpNIINaw-X3cwzv0If3?usp=sharing
8. After starting the project (see above), scan the QR Code presented. Be sure you're on development build as highlighted in the below example. If not, press "s" as instructed in your terminal.
<img src='/docs/assets/expo-start.gif'>

### Method 2: Emulated Android Device
📱 On any platform, you can directly test the app on a virtual android device on your computer. 

7. First, install **Android Studio** through here: https://developer.android.com/studio

8. Launch the Android Device under the **Android Virtual Device Manager** seen below:

<img src='/docs/assets/android-studio-start.gif'>

7. In your Android virtual device, enter the link in the pre-installed Chrome browser and install the latest .apk onto your device through here:
https://drive.google.com/drive/folders/15jLb1gyOdpGfxmpNIINaw-X3cwzv0If3?usp=sharing

9. Press "a" to open the app on your Android virtual device, as instructed.

### Method 3: Emulated iOS Device
🍎 On macOS, xOS, you can directly test the app on a virtual iOS device on your computer.

This setup is complex. Please message on of the project managers on how to get started.


# **Making Changes And Committing Code**

If you make changes, follow these steps:

```bash
git checkout -b feature-branch  # Create a new branch
git add .                       # Stage changes
git commit -m "Description of changes"  # Commit changes
git push origin feature-branch  # Push to GitHub
```

If you have any questions on this process, please contact a team member or project leader.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
