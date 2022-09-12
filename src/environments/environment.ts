// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // cognito: {
  //   userPoolId: 'us-east-1_BViNLPAZW',
  //   userPoolWebClientId: '7l58broj906ds4bmep13hf1iev',
  // }

  cognito: {
    identityPoolId: "",
    region: "us-east-1",
    userPoolId: "us-east-1_BViNLPAZW",
    userPoolWebClientId: "7l58broj906ds4bmep13hf1iev",

    mandatorySignIn: false,

    oauth: {
      domain: "digital-application-new.auth.us-east-1.amazoncognito.com",
      scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: "http://localhost:4201/dashboard",
      redirectSignOut: "http://localhost:4201/auth",
      responseType: 'code',
      options: {
        AdvancedSecurityDataCollectionFlag: false
      }
    },
  },
  Storage: {
    bucket: "",
    region: "us-east-1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
