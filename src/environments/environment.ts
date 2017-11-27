// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDzjXA_Husm5-7vCjWuyBvTUuS8X7NASpc',
    authDomain: 'bitfinex-portfolio.firebaseapp.com',
    databaseURL: 'https://bitfinex-portfolio.firebaseio.com',
    projectId: 'bitfinex-portfolio',
    storageBucket: 'bitfinex-portfolio.appspot.com',
    messagingSenderId: '739060831691'
  }
};

