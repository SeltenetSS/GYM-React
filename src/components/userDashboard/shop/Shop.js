import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [points, setPoints] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
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

    fetchProducts();
    fetchUserProfile();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (product) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === product.id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const CartModal = () => (
    <div className="cart-modal-backdrop">
      <div className="cart-modal">
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl || "/placeholder.png"} alt={item.name} />
                <div className="cart-details">
                  <div className="cart-header">
                    <h4>{item.name}</h4>
                  </div>
                  <p>Points: {item.pointCost}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className="points-display">Current Points: {points}</div>
        <div className="cart-display" onClick={() => setIsCartOpen(true)}>
          🛒 Cart: {cart.length}
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="point-cost">Points: {product.pointCost}</p>
            <div className="card-buttons">
              <button className="buy-now" onClick={() => alert("Purchased!")}>
                Buy Now
              </button>
              <button className="add-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default Shop;
