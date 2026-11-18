import { Link } from "react-router-dom";
import ProductImage from "../Product/ProductImage";
import { useShopStore } from "../zustand/Zustand";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ReservationsPage() {
  const reservations = useShopStore((state) => state.reservations);
  const products = useShopStore((state) => state.products);
  const cancelReservation = useShopStore((state) => state.cancelReservation);

  const reservedItems = reservations
    .map((reservation) => {
      const product = products.find((item) => item.id === reservation.productId);
      return product ? { ...reservation, product } : null;
    })
    .filter(Boolean);

  return (
    <main className="cart-page reservations-page">
      <header className="cart-page__header">
        <Link className="cart-page__brand" to="/" aria-label="SHOP.CO home">SHOP.CO</Link>
        <nav className="reservations-page__nav">
          <Link to="/">Continue shopping</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <div className="cart-page__breadcrumb"><Link to="/">Home</Link><span>/</span><strong>My reservations</strong></div>
      <section className="cart-page__content" aria-labelledby="reservations-title">
        <div className="cart-page__heading">
          <div>
            <p className="eyebrow">Saved for you</p>
            <h1 id="reservations-title">My reservations</h1>
          </div>
          {reservedItems.length > 0 && <span>{reservedItems.length} {reservedItems.length === 1 ? "reservation" : "reservations"}</span>}
        </div>

        {reservedItems.length === 0 ? (
          <div className="cart-page__empty">
            <div className="cart-page__empty-icon" aria-hidden="true">♡</div>
            <h2>No reservations yet</h2>
            <p>Open a product and reserve the size and color you want.</p>
            <Link className="cart-page__primary" to="/#products">Browse products</Link>
          </div>
        ) : (
          <div className="reservation-list">
            {reservedItems.map(({ id, size, color, quantity, createdAt, product }) => (
              <article className="reservation-card" key={id}>
                <Link className="reservation-card__image-link" to={`/products/${product.id}`}>
                  <ProductImage product={product} className="reservation-card__image" />
                </Link>
                <div className="reservation-card__info">
                  <p className="cart-page__category">{product.category}</p>
                  <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
                  <p>{size && <span>Size: {size}</span>}{size && color && <span> · </span>}{color && <span>Color: {color}</span>}</p>
                  <p>Quantity: {quantity || 1} · Reserved {new Date(createdAt).toLocaleDateString()}</p>
                  <strong>{money.format(product.price)}</strong>
                </div>
                <div className="reservation-card__actions">
                  <Link className="button button--dark" to={`/products/${product.id}`}>View product</Link>
                  <button className="button button--light" type="button" onClick={() => cancelReservation(id)}>Cancel reservation</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
