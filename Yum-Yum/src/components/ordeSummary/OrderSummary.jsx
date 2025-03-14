import { useState, useEffect } from "react";
import boxtop from "../../assets/boxtop.png";

const OrderSummary = ({ orderNumber, eta, handleProceed, handleReceipt }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Funktion för att beräkna och uppdatera den återstående tiden varje sekund
    const calculateTimeLeft = () => {
      const now = new Date();
      const etaDate = new Date(eta);
      const diffInSeconds = Math.max(Math.round((etaDate - now) / 1000), 0); // Skillnad i sekunder
      return diffInSeconds;
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); 

    return () => clearInterval(interval);
  }, [eta]); 

  
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600); 
    const minutes = Math.floor((timeInSeconds % 3600) / 60); 
    const seconds = timeInSeconds % 60; 
    return `${hours}h ${minutes}m ${seconds}s`; 
  };

  return (
    <>
      <div className="orderImageContainer">
        <img src={boxtop} alt="Lunchbox" className="orderLunchbox" />
      </div>
      <h1>Dina Wontons <br />Tillagas!</h1>
      <p>ETA <span>{formatTime(timeLeft)}</span></p> {/* Visa tid i timmar, minuter och sekunder */}
      <p><span>#{orderNumber}</span></p>

      <button className="proceedBtn" onClick={handleProceed}>
        Gör Ny beställning
      </button>
      <button className="proceedBtn" onClick={handleReceipt}>
        Visa Kvitto
      </button>
    </>
  );
};

export default OrderSummary;




