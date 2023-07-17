import axios from "axios";
import React, { useEffect, useState } from "react";
import EditProductForm from "./EditProductForm";

function ProductHome() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeleteProductId, setConfirmDeleteProductId] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios.get("http://localhost:8000/api/products").then((res) => {
      console.log(res);
      setProducts(res.data);
      setIsLoading(false);
    });
  }, []);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteProduct(confirmDeleteProductId);
    setConfirmDeleteProductId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false); // Reset the success state when the modal is closed
  };

  const handleUpdateProduct = (updatedProduct) => {
    setIsLoading(true);

    axios
      .put(
        `http://localhost:8000/api/products/${updatedProduct.id}`,
        updatedProduct
      )
      .then((res) => {
        console.log(res);
        // Update the product in the local state
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
          return updatedProducts;
        });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000); // Set the success state to true after a successful update
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const getMinimalPrice = () => {
    if (products.length === 0) {
      return '-';
    }

    const minimalPrice = Math.min(...products.map((product) => product.price));
    return minimalPrice.toFixed(2) + ' Ar';
  };

  const getMaximalPrice = () => {
    if (products.length === 0) {
      return '-';
    }

    const maximalPrice = Math.max(...products.map((product) => product.price));
    return maximalPrice.toFixed(2) + ' Ar';
  };

  const getTotalAmount = () => {
    if (products.length === 0) {
      return '0 Ar';
    }

    const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    return totalAmount.toFixed(2) + ' Ar';
  };

  const onDeleteProduct = (productId) => {
    setIsLoading(true);

    axios
      .delete(`http://localhost:8000/api/products/${productId}`)
      .then((res) => {
        console.log(res);
        // Remove the deleted product from the local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        setIsDeleteSuccess(true);
        setTimeout(() => {
          setIsDeleteSuccess(false);
        }, 2000); // Set the success state to true after a successful delete
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="w-4/5 mx-auto">
      {isSuccess && (
        <div className="bg-green-200 text-green-800 p-3 mb-4">
          Product updated successfully!
        </div>
      )}
      {isDeleteSuccess && (
        <div className="bg-green-200 text-green-800 p-3 mb-4">
          Product deleted successfully!
        </div>
      )}
      {isModalOpen && (
        <EditProductForm
          product={selectedProduct}
          onUpdateProduct={(updatedProduct) => {
            handleUpdateProduct(updatedProduct);
            setSelectedProduct(updatedProduct); // Update the selected product in the state
          }}
          closeModal={closeModal}
        />
      )}
      {confirmDeleteProductId && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Confirm Delete</h1>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setConfirmDeleteProductId(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b bg-gray-200">
                Numéro de produit
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b bg-gray-200">
                Design
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b bg-gray-200">
                Prix
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b bg-gray-200">
                Quantité
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b bg-gray-200">
                Montant
              </th>
              <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b bg-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  Aucune donnée
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b text-center">
                  <td
                    className={`py-3 px-4 text-sm ${
                      product.id % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    {product.id}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm ${
                      product.id % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    {product.name}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm ${
                      product.id % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    {product.price}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm ${
                      product.id % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    {product.quantity}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm ${
                      product.id % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    {product.quantity * product.price} Ar
                  </td>
                  <td
                    className={`py-3 px-4 text-sm ${
                      product.id % 2 === 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDeleteProductId(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-t" colSpan="4">
                Prix minimal : {getMinimalPrice()}
              </td>
              <td className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-t" colSpan="2">
                Prix maximal : {getMaximalPrice()}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-t" colSpan="4">
                Montant total : {getTotalAmount()} Ar
              </td>
              <td className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-t" colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default ProductHome;
