// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Payments.css";

// const Payment = () => {
//   const [activeTab, setActiveTab] = useState("schedule");
//   const [unpaidPayments, setUnpaidPayments] = useState([]);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [balance, setBalance] = useState(0);
//   const [showTopUpForm, setShowTopUpForm] = useState(false);
//   const [topUpAmount, setTopUpAmount] = useState("");
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expiryDate: "",
//     CVV: "",
//   });

//   const fetchUnpaidPayments = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "https://localhost:7054/api/PurchaseHistory/my-payment-status",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUnpaidPayments(response.data);
//     } catch (error) {
//       console.error("Unpaid payments error:", error);
//       alert("Ödənilməmiş ödənişləri yükləmək mümkün olmadı.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPaymentHistory = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "https://localhost:7054/api/Payment/user-payments",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setPaymentHistory(response.data);
//     } catch (error) {
//       console.error("Payment history error:", error);
//       alert("Ödəniş tarixçəsini yükləmək mümkün olmadı.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBalance = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı.");
//       return;
//     }

//     try {
//       const response = await axios.get("https://localhost:7054/api/User/balance", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setBalance(response.data.balance);
//     } catch (error) {
//       console.error("Balance error:", error);
//       alert("Balansı yükləmək mümkün olmadı.");
//     }
//   };

//   const handleTopUp = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://localhost:7054/api/Payment/top-up",
//         {
//           cardNumber: cardDetails.cardNumber,
//           cardHolder: cardDetails.cardHolder,
//           expiryDate: cardDetails.expiryDate,
//           CVV: cardDetails.CVV,
//           amount: parseFloat(topUpAmount),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert(response.data.message);
//       fetchBalance();
//       setShowTopUpForm(false);
//       setTopUpAmount("");
//       setCardDetails({
//         cardNumber: "",
//         cardHolder: "",
//         expiryDate: "",
//         CVV: "",
//       });
//     } catch (error) {
//       console.error("Top-up error:", error);
//       alert("Balans artırmaq mümkün olmadı.");
//     }
//   };

//   useEffect(() => {
//     fetchBalance();
//   }, []);

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
//         <button onClick={() => setShowTopUpForm(!showTopUpForm)}>
//           Balans: {balance} ₼
//         </button>
//       </div>

//       {showTopUpForm && (
//         <form onSubmit={handleTopUp} className="top-up-form">
//           <input
//             type="text"
//             placeholder="Kart Nömrəsi"
//             value={cardDetails.cardNumber}
//             onChange={(e) =>
//               setCardDetails({ ...cardDetails, cardNumber: e.target.value })
//             }
//             required
//           />
//           <input
//             type="text"
//             placeholder="Kart Sahibi"
//             value={cardDetails.cardHolder}
//             onChange={(e) =>
//               setCardDetails({ ...cardDetails, cardHolder: e.target.value })
//             }
//             required
//           />
//           <input
//             type="text"
//             placeholder="Son İstifadə Tarixi"
//             value={cardDetails.expiryDate}
//             onChange={(e) =>
//               setCardDetails({ ...cardDetails, expiryDate: e.target.value })
//             }
//             required
//           />
//           <input
//             type="text"
//             placeholder="CVV"
//             value={cardDetails.CVV}
//             onChange={(e) =>
//               setCardDetails({ ...cardDetails, CVV: e.target.value })
//             }
//             required
//           />
//           <input
//             type="number"
//             placeholder="Məbləğ"
//             value={topUpAmount}
//             onChange={(e) => setTopUpAmount(e.target.value)}
//             required
//           />
//           <button type="submit">Balansı Artır</button>
//         </form>
//       )}

//       <div className="payment-tabs">
//         <span
//           className={activeTab === "schedule" ? "active-tab" : ""}
//           onClick={() => setActiveTab("schedule")}
//         >
//           Ödəniş Cədvəli
//         </span>
//         <span
//           className={activeTab === "history" ? "active-tab" : ""}
//           onClick={() => setActiveTab("history")}
//         >
//           Ödəniş Tarixçəsi
//         </span>
//       </div>

//       <div className="payment-content">
//         {loading ? (
//           <div className="loading">Yüklənir...</div>
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
//                 </tr>
//               </thead>
//               <tbody>
//                 {unpaidPayments.map((p, index) => (
//                   <tr key={index}>
//                     <td>{new Date(p.purchaseDate).toLocaleDateString("az-AZ")}</td>
//                     <td>{p.paidAmount} ₼</td>
//                     <td>{p.remainingAmount} ₼</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )
//         ) : paymentHistory.length === 0 ? (
//           <p>Ödəniş tarixçəsi tapılmadı.</p>
//         ) : (
//           <table className="payment-table">
//             <thead>
//               <tr>
//                 <th>Ödəniş Tarixi</th>
//                 <th>Məbləğ</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paymentHistory.map((payment, index) => (
//                 <tr key={index}>
//                   <td>{new Date(payment.paymentDate).toLocaleDateString("az-AZ")}</td>
//                   <td>{payment.amount} ₼</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Payment;













 
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Payments.css";
 
