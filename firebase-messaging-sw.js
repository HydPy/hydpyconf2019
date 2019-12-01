importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");

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
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || "/favion.ico"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
