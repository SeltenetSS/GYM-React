

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Shop.css";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [points, setPoints] = useState(0);
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [loadingBuyAll, setLoadingBuyAll] = useState(false);

//   // Məhsulları backend-dən yükləyir
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/Product/products", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error loading products:", err);
//     }
//   };

//   // İstifadəçi profilini yükləyir (məsələn, point məlumatı)
//   const fetchUserProfile = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/User/user-profile", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setPoints(res.data.point);
//     } catch (err) {
//       console.error("Error loading user profile:", err);
//     }
//   };

//   // Kartı backend-dən yükləyir
//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("https://localhost:7054/api/CartItem/get-cart", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       // cart obyektlərini standartlaşdır, id yoxdursa productId ilə dəyiş
//       const standardizedCart = res.data.map(item => ({
//         ...item,
//         id: item.id || item.productId || item.ProductId
//       }));
//       setCart(standardizedCart);
//     } catch (err) {
//       console.error("Error loading cart:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchUserProfile();
//     fetchCart();
//   }, []);

//   // Backend-ə quantity update request göndərən funksiya
//   const updateQuantityOnServer = async (productId, newQuantity) => {
//     try {
//       await axios.post(
//         "https://localhost:7054/api/CartItem/update-quantity",
//         { ProductId: productId, NewQuantity: newQuantity },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//     } catch (err) {
//       console.error(err.response?.data);
//       const errorMsg =
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         err.message ||
//         "Unknown error";
//       alert("Could not update quantity: " + errorMsg);
//       throw err;
//     }
//   };

//   // Məhsulu kartda əlavə edir və ya sayını artırır
//   const addToCart = async (product) => {
//     const exists = cart.find((p) => p.id === (product.id || product.productId || product.ProductId));

//     if (exists) {
//       try {
//         await updateQuantityOnServer(product.id || product.productId || product.ProductId, exists.quantity + 1);
//         setCart((prev) =>
//           prev.map((p) =>
//             p.id === (product.id || product.productId || product.ProductId) ? { ...p, quantity: p.quantity + 1 } : p
//           )
//         );
//       } catch {}
//     } else {
//       try {
//         await axios.post(
//           "https://localhost:7054/api/CartItem/add-to-cart",
//           { ProductId: product.id || product.productId || product.ProductId, Quantity: 1 },
//           { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//         );
//         setCart((prev) => [...prev, { ...product, quantity: 1, id: product.id || product.productId || product.ProductId }]);
//       } catch (err) {
//         alert(
//           "Could not add product to cart: " +
//             (err.response?.data?.error || err.message)
//         );
//       }
//     }
//   };

//   const increaseQuantity = async (product) => {
//     try {
//       await updateQuantityOnServer(product.id, product.quantity + 1);
//       setCart((prev) =>
//         prev.map((p) =>
//           p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
//         )
//       );
//     } catch {}
//   };

//   const decreaseQuantity = async (product) => {
//     if (product.quantity <= 1) return; // Minimum quantity 1

//     try {
//       await updateQuantityOnServer(product.id, product.quantity - 1);
//       setCart((prev) =>
//         prev.map((p) =>
//           p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
//         )
//       );
//     } catch {}
//   };

//   const removeFromCart = async (id) => {
//     if (!id) {
//       alert("Product ID is missing!");
//       return;
//     }
//     try {
//       await axios.delete(
//         `https://localhost:7054/api/CartItem/remove-from-cart/${id}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         }
//       );
//       setCart((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       alert("Could not remove product from cart: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const totalPoints = cart.reduce(
//     (acc, item) => acc + item.pointCost * item.quantity,
//     0
//   );

//   // Backend-ə bütün kartı almaq üçün request göndərən funksiya
//   const buyAll = async () => {
//     if (cart.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }
//     if (totalPoints > points) {
//       alert("You do not have enough points to buy all items.");
//       return;
//     }

//     setLoadingBuyAll(true);
//     try {
//       await axios.post(
//         "https://localhost:7054/api/CartItem/buy-all",
//         {},
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       alert("Purchase successful!");
//       setCart([]);
//       fetchUserProfile(); // Point yenilə
//     } catch (err) {
//       console.error("Buy All error", err.response || err);
//       const backendError =
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         err.response?.statusText ||
//         err.message ||
//         "Unknown error";

//       alert("Purchase failed: " + backendError);
//     }

//     setLoadingBuyAll(false);
//   };

//   const CartModal = () => (
//     <div className="cart-modal-backdrop">
//       <div className="cart-modal">
//         <button className="close-btn" onClick={() => setIsCartOpen(false)}>
//           ×
//         </button>
//         <h2>Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your cart is empty</p>
//         ) : (
//           <>
//             <ul className="cart-items">
//               {cart.map((item) => (
//                 <li key={item.id} className="cart-item">
//                   <img
//                     src={(item.imageUrl || "/placeholder.png") + `?${Date.now()}`}
//                     alt={item.name}
//                   />
//                   <div className="cart-details">
//                     <div className="cart-header">
//                       <h4>{item.name}</h4>
//                       <button onClick={() => removeFromCart(item.id)}>Remove</button>
//                     </div>
//                     <p>
//                       Points: {item.pointCost} × {item.quantity} ={" "}
//                       {item.pointCost * item.quantity}
//                     </p>
//                     <div className="quantity-controls">
//                       <button onClick={() => decreaseQuantity(item)}>−</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => increaseQuantity(item)}>+</button>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <p className="total-points">Total Points: {totalPoints}</p>
//             <button
//               className="buy-all-btn"
//               onClick={buyAll}
//               disabled={loadingBuyAll}
//             >
//               {loadingBuyAll ? "Processing..." : "Buy All"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="shop-container">
//       <div className="shop-header">
//         <div className="points-display">Current Points: {points}</div>
//         <div className="cart-display" onClick={() => setIsCartOpen(true)}>
//           🛒 Cart: {cart.length}
//         </div>
//       </div>