const Payment = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [unpaidPayments, setUnpaidPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [availablePackages, setAvailablePackages] = useState([]);
const [selectedPackageId, setSelectedPackageId] = useState("");
 
  const [showTopUpForm, setShowTopUpForm] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    CVV: "",
  });
const [topUpCardDetails, setTopUpCardDetails] = useState({
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  CVV: "",
});
 
const [monthlyCardDetails, setMonthlyCardDetails] = useState({
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  CVV: "",
});
 
  const [showMonthlyPaymentForm, setShowMonthlyPaymentForm] = useState(false);
  const [monthlyPaymentAmount, setMonthlyPaymentAmount] = useState("");
const fetchAvailablePackages = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("https://localhost:7054/api/Package/packages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Available packages:", response.data);
    setAvailablePackages(response.data);
  } catch (error) {
    console.error("Paketləri çəkmək mümkün olmadı", error);
    alert("Paketləri yükləmək mümkün olmadı.");
  }
};
 
useEffect(() => {
  fetchAvailablePackages();
}, []);
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
          cardNumber: topUpCardDetails.cardNumber,
cardHolder: topUpCardDetails.cardHolder,
expiryDate: topUpCardDetails.expiryDate,
CVV: topUpCardDetails.CVV,
 
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
   setTopUpCardDetails({
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
 
const handleMonthlyPayment = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Token tapılmadı.");
    return;
  }
 
  try {
    const response = await axios.post(
      "https://localhost:7054/api/Payment/monthly-payment",
      {
        packageId: parseInt(selectedPackageId),
        cardNumber: monthlyCardDetails.cardNumber,
cardHolder: monthlyCardDetails.cardHolder,
expiryDate: monthlyCardDetails.expiryDate,
CVV: monthlyCardDetails.CVV,
 
        amount: parseFloat(monthlyPaymentAmount),
        isMonthlyPayment: true
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Aylıq ödəniş uğurla həyata keçirildi!");
    fetchBalance();
    fetchUnpaidPayments();
    fetchPaymentHistory();
    setShowMonthlyPaymentForm(false);
    setMonthlyPaymentAmount("");
   setMonthlyCardDetails({
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  CVV: "",
});
 
  } catch (error) {
    console.error("Monthly payment error:", error);
    alert("Aylıq ödəniş etmək mümkün olmadı.");
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
      <div className="payment-actions">
        <button onClick={() => setShowTopUpForm(!showTopUpForm)}>
          💳 Balans: {balance} ₼
        </button>
        <button onClick={() => setShowMonthlyPaymentForm(!showMonthlyPaymentForm)}>
          📅 Aylıq Ödəniş Et
        </button>
      </div>
 
      {showTopUpForm && (
        <form onSubmit={handleTopUp} className="top-up-form">
          <input
            type="text"
            placeholder="Kart Nömrəsi"
            value={topUpCardDetails.cardNumber}
            onChange={(e) =>
              setTopUpCardDetails({ ...topUpCardDetails, cardNumber: e.target.value })
            }
            className={
    /^\d{16}$/.test(topUpCardDetails.cardNumber) || topUpCardDetails.cardNumber === ""
      ? ""
      : "invalid-input"
  }
            required
          />
          {topUpCardDetails.cardNumber !== "" && !/^\d{16}$/.test(topUpCardDetails.cardNumber) && (
  <div className="error-message">Kart nömrəsi 16 rəqəmdən ibarət olmalıdır.</div>
)}
          <input
            type="text"
            placeholder="Kart Sahibi"
            value={topUpCardDetails.cardHolder}
            onChange={(e) =>
              setTopUpCardDetails({ ...topUpCardDetails, cardHolder: e.target.value })
            }
             className={
    /^[A-ZÇƏĞİÖÜŞ\s]{3,}$/i.test(topUpCardDetails.cardHolder) || topUpCardDetails.cardHolder === ""
      ? ""
      : "invalid-input"
  }
            required
          />
          {topUpCardDetails.cardHolder !== "" &&
  !/^[A-ZÇƏĞİÖÜŞ\s]{3,}$/i.test(topUpCardDetails.cardHolder) && (
    <div className="error-message">Kart sahibinin adı düzgün deyil.</div>
)}
          <input
            type="text"
            placeholder="Son İstifadə Tarixi"
            value={topUpCardDetails.expiryDate}
            onChange={(e) =>
              setTopUpCardDetails({ ...topUpCardDetails, expiryDate: e.target.value })
            }
              className={
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(topUpCardDetails.expiryDate) || topUpCardDetails.expiryDate === ""
      ? ""
      : "invalid-input"
  }
            required
          />
          {topUpCardDetails.expiryDate !== "" &&
  !/^(0[1-9]|1[0-2])\/\d{2}$/.test(topUpCardDetails.expiryDate) && (
    <div className="error-message">Tarix MM/YY formatında olmalıdır.</div>
)}
          <input
            type="text"
            placeholder="CVV"
            value={topUpCardDetails.CVV}
            onChange={(e) =>
              setTopUpCardDetails({ ...topUpCardDetails, CVV: e.target.value })
            }
              className={
    /^\d{3}$/.test(topUpCardDetails.CVV) || topUpCardDetails.CVV === ""
      ? ""
      : "invalid-input"
  }
            required
          />
          {topUpCardDetails.CVV !== "" && !/^\d{3}$/.test(topUpCardDetails.CVV) && (
  <div className="error-message">CVV 3 rəqəmli olmalıdır.</div>
)}
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
 
      {showMonthlyPaymentForm && (
       <form onSubmit={handleMonthlyPayment} className="monthly-payment-form">
          <select
    value={selectedPackageId}
    onChange={(e) => setSelectedPackageId(e.target.value)}
   
    required
  >
    <option value="">Paket Seçin</option>
    {availablePackages.map((pkg) => (
      <option key={pkg.id} value={pkg.id}>
        {pkg.packageName}
      </option>
    ))}
  </select>
    <input
      type="text"
      placeholder="Kart Nömrəsi"
      value={monthlyCardDetails.cardNumber}
      onChange={(e) =>
        setMonthlyCardDetails({ ...monthlyCardDetails, cardNumber: e.target.value })
      }
        className={
    /^\d{16}$/.test(monthlyCardDetails.cardNumber) || monthlyCardDetails.cardNumber === ""
      ? ""
      : "invalid-input"
  }
      required
    />
    {monthlyCardDetails.cardNumber !== "" && !/^\d{16}$/.test(monthlyCardDetails.cardNumber) && (
  <div className="error-message">Kart nömrəsi 16 rəqəmdən ibarət olmalıdır.</div>
)}
    <input
      type="text"
      placeholder="Kart Sahibi"
      value={monthlyCardDetails.cardHolder}
      onChange={(e) =>
        setMonthlyCardDetails({ ...monthlyCardDetails, cardHolder: e.target.value })
      }
       className={
    /^[A-ZÇƏĞİÖÜŞ\s]{3,}$/i.test(monthlyCardDetails.cardHolder) || monthlyCardDetails.cardHolder === ""
      ? ""
      : "invalid-input"
  }
      required
    />
    {monthlyCardDetails.cardHolder !== "" &&
  !/^[A-ZÇƏĞİÖÜŞ\s]{3,}$/i.test(monthlyCardDetails.cardHolder) && (
    <div className="error-message">Kart sahibinin adı düzgün deyil.</div>
)}
 
    <input
      type="text"
      placeholder="Son İstifadə Tarixi"
      value={monthlyCardDetails.expiryDate}
      onChange={(e) =>
        setMonthlyCardDetails({ ...monthlyCardDetails, expiryDate: e.target.value })
      }
        className={
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(monthlyCardDetails.expiryDate) || monthlyCardDetails.expiryDate === ""
      ? ""
      : "invalid-input"
  }
      required
    />
    {monthlyCardDetails.expiryDate !== "" &&
  !/^(0[1-9]|1[0-2])\/\d{2}$/.test(monthlyCardDetails.expiryDate) && (
    <div className="error-message">Tarix MM/YY formatında olmalıdır.</div>
)}
    <input
      type="text"
      placeholder="CVV"
      value={monthlyCardDetails.CVV}
      onChange={(e) =>
        setMonthlyCardDetails({ ...monthlyCardDetails, CVV: e.target.value })
      }
        className={
    /^\d{3}$/.test(monthlyCardDetails.CVV) || monthlyCardDetails.CVV === ""
      ? ""
      : "invalid-input"
  }
      required
    />
    {monthlyCardDetails.CVV !== "" && !/^\d{3}$/.test(monthlyCardDetails.CVV) && (
  <div className="error-message">CVV 3 rəqəmli olmalıdır.</div>
)}
    <input
      type="number"
      placeholder="Aylıq Ödəniş Məbləği"
      value={monthlyPaymentAmount}
      onChange={(e) => setMonthlyPaymentAmount(e.target.value)}
      required
    />
    <button type="submit">Ödə</button>
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