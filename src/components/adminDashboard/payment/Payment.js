import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Payment.css"; 

const Payment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("https://localhost:7054/api/Payment/payments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="payment-container">
      <h1 className="payment-title">User Payments</h1>
      <div className="payment-table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Package</th>
              <th>Price</th>
              <th>Trainer</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  {payment.imageUrl ? (
                    <img
                      src={payment.imageUrl}
                      alt={payment.name}
                      className="user-image"
                    />
                  ) : (
                    <div className="no-image">N/A</div>
                  )}
                </td>
                <td>{payment.name}</td>
                <td>{payment.phone}</td>
                <td>{payment.packageName ?? "N/A"}</td>
                <td>{payment.packagePrice ? `${payment.packagePrice} ₼` : "—"}</td>
                <td>{payment.trainerName ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
