import React, { useState } from 'react';
import ProductTable from './components/ProductTable';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fonction pour ajouter un produit
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    closeModal();
  };

  // Fonction pour mettre à jour un produit
  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    closeModal();
  };

  // Fonction pour supprimer un produit
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  // Fonction pour ouvrir la modale d'ajout
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Fonction pour ouvrir la modale de modification
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // Fonction pour fermer toutes les modales
  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Gestion des produits</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter un produit
        </button>
      </div>

      {/* Tableau des produits */}
      <ProductTable
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={openEditModal}
      />

      {/* Modale d'ajout de produit */}
      {isAddModalOpen && (
        <AddProductForm onCloseModal={closeModal} onAddProduct={handleAddProduct} />
      )}

      {/* Modale de modification de produit */}
      {isEditModalOpen && (
        <EditProductForm
          product={selectedProduct}
          onCloseModal={closeModal}
          onUpdateProduct={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default App;
