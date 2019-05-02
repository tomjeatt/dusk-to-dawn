This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What this app does

1. Gets a user's location or allows a user to type a location.
2. Returns geo data as a latLng object
3. Uses the latLng data to make a call to the sunset-sunrise API
4. Parses the responses to local time and renders sunset and sunrise times in the browser

## Built using

- [Creact React App](http://localhost:3000)
- [Google Map Places](https://developers.google.com/maps/documentation/javascript/places)
- [Moment Timezone](https://momentjs.com/timezone/)

## Assets

- Sunrise and sunset icons sunrise by Weltenraser from from [The Noun Project](https://thenounproject.com/weltenraser/)
- Work Sans font by Wei Huang from [Google Fonts](https://fonts.google.com/specimen/Work+Sans)

Can be used with NPM or Yarn. Built and tested using LTS version of Node (10.15.3).

API data is from [Sunset and sunrise times API](https://sunrise-sunset.org/api)

## Restrictions

- Google Maps API key is restricted to `localhost`.
- Search is restricted to UK locations to allow response to be converted to local time.

## Scripts

In the project directory, you can run:

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn start-secure`

As above, but using `https`. Will warn user before opening site. Required to use geolocation in browsers (e.g. Safari) which don't privilege `localhost`.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
