# FCFlex-React-Native-App

![Image](https://cdn.dribbble.com/userupload/10582814/file/original-4ae3910261a67428220e474872a3692a.png?resize=1504x1002)
  

## Get Started
install dev dependencies
### `npm install`
## Then
Run The app
### `npm start`
Runs your app in development mode.
Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.
#### `npm run ios`
Like `npm start` / `yarn start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.
#### `npm run android`
Like `npm start` / `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).


## Requirements Covered
* By default, user will land on Homescreen, where a list of movies is displayed starting from the year 2012.
* On scroll up from list top, app loads movies from previous year. To load recent movies user has to scroll down the list.
* Genre Filter Section provides functionality to filter movies based on a specific genre.
* User can also search for movies using the search screen [This search input is debounced to reduce number of API calls].

## Scope of Improvements
* When user scrolls up the movie list and previous movies are prepended to the list, whole list gets re-rendered. This does'nt happen on scroll down as movies are appended to the list. Looking for a better approach to resolve this.
