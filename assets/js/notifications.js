// Retrieve Firebase Messaging object.
const publicVapidKey =
  "BAK9aUUilxzljIZVaKm8gjt6MWYsXQFbhluMMCFCddHbWug4_H48Q4XtbCwBSPZ9V3wcNUGr92twrEbmGMyABKU";
const firebaseConfig = {
  apiKey: "AIzaSyCZ8gbWs9FLlzw93BOj_OQzlWwd_F1N-IY",
  authDomain: "pyconhyd.firebaseapp.com",
  databaseURL: "https://pyconhyd.firebaseio.com",
  projectId: "pyconhyd",
  storageBucket: "pyconhyd.appspot.com",
  messagingSenderId: "254977934750",
  appId: "1:254977934750:web:9f1ad0357425e5718d828f"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey(publicVapidKey);
Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    console.log("Notification permission granted.");
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
    messaging
      .getToken()
      .then(currentToken => {
        if (currentToken) {
          sendTokenToServer(currentToken);
          updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
          // Show permission UI.
          updateUIForPushPermissionRequired();
          setTokenSentToServer(false);
        }
      })
      .catch(err => {
        console.log("An error occurred while retrieving token. ", err);
        showToken("Error retrieving Instance ID token. ", err);
        setTokenSentToServer(false);
      });

    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then(refreshedToken => {
          console.log("Token refreshed.");
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          setTokenSentToServer(false);
          // Send Instance ID token to app server.
          sendTokenToServer(refreshedToken);
          // ...
        })
        .catch(err => {
          console.log("Unable to retrieve refreshed token ", err);
          showToken("Unable to retrieve refreshed token ", err);
        });
    });
  } else {
    console.log("Unable to get permission to notify.");
  }
});
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
