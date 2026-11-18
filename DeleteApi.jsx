import { useShopStore } from "../zustand/Zustand";

export default function DeleteProductButton({ productId, onDeleted }) {
  const deleteProduct = useShopStore((state) => state.deleteProduct);

  function handleDelete() {
    if (!window.confirm("Delete this product? It will also be removed from favorites and the cart.")) return;
    deleteProduct(productId);
    onDeleted?.();
  }

  return (
    <button className="button button--danger" type="button" onClick={handleDelete}>
      Delete
    </button>
  );
}
