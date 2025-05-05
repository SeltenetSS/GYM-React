// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ViewProduct.css";

// const ViewProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [newImage, setNewImage] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://localhost:7054/api/Product/products", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleUpdateClick = (product) => {
//     setSelectedProduct(product);
//     setNewImage(null);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://localhost:7054/api/Product/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setProducts(products.filter(product => product.id !== id));
//       alert("Product deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product.");
//     }
//   };

//   const handleUpdateSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("id", selectedProduct.id);
//     formData.append("name", event.target.name.value);
//     formData.append("description", event.target.description.value);
//     formData.append("pointCost", event.target.pointCost.value);
//     formData.append("stock", event.target.stock.value);

//     if (newImage) {
//       formData.append("imageFile", newImage); // imageFile server tərəfində [FromForm(Name = "imageFile")]
//     }

//     try {
//       const response = await axios.put(`https://localhost:7054/api/Product/update/${selectedProduct.id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const updatedProduct = response.data;

//       setProducts(products.map((product) =>
//         product.id === updatedProduct.id ? updatedProduct : product
//       ));
//       setShowModal(false);
//       alert("Product updated successfully!");
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     }
//   };

//   return (
//     <div className="viewproduct-list">
//       <h2 className="viewproduct-h2">Products</h2>
//       <div className="viewproduct-cards">
//         {products.map((product) => (
//           <div key={product.id} className="viewproduct-card">
//             <img src={product.imageUrl} alt={product.name} />
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p>
//               <strong>Point Cost:</strong> {product.pointCost}
//               <i className="fas fa-coins" style={{ color: "#f1c40f", marginLeft: "5px" }}></i>
//             </p>
//             <p><strong>Stock:</strong> {product.stock}</p>
//             <div className="viewproduct-actions">
//               <button className="viewproduct-update-button" onClick={() => handleUpdateClick(product)}>Update</button>
//               <button className="viewproduct-delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && selectedProduct && (
//         <div className="viewproduct-modal-overlay">
//           <div className="viewproduct-modal-content">
//             <h2>Update Product</h2>
//             <form onSubmit={handleUpdateSubmit}>
//               <label>Name:</label>
//               <input type="text" name="name" defaultValue={selectedProduct.name} required />
//               <label>Description:</label>
//               <textarea name="description" defaultValue={selectedProduct.description} />
//               <label>Point Cost:</label>
//               <input type="number" name="pointCost" defaultValue={selectedProduct.pointCost} required />
//               <label>Stock:</label>
//               <input type="number" name="stock" defaultValue={selectedProduct.stock} required />
//               <label>Change Image (optional):</label>
//               <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
//               <div className="viewproduct-modal-buttons">
//                 <button type="submit">Update</button>
//                 <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewProduct;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProduct.css";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7054/api/Product/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setNewImage(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7054/api/Product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter(product => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", selectedProduct.id);
    formData.append("name", event.target.name.value);
    formData.append("description", event.target.description.value);
    formData.append("pointCost", event.target.pointCost.value);
    formData.append("stock", event.target.stock.value);

    if (newImage) {
      formData.append("imageFile", newImage); // Yeni şəkil əlavə edilir
    }

    try {
      // Backend-ə məhsulun yenilənməsi üçün PUT sorğusu göndərilir
      const response = await axios.put(
        `https://localhost:7054/api/Product/update/${selectedProduct.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Cavabda yenilənmiş məhsul alınıb
      const updatedProduct = response.data;

      // Yenilənmiş məhsulu siyahıda dəyişdiririk
      setProducts(prevProducts =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
        )
      );

      setShowModal(false); // Modal pəncərəsini bağlayırıq
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="viewproduct-list">
      <h2 className="viewproduct-h2">Products</h2>
      <div className="viewproduct-cards">
        {products.map((product) => (
          <div key={product.id} className="viewproduct-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <strong>Point Cost:</strong> {product.pointCost}
              <i className="fas fa-coins" style={{ color: "#f1c40f", marginLeft: "5px" }}></i>
            </p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <div className="viewproduct-actions">
              <button className="viewproduct-update-button" onClick={() => handleUpdateClick(product)}>Update</button>
              <button className="viewproduct-delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedProduct && (
        <div className="viewproduct-modal-overlay">
          <div className="viewproduct-modal-content">
            <h2>Update Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>Name:</label>
              <input type="text" name="name" defaultValue={selectedProduct.name} required />
              <label>Description:</label>
              <textarea name="description" defaultValue={selectedProduct.description} />
              <label>Point Cost:</label>
              <input type="number" name="pointCost" defaultValue={selectedProduct.pointCost} required />
              <label>Stock:</label>
              <input type="number" name="stock" defaultValue={selectedProduct.stock} required />
              <label>Change Image (optional):</label>
              <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
              <div className="viewproduct-modal-buttons">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
