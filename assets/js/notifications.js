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

const tokenDivId = "token_div";
const permissionDivId = "permission_div";

messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then(refreshedToken => {
      console.log("Token refreshed.");
      setTokenSentToServer(false);
      sendTokenToServer(refreshedToken);
      // Display new Instance ID token and clear UI of all previous messages.
      resetUI();
    })
    .catch(err => {
      console.log("Unable to retrieve refreshed token ", err);
      showToken("Unable to retrieve refreshed token ", err);
    });
});

messaging.onMessage(payload => {
  console.log("Message received. ", payload);
  // Update the UI to include the received message.
  appendMessage(payload);
});

function resetUI() {
  clearMessages();
  showToken("loading...");
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
}

// [TODO] - write code here to show on UI, this is not exactly notification handled
function showToken(currentToken) {
  // Show token in console and UI.
  const tokenElement = document.querySelector("#token");
  !!tokenElement && (tokenElement.textContent = currentToken);
}

function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log("Sending token to server...");
    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so won't send it again " +
        "unless it changes"
    );
  }
}
function isTokenSentToServer() {
  return window.localStorage.getItem("sentToServer") === "1";
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

function showHideDiv(divId, show) {
  const div = document.querySelector("#" + divId);
  if (!!div) {
    if (show) {
      div.style = "display: visible";
    } else {
      div.style = "display: none";
    }
  }
}

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      resetUI();
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

function deleteToken() {
  // Delete Instance ID token.
  messaging
    .getToken()
    .then(currentToken => {
      messaging
        .deleteToken(currentToken)
        .then(() => {
          console.log("Token deleted.");
          setTokenSentToServer(false);
          // Once token is deleted update UI.
          resetUI();
        })
        .catch(err => {
          console.log("Unable to delete token. ", err);
        });
    })
    .catch(err => {
      console.log("Error retrieving Instance ID token. ", err);
      showToken("Error retrieving Instance ID token. ", err);
    });
}

// [TODO] - Write code to show custom UI Notification for website
function appendMessage(payload) {
  // const messagesElement = document.querySelector("#messages");
  // const dataHeaderELement = document.createElement("h5");
  // const dataElement = document.createElement("pre");
  // dataElement.style = "overflow-x:hidden;";
  // dataHeaderELement.textContent = "Received message:";
  // dataElement.textContent = JSON.stringify(payload, null, 2);
  // messagesElement.appendChild(dataHeaderELement);
  // messagesElement.appendChild(dataElement);
}

function clearMessages() {
  const messagesElement = document.querySelector("#messages");
  if (!!messagesElement) {
    while (messagesElement.hasChildNodes()) {
      messagesElement.removeChild(messagesElement.lastChild);
    }
  }
}

function updateUIForPushEnabled(currentToken) {
  showHideDiv(tokenDivId, true);
  showHideDiv(permissionDivId, false);
  showToken(currentToken);
}

function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
  requestPermission();
}

resetUI();
