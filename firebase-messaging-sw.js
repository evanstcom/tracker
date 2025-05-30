importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCy_tc_KY4ScmNfLNAYMYDEJ5zOxBtqrao",
    authDomain: "filmoteka-evans.firebaseapp.com",
    projectId: "filmoteka-evans",
    storageBucket: "filmoteka-evans.firebasestorage.app",
    messagingSenderId: "992624755114",
    appId: "1:992624755114:web:0b27d6df080506b84eabd3",
    measurementId: "G-0QTYQW628E"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/img/icons/192x192.png'
    };
    self.registration.hideNotification();
    self.registration.showNotification(notificationTitle, notificationOptions);
});