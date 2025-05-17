import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Payments.css";

const Payment = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [unpaidPayments, setUnpaidPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showTopUpForm, setShowTopUpForm] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    CVV: "",
  });

  const fetchUnpaidPayments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7054/api/PurchaseHistory/my-payment-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnpaidPayments(response.data);
    } catch (error) {
      console.error("Unpaid payments error:", error);
      alert("Ödənilməmiş ödənişləri yükləmək mümkün olmadı.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7054/api/Payment/user-payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaymentHistory(response.data);
    } catch (error) {
      console.error("Payment history error:", error);
      alert("Ödəniş tarixçəsini yükləmək mümkün olmadı.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7054/api/User/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Balance error:", error);
      alert("Balansı yükləmək mümkün olmadı.");
    }
  };

  const handleTopUp = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7054/api/Payment/top-up",
        {
          cardNumber: cardDetails.cardNumber,
          cardHolder: cardDetails.cardHolder,
          expiryDate: cardDetails.expiryDate,
          CVV: cardDetails.CVV,
          amount: parseFloat(topUpAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      fetchBalance();
      setShowTopUpForm(false);
      setTopUpAmount("");
      setCardDetails({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        CVV: "",
      });
    } catch (error) {
      console.error("Top-up error:", error);
      alert("Balans artırmaq mümkün olmadı.");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    if (activeTab === "schedule") {
      fetchUnpaidPayments();
    } else if (activeTab === "history") {
      fetchPaymentHistory();
    }
  }, [activeTab]);

  return (
    <div className="payment-card">
      <div className="balance-button">
        <button onClick={() => setShowTopUpForm(!showTopUpForm)}>
          Balans: {balance} ₼
        </button>
      </div>

      {showTopUpForm && (
        <form onSubmit={handleTopUp} className="top-up-form">
          <input
            type="text"
            placeholder="Kart Nömrəsi"
            value={cardDetails.cardNumber}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Kart Sahibi"
            value={cardDetails.cardHolder}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardHolder: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Son İstifadə Tarixi"
            value={cardDetails.expiryDate}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, expiryDate: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardDetails.CVV}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, CVV: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Məbləğ"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            required
          />
          <button type="submit">Balansı Artır</button>
        </form>
      )}

      <div className="payment-tabs">
        <span
          className={activeTab === "schedule" ? "active-tab" : ""}
          onClick={() => setActiveTab("schedule")}
        >
          Ödəniş Cədvəli
        </span>
        <span
          className={activeTab === "history" ? "active-tab" : ""}
          onClick={() => setActiveTab("history")}
        >
          Ödəniş Tarixçəsi
        </span>
      </div>

      <div className="payment-content">
        {loading ? (
          <div className="loading">Yüklənir...</div>
        ) : activeTab === "schedule" ? (
          unpaidPayments.length === 0 ? (
            <p>Ödənilməmiş ödəniş yoxdur.</p>
          ) : (
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Tarix</th>
                  <th>Ödənilmiş</th>
                  <th>Qalıq</th>
                </tr>
              </thead>
              <tbody>
                {unpaidPayments.map((p, index) => (
                  <tr key={index}>
                    <td>{new Date(p.purchaseDate).toLocaleDateString("az-AZ")}</td>
                    <td>{p.paidAmount} ₼</td>
                    <td>{p.remainingAmount} ₼</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : paymentHistory.length === 0 ? (
          <p>Ödəniş tarixçəsi tapılmadı.</p>
        ) : (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Ödəniş Tarixi</th>
                <th>Məbləğ</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{new Date(payment.paymentDate).toLocaleDateString("az-AZ")}</td>
                  <td>{payment.amount} ₼</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Payment;

















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Payment.css";

// const Payment = () => {
//   const [activeTab, setActiveTab] = useState("schedule"); // Ödəniş cədvəli / tarixçə
//   const [balance, setBalance] = useState(0);
//   const [unpaidPayments, setUnpaidPayments] = useState([]);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [payingPaymentId, setPayingPaymentId] = useState(null);

//   const [paymentCardDetails, setPaymentCardDetails] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expiryDate: "",
//     CVV: "",
//   });

//   const token = localStorage.getItem("token");

//   // Backenddən balansı gətir
//   const fetchBalance = async () => {
//     if (!token) return;
//     try {
//       const { data } = await axios.get(
//         "https://localhost:7054/api/User/balance",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setBalance(data.balance || 0);
//     } catch (error) {
//       console.error("Balans yüklənmədi:", error);
//     }
//   };

//   // Ödənilməmiş ödənişləri gətir
//   const fetchUnpaidPayments = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         "https://localhost:7054/api/PurchaseHistory/my-payment-status",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUnpaidPayments(data || []);
//     } catch (error) {
//       alert("Ödənilməmiş ödənişləri yükləmək mümkün olmadı.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Ödəniş tarixçəsini gətir
//   const fetchPaymentHistory = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         "https://localhost:7054/api/Payment/user-payments",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPaymentHistory(data || []);
//     } catch (error) {
//       alert("Ödəniş tarixçəsi yüklənmədi.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Ödəniş formu göndərmə
//   const handleCardPaymentSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       alert("Token tapılmadı.");
//       return;
//     }
//     if (!payingPaymentId) {
//       alert("Ödəniş seçilməyib.");
//       return;
//     }

//     const paymentToPay = unpaidPayments.find((p) => p.id === payingPaymentId);
//     if (!paymentToPay) {
//       alert("Seçilmiş ödəniş tapılmadı.");
//       return;
//     }

//     const paymentDto = {
//       PackageId: paymentToPay.packageId,
//       Amount: paymentToPay.remainingAmount,
//       CardNumber: paymentCardDetails.cardNumber.trim(),
//       CardHolder: paymentCardDetails.cardHolder.trim(),
//       ExpiryDate: paymentCardDetails.expiryDate.trim(),
//       CVV: paymentCardDetails.CVV.trim(),
//       IsMonthlyPayment: true,
//     };

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://localhost:7054/api/Payment/monthly-payment",
//         paymentDto,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(response.data || "Ödəniş uğurla tamamlandı.");

//       // Formu sıfırla və ödəniş prosesini bitir
//       setPayingPaymentId(null);
//       setPaymentCardDetails({ cardNumber: "", cardHolder: "", expiryDate: "", CVV: "" });

//       // Məlumatları yenilə
//       await Promise.all([fetchBalance(), fetchUnpaidPayments(), fetchPaymentHistory()]);
//     } catch (error) {
//       alert(error.response?.data || "Ödəniş mümkün olmadı.");
//       console.error("Payment error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Komponent mount olduqda balansı yüklə
//   useEffect(() => {
//     fetchBalance();
//   }, []);

//   // Aktiv tab dəyişəndə müvafiq məlumatı yüklə
//   useEffect(() => {
//     if (activeTab === "schedule") {
//       fetchUnpaidPayments();
//     } else if (activeTab === "history") {
//       fetchPaymentHistory();
//     }
//   }, [activeTab]);

//   return (
//     <div className="payment-card">
//       <div className="balance-button">
//         <button disabled>Balans: {balance.toFixed(2)} ₼</button>
//       </div>

//       <div className="payment-tabs">
//         <span
//           className={activeTab === "schedule" ? "active-tab" : ""}
//           onClick={() => setActiveTab("schedule")}
//           style={{ cursor: "pointer" }}
//         >
//           Ödəniş Cədvəli
//         </span>
//         <span
//           className={activeTab === "history" ? "active-tab" : ""}
//           onClick={() => setActiveTab("history")}
//           style={{ cursor: "pointer" }}
//         >
//           Ödəniş Tarixçəsi
//         </span>
//       </div>

//       <div className="payment-content">
//         {loading ? (
//           <div>Yüklənir...</div>
//         ) : activeTab === "schedule" ? (
//           unpaidPayments.length === 0 ? (
//             <p>Ödənilməmiş ödəniş yoxdur.</p>
//           ) : (
//             <table className="payment-table">
//               <thead>
//                 <tr>
//                   <th>Tarix</th>
//                   <th>Ödənilmiş</th>
//                   <th>Qalıq</th>
//                   <th>Əməliyyat</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {unpaidPayments.map((p) => (
//                   <React.Fragment key={p.id}>
//                     <tr>
//                       <td>{new Date(p.purchaseDate).toLocaleDateString("az-AZ")}</td>
//                       <td>{p.paidAmount.toFixed(2)} ₼</td>
//                       <td>{p.remainingAmount.toFixed(2)} ₼</td>
//                       <td>
//                         {p.remainingAmount > 0 ? (
//                           <button
//                             className="pay-button"
//                             onClick={() => setPayingPaymentId(p.id)}
//                           >
//                             Ödənişi Et
//                           </button>
//                         ) : (
//                           "Ödənilib"
//                         )}
//                       </td>
//                     </tr>

//                     {payingPaymentId === p.id && (
//                       <tr className="payment-form-row">
//                         <td colSpan={4}>
//                           <form
//                             onSubmit={handleCardPaymentSubmit}
//                             className="payment-form"
//                           >
//                             <input
//                               type="text"
//                               placeholder="Kart Nömrəsi"
//                               value={paymentCardDetails.cardNumber}
//                               onChange={(e) =>
//                                 setPaymentCardDetails({
//                                   ...paymentCardDetails,
//                                   cardNumber: e.target.value,
//                                 })
//                               }
//                               required
//                               maxLength={19}
//                               pattern="\d{13,19}"
//                               title="Kart nömrəsi 13-19 rəqəmdən ibarət olmalıdır"
//                               autoComplete="cc-number"
//                             />
//                             <input
//                               type="text"
//                               placeholder="Kart Sahibi"
//                               value={paymentCardDetails.cardHolder}
//                               onChange={(e) =>
//                                 setPaymentCardDetails({
//                                   ...paymentCardDetails,
//                                   cardHolder: e.target.value,
//                                 })
//                               }
//                               required
//                               autoComplete="cc-name"
//                             />
//                             <input
//                               type="text"
//                               placeholder="Son İstifadə Tarixi (AA/YY)"
//                               value={paymentCardDetails.expiryDate}
//                               onChange={(e) =>
//                                 setPaymentCardDetails({
//                                   ...paymentCardDetails,
//                                   expiryDate: e.target.value,
//                                 })
//                               }
//                               required
//                               maxLength={5}
//                               pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$"
//                               title="AA/YY formatında olmalıdır"
//                               autoComplete="cc-exp"
//                             />
//                             <input
//                               type="text"
//                               placeholder="CVV"
//                               value={paymentCardDetails.CVV}
//                               onChange={(e) =>
//                                 setPaymentCardDetails({
//                                   ...paymentCardDetails,
//                                   CVV: e.target.value,
//                                 })
//                               }
//                               required
//                               maxLength={4}
//                               pattern="\d{3,4}"
//                               title="3 və ya 4 rəqəmli CVV"
//                               autoComplete="cc-csc"
//                             />
//                             <button type="submit" disabled={loading}>
//                               {loading ? "Ödənilir..." : "Ödənişi Təsdiq Et"}
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => setPayingPaymentId(null)}
//                               disabled={loading}
//                             >
//                               Ləğv et
//                             </button>
//                           </form>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           )
//         ) : (
//           <div>
//             {paymentHistory.length === 0 ? (
//               <p>Ödəniş tarixçəsi boşdur.</p>
//             ) : (
//               <table className="payment-table">
//                 <thead>
//                   <tr>
//                     <th>Tarix</th>
//                     <th>Məbləğ</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paymentHistory.map((p) => (
//                     <tr key={p.id}>
//                       <td>{new Date(p.paymentDate).toLocaleDateString("az-AZ")}</td>
//                       <td>{p.amount.toFixed(2)} ₼</td>
//                       <td>{p.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;
