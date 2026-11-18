import { useState } from "react";
import { useShopStore } from "../zustand/Zustand";

export default function UpdateProductForm({ product: originalProduct, onCancel, onDone }) {
  const updateProduct = useShopStore((state) => state.updateProduct);
  const [product, setProduct] = useState(originalProduct);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProduct(originalProduct.id, product);
    onDone?.();
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Product name
        <input name="name" value={product.name} onChange={handleChange} required maxLength={80} />
      </label>
      <div className="product-form__row">
        <label>
          Category
          <input name="category" value={product.category} onChange={handleChange} required maxLength={40} />
        </label>
        <label>
          Price (USD)
          <input name="price" type="number" value={product.price} onChange={handleChange} min="1" step="1" required />
        </label>
      </div>
      <div className="product-form__row">
        <label>
          Old price USD (optional)
          <input name="originalPrice" type="number" value={product.originalPrice ?? ""} onChange={handleChange} min="0" step="1" />
        </label>
        <label>
          Image URL (optional)
          <input name="image" type="url" value={product.image ?? ""} onChange={handleChange} placeholder="https://..." />
        </label>
      </div>
      <div className="product-form__actions">
        <button className="button button--dark" type="submit">Save changes</button>
        <button className="button button--light" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
