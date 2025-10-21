import React, { useEffect, useState } from 'react';
import ProductCreateForm from './ProductCreateForm';

interface Product {
  id: number;
  name: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.error('Erro ao excluir produto');
      }
    } catch (error) {
      console.error('Erro na exclusão', error);
    }
  };

  const handleProductCreated = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <div>
      <h1>Produtos</h1>

      <ProductCreateForm onProductCreated={handleProductCreated} />

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price.toFixed(2)}{' '}
            <button onClick={() => handleDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
