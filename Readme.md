# 🐳 USDT Real-Time Event Tracker & Notification System

Bu proje, Ethereum ağında gerçekleşen belirlenen limitli **USDT transferlerini anlık olarak dinleyen**, bu işlemleri bir backend mimarisinde işleyen ve **Firebase Cloud Messaging (FCM)** aracılığıyla React frontend uygulamasına anlık bildirim (Web Push Notification) olarak fırlatan **Full-Stack bir Web3 takip aracıdır.**

Tüm mimari **Docker** konteynerleri üzerinde izole ve taşınabilir şekilde çalışmaktadır.

---

## 🛠️ Teknolojik Yığın (Tech Stack)

* **Frontend:** React, TypeScript, Vite, React-Toastify, Firebase Web SDK
* **Backend:** Nest.js, TypeScript, Viem.js (Blockchain Listener)
* **Bildirim Sistemi:** Firebase Admin SDK (FCM)
* **Altyapı & Dağıtım:** Docker, Docker Compose, WSL 2

---

## 🏗️ Sistem Mimarisi

1. **Blockchain Listener (Nest.js):** Akıllı kontratı (USDT Contract) viem.js ile  sürekli dinler. Belirlenen limit üzerindeki transferleri yakalar.
2. **Notification Service (FCM):** Yakalanan transfer detaylarını (Sender, Receiver, TxHash, Amount) Firebase üzerinden ilgili odaya (`usdt-event` topic) abone olan istemcilere push eder.
3. **Web Client (React):** Kullanıcı uygulamayı açtığında tarayıcı bildirim izni ister, Firebase Token üretir ve bunu Nest.js'e kaydeder. Gelen canlı verileri gösterir ve **Etherscan'da işlem görme'** ile kullanıcıya sunur.

---

## 🚀 Kurulum ve Çalıştırma (Docker ile Tek Komut)

Proje Dockerize edildiği için bilgisayarınızda Node.js veya herhangi bir kütüphane kurulu olmasına gerek yoktur. Sadece Docker ve Docker Desktop'ın kurulu olması yeterlidir.

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/capanoglu-hus/Vinu-usdt-event
```

```
Firebase/RPC anahtarlarınızı doldurun.
```

```
docker compose up --build
```
