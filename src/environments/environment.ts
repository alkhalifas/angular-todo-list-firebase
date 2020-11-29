// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var firebaseConfig = {
  apiKey: 'AIzaSyDyql40_MXE4-p6mY-SfMvKL9_icFjfDeA',
  authDomain: 'stox-c6eb9-v1.firebaseapp.com',
  databaseURL: 'https://stox-c6eb9-v1.firebaseio.com',
  projectId: 'stox-c6eb9-v1',
  storageBucket: 'stox-c6eb9-v1.appspot.com',
  messagingSenderId: '311361994687',
  appId: '1:311361994687:web:38956e11743b029961eb0a',
  measurementId: 'G-VHJ4EYX2T7',
};

export const environment = {
  production: false,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