//       <div className="product-grid">
//         {products.map((product) => (
//           <div className="product-card" key={product.id}>
//             <img
//               src={(product.imageUrl || "/placeholder.png") + `?${Date.now()}`}
//               alt={product.name}
//               className="product-image"
//             />
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p className="point-cost">Points: {product.pointCost}</p>
//             <div className="card-buttons">
//               <button
//                 className="buy-now"
//                 onClick={() => alert("Purchased! (Implement purchase logic)")}
//               >
//                 Buy Now
//               </button>
//               <button className="add-cart" onClick={() => addToCart(product)}>
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isCartOpen && <CartModal />}
//     </div>
//   );
// };

// export default Shop;



import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [points, setPoints] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loadingBuyAll, setLoadingBuyAll] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/Product/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/User/user-profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPoints(res.data.point);
    } catch (err) {
      console.error("Error loading user profile:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get("https://localhost:7054/api/CartItem/get-cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const standardizedCart = res.data.map(item => ({
        ...item,
        id: item.id || item.productId || item.ProductId
      }));
      setCart(standardizedCart);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUserProfile();
    fetchCart();
  }, []);

  const updateQuantityOnServer = async (productId, newQuantity) => {
    try {
      await axios.post(
        "https://localhost:7054/api/CartItem/update-quantity",
        { ProductId: productId, NewQuantity: newQuantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Unknown error";
      alert("Could not update quantity: " + errorMsg);
      throw err;
    }
  };

  const addToCart = async (product) => {
    const exists = cart.find((p) => p.id === (product.id || product.productId || product.ProductId));

    if (exists) {
      try {
        await updateQuantityOnServer(product.id || product.productId || product.ProductId, exists.quantity + 1);
        setCart((prev) =>
          prev.map((p) =>
            p.id === (product.id || product.productId || product.ProductId) ? { ...p, quantity: p.quantity + 1 } : p
          )
        );
      } catch {}
    } else {
      try {
        await axios.post(
          "https://localhost:7054/api/CartItem/add-to-cart",
          { ProductId: product.id || product.productId || product.ProductId, Quantity: 1 },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setCart((prev) => [...prev, { ...product, quantity: 1, id: product.id || product.productId || product.ProductId }]);
      } catch (err) {
        alert(
          "Could not add product to cart: " +
            (err.response?.data?.error || err.message)
        );
      }
    }
  };

  const increaseQuantity = async (product) => {
    try {
      await updateQuantityOnServer(product.id, product.quantity + 1);
      setCart((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } catch {}
  };

  const decreaseQuantity = async (product) => {
    if (product.quantity <= 1) return;
    try {
      await updateQuantityOnServer(product.id, product.quantity - 1);
      setCart((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    } catch {}
  };

  const removeFromCart = async (id) => {
    if (!id) {
      alert("Product ID is missing!");
      return;
    }
    try {
      await axios.delete(
        `https://localhost:7054/api/CartItem/remove-from-cart/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      setCart((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Could not remove product from cart: " + (err.response?.data?.message || err.message));
    }
  };

  const totalPoints = cart.reduce(
    (acc, item) => acc + item.pointCost * item.quantity,
    0
  );

  const buyAll = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (totalPoints > points) {
      alert("You do not have enough points to buy all items.");
      return;
    }

    setLoadingBuyAll(true);
    try {
      await axios.post(
        "https://localhost:7054/api/CartItem/buy-all",
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Purchase successful!");
      setCart([]);
      fetchUserProfile();
    } catch (err) {
      const backendError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        "Unknown error";
      alert("Purchase failed: " + backendError);
    }
    setLoadingBuyAll(false);
  };

  const buyNow = async (product) => {
    if (points < product.pointCost) {
      alert("Sizin pointiniz bu məhsulu almaq üçün kifayət etmir.");
      return;
    }

    try {
      const res = await axios.post(
        "https://localhost:7054/api/CartItem/buy-now",
        { ProductId: product.id, Quantity: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(res.data.message || "Purchase successful!");
      fetchUserProfile();
      fetchCart();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Unknown error";
      alert("Could not complete purchase: " + errorMsg);
    }
  };

  const CartModal = () => (
    <div className="cart-modal-backdrop">
      <div className="cart-modal">
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={(item.imageUrl || "/placeholder.png") + `?${Date.now()}`} alt={item.name} />
                  <div className="cart-details">
                    <div className="cart-header">
                      <h4>{item.name}</h4>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                    <p>Points: {item.pointCost} × {item.quantity} = {item.pointCost * item.quantity}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item)}>+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="total-points">Total Points: {totalPoints}</p>
            <button className="buy-all-btn" onClick={buyAll} disabled={loadingBuyAll}>
              {loadingBuyAll ? "Processing..." : "Buy All"}
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="points-display">Current Points: {points}</div>
        <div className="cart-display" onClick={() => setIsCartOpen(true)}>🛒 Cart: {cart.length}</div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={(product.imageUrl || "/placeholder.png") + `?${Date.now()}`} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="point-cost">Points: {product.pointCost}</p>
            <div className="card-buttons">
              <button className="buy-now" onClick={() => buyNow(product)}>Buy Now</button>
              <button className="add-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default Shop;
