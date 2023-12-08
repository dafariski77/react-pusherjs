import { useState } from "react";
import Pusher from "pusher-js";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  try {
    Pusher.logToConsole = true;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("notify-stock");

    channel.bind("stock-event", (data) => {
      console.log("Received data:", data);
      setMessage(JSON.stringify(data));
    });
  } catch (error) {
    console.error("Pusher subscription error:", error);
  }

  return <p>{message}</p>;
}

export default App;
