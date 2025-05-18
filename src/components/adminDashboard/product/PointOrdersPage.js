import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PointOrdersPage.css";

const PointOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7054/api/Purchase",{
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Sifarişləri yükləmək mümkün olmadı:", error);
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu sifarişi silmək istədiyinizə əminsiniz?");
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await axios.delete(`https://localhost:7054/api/Purchase/${id}`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Silmə zamanı xəta baş verdi:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="order-container">
      <h3 className="order-title">Alınan Məhsullar</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>#</th>
            <th>İstifadəçi</th>
            <th>Şəkil</th>
            <th>Məhsul</th>
            <th>Şəkil</th>
            <th>Say</th>
            <th>Qiymət (point)</th>
            <th>Tarix</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id}>
              <td>{idx + 1}</td>
              <td>{order.userName}</td>
              <td>
                {order.userImageUrl ? (
                  <img
                    src={order.userImageUrl}
                    alt="user"
                    className="order-image"
                  />
                ) : (
                  "Yoxdur"
                )}
              </td>
              <td>{order.productName}</td>
              <td>
                {order.productImageUrl ? (
                  <img
                    src={order.productImageUrl}
                    alt="product"
                    className="order-image"
                  />
                ) : (
                  "Yoxdur"
                )}
              </td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{new Date(order.requestedAt).toLocaleString()}</td>
              <td>
                <button
                  className="order-delete-btn"
                  onClick={() => handleDelete(order.id)}
                  disabled={deleting}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PointOrdersPage;
