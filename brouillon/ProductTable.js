import axios from 'axios';
import React, { useEffect } from 'react';

const ProductTable = ({ products, onDeleteProduct, onEditProduct }) => {
  const openEditModal = (product) => {
    onEditProduct(product);
  };


  useEffect(()=>{
axios.get('').then(res=>{
  console.log(res.data.products);
});
  },[]);
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b">
            Name
          </th>
          <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b">
            Price
          </th>
          <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b">
            Quantity
          </th>
          <th className="py-3 px-4 font-semibold uppercase text-sm text-gray-700 border-b">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b">
            <td className="py-3 px-4 text-sm text-gray-700">{product.name}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{product.price}</td>
            <td className="py-3 px-4 text-sm text-gray-700">{product.quantity}</td>
            <td className="py-3 px-4 text-sm">
              <button
                onClick={() => openEditModal(product)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteProduct(product.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
