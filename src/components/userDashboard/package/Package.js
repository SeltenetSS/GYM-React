
// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import "./Package.css";

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [expandedCardId, setExpandedCardId] = useState(null);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [monthlyAmount, setMonthlyAmount] = useState(0);
//   const [maxAmount, setMaxAmount] = useState(0);
//   const [amountError, setAmountError] = useState(false);
//   const [inputErrors, setInputErrors] = useState({});

//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expiryDate: "",
//     cvv: "",
//     amount: "",
//     isMonthlyPayment: true
//   });

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı, lütfən yenidən daxil olun.");
//       return;
//     }

//     try {
//       const response = await axios.get("https://localhost:7054/api/Package/packages", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPackages(response.data);
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//       alert("Paketləri yükləyərkən xəta baş verdi.");
//     }
//   };

//   const toggleCard = (id) => {
//     setExpandedCardId(prev => (prev === id ? null : id));
//   };

//   const handleBuyNow = (pkg) => {
//     const monthly = parseFloat((pkg.price / pkg.durationInMonths).toFixed(2));
//     setSelectedPackage(pkg);
//     setMonthlyAmount(monthly);
//     setMaxAmount(pkg.price);
//     setAmountError(false);
//     setInputErrors({});
//     setPaymentInfo({
//       cardNumber: "",
//       cardHolder: "",
//       expiryDate: "",
//       cvv: "",
//       amount: monthly,
//       isMonthlyPayment: true
//     });
//     setShowForm(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;
//     const errors = { ...inputErrors };

//     if (name === "cardNumber") {
//       newValue = value.replace(/\D/g, "").slice(0, 16);
//       if (newValue.length < 16) {
//         errors.cardNumber = "Kart nömrəsi 16 rəqəm olmalıdır.";
//       } else {
//         delete errors.cardNumber;
//       }
//     }

//     if (name === "cardHolder") {
//       newValue = value.replace(/[^a-zA-Z\s]/g, "");
//       if (!/^[A-Za-z\s]+$/.test(newValue) || newValue.trim() === "") {
//         errors.cardHolder = "Kart sahibinin adı yalnız hərflərlə olmalıdır.";
//       } else {
//         delete errors.cardHolder;
//       }
//     }

//     if (name === "expiryDate") {
//       newValue = value.replace(/\D/g, "").slice(0, 4);
//       if (newValue.length >= 3) {
//         newValue = `${newValue.slice(0, 2)}/${newValue.slice(2, 4)}`;
//       }
//       if (!/^\d{2}\/\d{2}$/.test(newValue)) {
//         errors.expiryDate = "Tarix MM/YY formatında olmalıdır.";
//       } else {
//         delete errors.expiryDate;
//       }
//     }

//     if (name === "cvv") {
//       newValue = value.replace(/\D/g, "").slice(0, 3);
//       if (newValue.length !== 3) {
//         errors.cvv = "CVV 3 rəqəmdən ibarət olmalıdır.";
//       } else {
//         delete errors.cvv;
//       }
//     }

//     if (name === "amount") {
//       const num = parseFloat(value);
//       if (isNaN(num) || num < monthlyAmount || num > maxAmount) {
//         setAmountError(true);
//       } else {
//         setAmountError(false);
//       }
//       newValue = value;
//     }

//     setPaymentInfo(prev => ({ ...prev, [name]: newValue }));
//     setInputErrors(errors);
//   };

//   const handleSubmitPayment = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı, lütfən yenidən daxil olun.");
//       return;
//     }

//     const amount = parseFloat(paymentInfo.amount);
//     if (isNaN(amount) || amount < monthlyAmount || amount > maxAmount) {
//       alert(`Zəhmət olmasa ${monthlyAmount} - ${maxAmount} AZN aralığında məbləğ daxil edin.`);
//       setAmountError(true);
//       return;
//     }

//     if (Object.keys(inputErrors).length > 0) {
//       alert("Zəhmət olmasa bütün məlumatları düzgün daxil edin.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://localhost:7054/api/Payment/buy-package?packageId=${selectedPackage.id}`,
//         paymentInfo,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message);
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error during payment:", error.response?.data);
//       alert(error.response?.data?.error || "Ödəniş zamanı xəta baş verdi");
//     }
//   };

