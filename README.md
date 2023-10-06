# FCFlex-React-Native-App

![Image](https://cdn.dribbble.com/userupload/10582814/file/original-4ae3910261a67428220e474872a3692a.png?resize=1504x1002)

## Project Description
This is a movie information app built with React Native that displays a list of movies from The
Movie Database (TMDb) API. The app shows top movies for each year and users can filter by
genre, the app also loads top movies from previous / next years as the user scrolls through the list.

## Table of Contents
- [Getting Started](#get-started)
- [Requirements Covered](#requirements-covered)
- [Scope of Improvements](#scope-of-improvements)

## Getting Started
### Installation
- Ensure you have Node.js and npm installed.
- Install project dependencies: `npm install`

### API Key Setup
1. Sign up at [The Movie Database](https://www.themoviedb.org) to obtain an API key. 
2. Add your API key to the `.env.local` file. (Consider uncommenting local.env file from  .gitignore, if you wish to publish this repo publicly. This was commented to ease up initial setup).


### Running the App
- Start the app: `npm start` [ Runs your app in development mode.
Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.]
- For iOS: `npm run ios` 
- For Android: `npm run android`
- See [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup, if you have any additional requirements.

## Requirements Covered
- By default, user will land on Homescreen, where a list of movies is displayed starting from the year 2012.
- On scroll up from list top, app loads movies from previous year. To load recent movies user has to scroll down the list.
- Genre Filter Section provides functionality to filter movies based on a specific genre.
- User can also search for movies using the search screen [This search input is debounced to reduce number of API calls].
## Scope of Improvements
- When user scrolls up the movie list and previous movies are prepended to the list, whole list gets re-rendered. This does'nt happen on scroll down as movies are appended to the list. Looking for a better approach to resolve this.
