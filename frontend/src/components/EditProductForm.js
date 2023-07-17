import React, { useState } from "react";

const EditProductModal = ({ product, closeModal, onUpdateProduct }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const validateName = (value) => {
    if (value.trim() === "") {
      setNameError("Veuillez entrer un nom de produit");
    } else {
      setNameError("");
    }
  };

  const validatePrice = (value) => {
    if (isNaN(parseFloat(value))) {
      setPriceError("Veuillez entrer un prix valide");
    } else {
      setPriceError("");
    }
  };

  const validateQuantity = (value) => {
    if (isNaN(parseFloat(value))) {
      setQuantityError("Veuillez entrer une quantité valide");
    } else {
      setQuantityError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des champs vides
    validateName(name);
    validatePrice(price);
    validateQuantity(quantity);

    // Vérification des erreurs
    if (nameError || priceError || quantityError) {
      return;
    }

    const updatedProduct = {
      id: product.id,
      name,
      price,
      quantity,
    };
    onUpdateProduct(updatedProduct);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Ajout d'un produit</h1>

        <form onSubmit={handleSubmit} className="max-w-sm">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${nameError ? 'border-red-500' : ''}`}
            />
            {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                validatePrice(e.target.value);
              }}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${priceError ? 'border-red-500' : ''}`}
            />
            {priceError && <p className="text-red-500 text-xs mt-1">{priceError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                validateQuantity(e.target.value);
              }}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${quantityError ? 'border-red-500' : ''}`}
            />
            {quantityError && <p className="text-red-500 text-xs mt-1">{quantityError}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
