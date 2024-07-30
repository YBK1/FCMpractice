import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyAk9W2eCQ5qrmgZv4WvC--1_WuflqeXZ0Y",
  authDomain: "ondo-ffd48.firebaseapp.com",
  projectId: "ondo-ffd48",
  storageBucket: "ondo-ffd48.appspot.com",
  messagingSenderId: "11671201090",
  appId: "1:11671201090:web:8883a7703bea1735ac14db",
  measurementId: "G-E488XVDL6J",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

navigator.serviceWorker
  .register("/firebase-messaging-sw.js")
  .then((registration) => {
    console.log("Service Worker registered with scope:", registration.scope);

    getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving token. ", err);
      });
  })
  .catch((err) => {
    console.error("Service Worker registration failed: ", err);
  });

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // 포그라운드에서 알림을 표시하는 코드
  if (Notification.permission === "granted") {
    console.log("알람이 와야 되는데?");
    new Notification(notificationTitle, notificationOptions);
    let notification = new Notification(notificationTitle, {
      // "test" => 제목
      body: notificationOptions, // 메세지
      icon: "/favicon.ico", // 아이콘
    });

    //알림 클릭 시 이벤트
    notification.addEventListener("click", () => {
      window.open("https://www.naver.com/");
    });
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
