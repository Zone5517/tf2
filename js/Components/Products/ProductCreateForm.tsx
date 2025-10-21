import React, { useState } from 'react';

interface Props {
  onProductCreated: (product: any) => void;
}

const ProductCreateForm: React.FC<Props> = ({ onProductCreated }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      price: parseFloat(price),
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newProduct = await response.json();
        onProductCreated(newProduct);
        setName('');
        setPrice('');
      } else {
        console.error('Erro ao criar produto');
      }
    } catch (error) {
      console.error('Erro na criação:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Criar Produto</button>
    </form>
  );
};

export default ProductCreateForm;
