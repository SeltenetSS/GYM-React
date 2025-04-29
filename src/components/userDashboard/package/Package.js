

// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import "./Package.css";

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [expandedCardId, setExpandedCardId] = useState(null);

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get("https://localhost:7054/api/Package/packages", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setPackages(response.data);
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//     }
//   };

//   const toggleCard = (id) => {
//     setExpandedCardId(prev => prev === id ? null : id);
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
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // export default Package;
// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import "./Package.css";

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [expandedCardId, setExpandedCardId] = useState(null);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expiryDate: "",
//     cvv: ""
//   });

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı, lütfən yenidən daxil olun.");
//       return; // Token yoxdursa, paketləri yükləməyə davam etmə
//     }
    
//     try {
//       const response = await axios.get("https://localhost:7054/api/Package/packages", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
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
//     setSelectedPackage(pkg);
//     setShowForm(true);
//   };

//   const handleInputChange = (e) => {
//     setPaymentInfo({
//       ...paymentInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitPayment = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Token tapılmadı, lütfən yenidən daxil olun.");
//       return; // Token yoxdursa, ödənişi etməyə davam etmə
//     }

//     try {
//       const response = await axios.post(`https://localhost:7054/api/Payment/buy-package?packageId=${selectedPackage.id}`, paymentInfo, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.message === "Siz artıq mövcud pakete üzvüsünüz, buna görə sorgunuz qəbul edilmədi.") {
//         alert(response.data.message);
//       } else {
//         alert(response.data.message);
//         setShowForm(false);
//         setPaymentInfo({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
//       }

//     } catch (error) {
//       console.error("Error during payment:", error.response?.data);  // Serverdən dönən xətanın daha geniş göstərilməsi
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
//             <h3>Enter Payment Details</h3>
//             <form onSubmit={handleSubmitPayment}>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 placeholder="Card Number"
//                 value={paymentInfo.cardNumber}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="cardHolder"
//                 placeholder="Card Holder Name"
//                 value={paymentInfo.cardHolder}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="expiryDate"
//                 placeholder="Expiry Date (MM/YY)"
//                 value={paymentInfo.expiryDate}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="cvv"
//                 placeholder="CVV"
//                 value={paymentInfo.cvv}
//                 onChange={handleInputChange}
//                 required
//               />
//               <button type="submit">Pay Now</button>
//               <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
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
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  // Fetch packages data
  const fetchPackages = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı, lütfən yenidən daxil olun.");
      return;
    }

    try {
      const response = await axios.get("https://localhost:7054/api/Package/packages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      alert("Paketləri yükləyərkən xəta baş verdi.");
    }
  };

  // Toggle the package card details visibility
  const toggleCard = (id) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  // Handle the selection of a package and display payment form
  const handleBuyNow = (pkg) => {
    setSelectedPackage(pkg);
    setShowForm(true);
  };

  // Handle changes in payment form input fields
  const handleInputChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Submit the payment information
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tapılmadı, lütfən yenidən daxil olun.");
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7054/api/Payment/buy-package?packageId=${selectedPackage.id}`, paymentInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message === "Siz artıq mövcud pakete üzvüsünüz, buna görə sorgunuz qəbul edilmədi.") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setShowForm(false);
        setPaymentInfo({
          cardNumber: "",
          cardHolder: "",
          expiryDate: "",
          cvv: ""
        });
      }

    } catch (error) {
      console.error("Error during payment:", error.response?.data);
      alert(error.response?.data?.error || "Ödəniş zamanı xəta baş verdi");
    }
  };

  return (
    <div className="package-container">
      <h2 className="package-title">Available Packages</h2>
      <div className="package-grid">
        {packages.map(pkg => (
          <div className="package-card" key={pkg.id}>
            <h3>{pkg.packageName}</h3>
            <p><strong>Duration:</strong> {pkg.durationInMonths} months</p>

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
            <h3>Enter Payment Details</h3>
            <form onSubmit={handleSubmitPayment}>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cardHolder"
                placeholder="Card Holder Name"
                value={paymentInfo.cardHolder}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Pay Now</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;
