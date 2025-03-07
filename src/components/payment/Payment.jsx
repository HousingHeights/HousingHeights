import React, { useState } from "react";
import "./payment.css";


const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        {/* Go Back Button */}
        <button className="payment__back-button" onClick={() => window.history.back()}>
          ← Go Back
        </button>

        <h2 className="payment__title">Complete Your Payment</h2>

        {/* Payment Method Selection */}
        <div className="payment__method">
          <button
            className={paymentMethod === "card" ? "active" : ""}
            onClick={() => setPaymentMethod("card")}
          >
            Pay with Card
          </button>
          <button
            className={paymentMethod === "upi" ? "active" : ""}
            onClick={() => setPaymentMethod("upi")}
          >
            Pay with UPI
          </button>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <form onSubmit={handlePayment} className="payment__form">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <div className="payment__card-details">
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="payment__btn">Pay Now</button>
          </form>
        )}

        {/* UPI Payment Section */}
        {paymentMethod === "upi" && (
          <div className="payment__upi">
            <p>Scan the QR Code to Pay via UPI</p>
            <img src="/images/payment.png" alt="UPI QR Code" className="payment__qr-code" />
          </div>
        )}

        {/* Card Icons */}
        <div className="payment__card-icons">
          <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
          <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" />
          <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" />
        </div>
      </div>
    </div>
  );
};

export default Payment;
