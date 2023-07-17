import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductHome from "./components/ProductHome";
import AddProductForm from "./components/AddProductForm";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
  };

  const handleAddProduct = (newProduct) => {
    axios
      .post("http://localhost:8000/api/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]); // Ajouter le nouveau produit à la liste existante
        closeModal();
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Gestion des produits</h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ajouter un produit
          </button>
        </div>
      </div>
      {isSuccess && (
        <div className="bg-green-200 text-green-800 p-3 mb-4">
          Produit ajouté avec succès !
        </div>
      )}
      <ProductHome products={products} />
      {isModalOpen && (
        <AddProductForm
          closeModal={closeModal}
          onAddProduct={handleAddProduct}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}
