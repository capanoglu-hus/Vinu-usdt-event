import axios from 'axios';
import { getToken,onMessage } from "firebase/messaging";
import { messaging } from "../firebase/firebaseConfig";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import type { FirebaseMessagePayload } from './FirebaseMessagePayload';


export default function MessageManager(){

   const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;
  
  async function requestPermission() {
    try{
      const permission = await Notification.requestPermission();

    // token üretimi
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: vapidKey,
      });
      console.log("Token generated : ", token);
      // tokenı nestJS ile  paylaşma
      try {
      const response = await axios.post('http://127.0.0.1:3000/subscribe', {
        token: token 
      });
        console.log("nestJs sonuc:", response.data);
      } catch (axiosError) {
        console.error("Token Nest.js'e gönderilirken hata oluştu:", axiosError);
      }

    } else if (permission === "denied") {
      // token oluşumunda hata
      alert("You denied for the notification");
    }
  }catch(error){
    console.error("hata aldın :", error)
  }
  
}
   
  useEffect(()=> {
    requestPermission(); //token için 
    //firebaseden gelen bildirimleri gösterme 
    const deneme = onMessage(messaging, (payload:FirebaseMessagePayload) => {
    console.log("mesaj alındı",payload);
   if(payload.notification){
    toast.warning(`${payload.notification.title}: ${payload.notification.body}
      `, {
          position: "top-center",
          autoClose: 8000,
        });
      const sender = payload.data?.sender;
      const receiver = payload.data?.receiver;
      const hash = payload.data?.transactionHash;
      const amount = payload.data?.rawAmount;

      toast(
  <div>
    {/* Başlık Alanı */}
    <h3>🚨 İşlem Detayları</h3>

    {/* Gelen verileri süslü parantez {} içinde ekrana basma alanı */}
    <p>Gönderen : {sender}</p>
    <p>Alan : {receiver}</p>
    <p>Tutar: {amount}</p>

    {/* Canlı Link/Buton Alanı */}
    <a 
      href={`https://etherscan.io/tx/${hash}`} 
      target="_blank" 
      rel="noopener noreferrer"
    >
      İşlemi EtherScan'de gör ↗
    </a>
  </div>,
  {
    
    position: "top-center",
    autoClose: 10000, // 10 saniye ekranda kalma ayarı
    closeOnClick: false // Yanlışlıkla tıklanınca hemen kapanmasın ayarı
  }
);
  }
    });
return () => deneme();
  }, []);

  return null;
}

