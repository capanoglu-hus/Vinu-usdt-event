import MessageManager from "./components/MessageManager"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function App() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      fontFamily: "sans-serif",
      backgroundColor: "#f5f5f5"
    }}>
      {/* Arka planda bildirimleri ve firebase dosy. */}
      <MessageManager />

      {/* bildirim aksiyonu için */}
      <ToastContainer />

      <div style={{
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#2c3e50", margin: "0 0 10px 0" }}>
          USDT Takip
        </h1>
        <p style={{ color: "#7f8c8d", margin: "0" }}>
          Ethereum ağındaki 100.000 USDT üstü transferler anlık olarak izleniyor...
        </p>
      </div>
    </div>
  );
}