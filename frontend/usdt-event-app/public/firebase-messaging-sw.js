// public/firebase-messaging-sw.js

// 🚨 v8 yerine en güncel v10 modüler kütüphaneleri import ediyoruz (Burası kritik)
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCFHRvYgQ2mrNVH4uF5LbWvEIgo1gOQqHQ",
  authDomain: "usdt-event.firebaseapp.com",
  projectId: "usdt-event",
  storageBucket: "usdt-event.firebasestorage.app",
  messagingSenderId: "1059640446311",
  appId: "1:1059640446311:web:fbf9f56d78608131b0f3c2",
  measurementId: "G-DKCMZSJF28"
};

// Firebase'i "compat" (uyumluluk) moduyla başlatıyoruz
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Arka plan bildirim dinleyicisi
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Arka planda mesaj alındı: ', payload);
  
  if (payload.notification) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image || '/logo192.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});