//   return (
//     <div className="package-container">
//       <h2 className="package-title">Available Packages</h2>
//       <div className="package-grid">
//         {packages.map(pkg => (
//           <div className="package-card" key={pkg.id}>
//             <h3>{pkg.packageName}</h3>
//             <p><strong>Duration:</strong> {pkg.durationInMonths} months</p>
//             {expandedCardId === pkg.id && (
//               <div className="package-details">
//                 <p><strong>ID:</strong> {pkg.id}</p>
//                 <p><strong>Description:</strong> {pkg.description}</p>
//                 <p><strong>Price:</strong> {pkg.price} ₼</p>
//               </div>
//             )}
//             <button onClick={() => toggleCard(pkg.id)}>
//               {expandedCardId === pkg.id ? "Bağla" : "Ətraflı"}
//             </button>
//             <button onClick={() => handleBuyNow(pkg)} className="buy-now-button">
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {showForm && (
//         <div className="payment-modal">
//           <div className="payment-form">
//             <h3>Ödəniş Məlumatları</h3>
//             <form onSubmit={handleSubmitPayment}>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 placeholder="Card Number"
//                 value={paymentInfo.cardNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.cardNumber && <p className="package-error-message">{inputErrors.cardNumber}</p>}

//               <input
//                 type="text"
//                 name="cardHolder"
//                 placeholder="Card Holder Name"
//                 value={paymentInfo.cardHolder}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.cardHolder && <p className="package-error-message">{inputErrors.cardHolder}</p>}

//               <input
//                 type="text"
//                 name="expiryDate"
//                 placeholder="Expiry Date (MM/YY)"
//                 value={paymentInfo.expiryDate}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.expiryDate && <p className="package-error-message">{inputErrors.expiryDate}</p>}

//               <input
//                 type="text"
//                 name="cvv"
//                 placeholder="CVV"
//                 value={paymentInfo.cvv}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.cvv && <p className="package-error-message">{inputErrors.cvv}</p>}

//               <input
//                 type="number"
//                 name="amount"
//                 placeholder={`Məbləğ (${monthlyAmount} - ${maxAmount} AZN)`}
//                 value={paymentInfo.amount}
//                 onChange={handleInputChange}
//                 step="0.01"
//                 className={amountError ? "package-input-error" : ""}
//                 required
//               />
//               {amountError && (
//                 <p className="package-error-message">Məbləğ düzgün deyil! ({monthlyAmount} - {maxAmount} AZN aralığında olmalıdır)</p>
//               )}
//               <button type="submit">Ödəniş et</button>
//               <button type="button" onClick={() => setShowForm(false)}>İmtina</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Package;




// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import "./Package.css";

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [expandedCardId, setExpandedCardId] = useState(null);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [monthlyAmount, setMonthlyAmount] = useState(0);
//   const [maxAmount, setMaxAmount] = useState(0);
//   const [amountError, setAmountError] = useState(false);
//   const [inputErrors, setInputErrors] = useState({});

//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expiryDate: "",
//     cvv: "",
//     amount: 0,
//     isMonthlyPayment: true
//   });

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı, lütfən yenidən daxil olun.");
//       return;
//     }

//     try {
//       const response = await axios.get("https://localhost:7054/api/Package/packages", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPackages(response.data);
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//       alert("Paketləri yükləyərkən xəta baş verdi.");
//     }
//   };

//   const toggleCard = (id) => {
//     setExpandedCardId(prev => (prev === id ? null : id));
//   };

//   const handleBuyNow = (pkg) => {
//     const monthly = Math.round((pkg.price / pkg.durationInMonths) * 100) / 100;
//     setSelectedPackage(pkg);
//     setMonthlyAmount(monthly);
//     setMaxAmount(pkg.price);
//     setAmountError(false);
//     setInputErrors({});
//     setPaymentInfo({
//       cardNumber: "",
//       cardHolder: "",
//       expiryDate: "",
//       cvv: "",
//       amount: monthly,
//       isMonthlyPayment: true
//     });
//     setShowForm(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let newValue = value;
//     const errors = { ...inputErrors };

//     if (name === "cardNumber") {
//       newValue = value.replace(/\D/g, "").slice(0, 16);
//       if (newValue.length < 16) {
//         errors.cardNumber = "Kart nömrəsi 16 rəqəm olmalıdır.";
//       } else {
//         delete errors.cardNumber;
//       }
//     } else if (name === "cardHolder") {
//       newValue = value.replace(/[^a-zA-Z\s]/g, "");
//       if (!/^[A-Za-z\s]+$/.test(newValue) || newValue.trim() === "") {
//         errors.cardHolder = "Kart sahibinin adı yalnız hərflərlə olmalıdır.";
//       } else {
//         delete errors.cardHolder;
//       }
//     } else if (name === "expiryDate") {
//       newValue = value.replace(/\D/g, "").slice(0, 4);
//       if (newValue.length >= 3) {
//         newValue = `${newValue.slice(0, 2)}/${newValue.slice(2, 4)}`;
//       }
//       if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(newValue)) {
//         errors.expiryDate = "Tarix MM/YY formatında olmalıdır.";
//       } else {
//         delete errors.expiryDate;
//       }
//     } else if (name === "cvv") {
//       newValue = value.replace(/\D/g, "").slice(0, 3);
//       if (newValue.length !== 3) {
//         errors.cvv = "CVV 3 rəqəmdən ibarət olmalıdır.";
//       } else {
//         delete errors.cvv;
//       }
//     } else if (name === "amount") {
//       const num = parseFloat(value);
//       if (isNaN(num) || num < monthlyAmount || num > maxAmount) {
//         setAmountError(true);
//       } else {
//         setAmountError(false);
//       }
//       newValue = value;
//     } else if (name === "isMonthlyPayment") {
//       newValue = checked;
//       // Adjust amount to monthly or full package price accordingly
//       const newAmount = checked ? monthlyAmount : maxAmount;
//       setPaymentInfo(prev => ({ ...prev, amount: newAmount }));
//       setAmountError(false);
//     }

//     setPaymentInfo(prev => ({ ...prev, [name]: newValue }));
//     setInputErrors(errors);
//   };

//   const handleSubmitPayment = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı, lütfən yenidən daxil olun.");
//       return;
//     }

//     const amount = parseFloat(paymentInfo.amount);
//     if (isNaN(amount) || amount < monthlyAmount || amount > maxAmount) {
//       alert(`Zəhmət olmasa ${monthlyAmount} - ${maxAmount} AZN aralığında məbləğ daxil edin.`);
//       setAmountError(true);
//       return;
//     }

//     if (Object.keys(inputErrors).length > 0) {
//       alert("Zəhmət olmasa bütün məlumatları düzgün daxil edin.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://localhost:7054/api/Payment/buy-package?packageId=${selectedPackage.id}`,
//         {
//           cardNumber: paymentInfo.cardNumber,
//           cardHolder: paymentInfo.cardHolder,
//           expiryDate: paymentInfo.expiryDate,
//           cvv: paymentInfo.cvv,
//           amount: amount,
//           isMonthlyPayment: paymentInfo.isMonthlyPayment
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert(response.data.message);
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error during payment:", error.response?.data);
//       alert(error.response?.data?.error || "Ödəniş zamanı xəta baş verdi");
//     }
//   };

//   return (
//     <div className="package-container">
//       <h2 className="package-title">Available Packages</h2>
//       <div className="package-grid">
//         {packages.map(pkg => (
//           <div className="package-card" key={pkg.id}>
//             <h3>{pkg.packageName}</h3>
//             <p><strong>Duration:</strong> {pkg.durationInMonths} months</p>
//             {expandedCardId === pkg.id && (
//               <div className="package-details">
//                 <p><strong>ID:</strong> {pkg.id}</p>
//                 <p><strong>Description:</strong> {pkg.description}</p>
//                 <p><strong>Price:</strong> {pkg.price} ₼</p>
//               </div>
//             )}
//             <button onClick={() => toggleCard(pkg.id)}>
//               {expandedCardId === pkg.id ? "Bağla" : "Ətraflı"}
//             </button>
//             <button onClick={() => handleBuyNow(pkg)} className="buy-now-button">
//               Buy Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {showForm && (
//         <div className="payment-modal">
//           <div className="payment-form">
//             <h3>Ödəniş Məlumatları</h3>
//             <form onSubmit={handleSubmitPayment}>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 placeholder="Card Number"
//                 value={paymentInfo.cardNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.cardNumber && <p className="package-error-message">{inputErrors.cardNumber}</p>}

//               <input
//                 type="text"
//                 name="cardHolder"
//                 placeholder="Card Holder Name"
//                 value={paymentInfo.cardHolder}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.cardHolder && <p className="package-error-message">{inputErrors.cardHolder}</p>}

//               <input
//                 type="text"
//                 name="expiryDate"
//                 placeholder="Expiry Date (MM/YY)"
//                 value={paymentInfo.expiryDate}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.expiryDate && <p className="package-error-message">{inputErrors.expiryDate}</p>}

//               <input
//                 type="text"
//                 name="cvv"
//                 placeholder="CVV"
//                 value={paymentInfo.cvv}
//                 onChange={handleInputChange}
//                 required
//               />
//               {inputErrors.cvv && <p className="package-error-message">{inputErrors.cvv}</p>}

//               <label>
//                 <input
//                   type="checkbox"
//                   name="isMonthlyPayment"
//                   checked={paymentInfo.isMonthlyPayment}
//                   onChange={handleInputChange}
//                 />
//                 Aylıq Ödəniş
//               </label>

//               <input
//                 type="number"
//                 name="amount"
//                 placeholder={`Məbləğ (min: ${monthlyAmount}, max: ${maxAmount})`}
//                 value={paymentInfo.amount}
//                 onChange={handleInputChange}
//                 min={monthlyAmount}
//                 max={maxAmount}
//                 step="0.01"
//                 required
//               />
//               {amountError && <p className="package-error-message">Məbləğ düzgün deyil.</p>}

//               <button type="submit">Ödənişi təsdiqlə</button>
//               <button type="button" onClick={() => setShowForm(false)}>İmtina et</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Package;


import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Package.css";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    amount: 0,
    isMonthlyPayment: true
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı, lütfən yenidən daxil olun.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7054/api/Package/packages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPackages(response.data);
    } catch (error) {
      console.error("Paketləri yükləyərkən xəta:", error);
      alert("Paketləri yükləyərkən xəta baş verdi.");
    }
  };

  const toggleCard = (id) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  const handleBuyNow = (pkg) => {
    const monthly = Math.round((pkg.price / pkg.durationInMonths) * 100) / 100;
    setSelectedPackage(pkg);
    setMonthlyAmount(monthly);
    setMaxAmount(pkg.price);
    setAmountError(false);
    setInputErrors({});
    setPaymentInfo({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      amount: monthly,
      isMonthlyPayment: true
    });
    setShowForm(true);
  };

  const validateInput = (name, value) => {
    const errors = { ...inputErrors };

    switch (name) {
      case "cardNumber":
        if (value.length < 16) errors.cardNumber = "Kart nömrəsi 16 rəqəm olmalıdır.";
        else delete errors.cardNumber;
        break;
      case "cardHolder":
        if (!/^[A-Za-z\s]+$/.test(value.trim())) errors.cardHolder = "Ad yalnız hərflərlə olmalıdır.";
        else delete errors.cardHolder;
        break;
      case "expiryDate":
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) errors.expiryDate = "Tarix MM/YY formatında olmalıdır.";
        else delete errors.expiryDate;
        break;
      case "cvv":
        if (value.length !== 3) errors.cvv = "CVV 3 rəqəm olmalıdır.";
        else delete errors.cvv;
        break;
      default:
        break;
    }

    setInputErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      newValue = value.replace(/\D/g, "").slice(0, 16);
    } else if (name === "cardHolder") {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (name === "expiryDate") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
      if (newValue.length >= 3) newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
    } else if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    } else if (name === "amount") {
      const num = parseFloat(value);
      setAmountError(isNaN(num) || num < monthlyAmount || num > maxAmount);
    } else if (name === "isMonthlyPayment") {
      const isMonthly = checked;
      const amount = isMonthly ? monthlyAmount : maxAmount;
      setPaymentInfo(prev => ({ ...prev, isMonthlyPayment: isMonthly, amount }));
      setAmountError(false);
      return;
    }

    setPaymentInfo(prev => ({ ...prev, [name]: newValue }));
    validateInput(name, newValue);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı, lütfən yenidən daxil olun.");
      return;
    }

    const amount = parseFloat(paymentInfo.amount);
    if (isNaN(amount) || amount < monthlyAmount || amount > maxAmount) {
      alert(`Məbləğ ${monthlyAmount} - ${maxAmount} AZN aralığında olmalıdır.`);
      setAmountError(true);
      return;
    }

    if (Object.keys(inputErrors).length > 0) {
      alert("Zəhmət olmasa bütün məlumatları düzgün daxil edin.");
      return;
    }

    try {
      const response = await axios.post(
        `https://localhost:7054/api/Payment/buy-package?packageId=${selectedPackage.id}`,
        {
          ...paymentInfo,
          amount,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Ödəniş uğurla tamamlandı!");
      setShowForm(false);
    } catch (error) {
      console.error("Ödəniş zamanı xəta:", error);
      alert(error.response?.data?.error || "Ödəniş zamanı xəta baş verdi.");
    }
  };

  return (
    <div className="package-container">
      <h2 className="package-title">Available Packages</h2>
      <div className="package-grid">
        {packages.map(pkg => (
          <div className="package-card" key={pkg.id}>
            <h3>{pkg.packageName}</h3>
            <p><strong>Duration:</strong> {pkg.durationInMonths} ay</p>
            {expandedCardId === pkg.id && (
              <div className="package-details">
                <p><strong>ID:</strong> {pkg.id}</p>
                <p><strong>Description:</strong> {pkg.description}</p>
                <p><strong>Price:</strong> {pkg.price} ₼</p>
              </div>
            )}
            <button onClick={() => toggleCard(pkg.id)}>
              {expandedCardId === pkg.id ? "Bağla" : "Ətraflı"}
            </button>
            <button onClick={() => handleBuyNow(pkg)} className="buy-now-button">
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="payment-modal">
          <div className="payment-form">
            <h3>Ödəniş Məlumatları</h3>
            <form onSubmit={handleSubmitPayment}>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                required
              />
              {inputErrors.cardNumber && <p className="package-error-message">{inputErrors.cardNumber}</p>}

              <input
                type="text"
                name="cardHolder"
                placeholder="Card Holder Name"
                value={paymentInfo.cardHolder}
                onChange={handleInputChange}
                required
              />
              {inputErrors.cardHolder && <p className="package-error-message">{inputErrors.cardHolder}</p>}

              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange}
                required
              />
              {inputErrors.expiryDate && <p className="package-error-message">{inputErrors.expiryDate}</p>}

              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
                required
              />
              {inputErrors.cvv && <p className="package-error-message">{inputErrors.cvv}</p>}

              <label>
                <input
                  type="checkbox"
                  name="isMonthlyPayment"
                  checked={paymentInfo.isMonthlyPayment}
                  onChange={handleInputChange}
                />
                Aylıq Ödəniş
              </label>

              <input
                type="number"
                name="amount"
                placeholder={`Məbləğ (min: ${monthlyAmount}, max: ${maxAmount})`}
                value={paymentInfo.amount}
                onChange={handleInputChange}
                min={monthlyAmount}
                max={maxAmount}
                step="0.01"
                required
              />
              {amountError && <p className="package-error-message">Məbləğ düzgün deyil.</p>}

              <button type="submit">Ödənişi Təsdiqlə</button>
              <button type="button" onClick={() => setShowForm(false)}>İmtina Et</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;
