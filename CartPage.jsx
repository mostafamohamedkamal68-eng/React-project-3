import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductImage from "../Product/ProductImage";
import { useShopStore } from "../zustand/Zustand";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useShopStore((state) => state.cart);
  const products = useShopStore((state) => state.products);
  const setCartQuantity = useShopStore((state) => state.setCartQuantity);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const checkout = useShopStore((state) => state.checkout);
  const [customer, setCustomer] = useState({ name: "", address: "" });
  const [order, setOrder] = useState(null);

  const items = cart
    .map((cartItem) => {
      const product = products.find((item) => item.id === cartItem.productId);
      return product
        ? {
            ...product,
            ...cartItem,
            cartItemId: cartItem.cartItemId || `${cartItem.productId}::${cartItem.size || ""}::${cartItem.color || ""}`,
          }
        : null;
    })
    .filter(Boolean);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  function handleCheckout(event) {
    event.preventDefault();
    setOrder(checkout(customer));
  }

  return (
    <main className="cart-page">
      <header className="cart-page__header">
        <Link className="cart-page__brand" to="/" aria-label="SHOP.CO home">SHOP.CO</Link>
        <nav className="cart-page__nav-links">
          <Link className="cart-page__continue" to="/reservations">My reservations</Link>
          <Link className="cart-page__continue" to="/">Continue shopping <span aria-hidden="true">→</span></Link>
        </nav>
      </header>

      <div className="cart-page__breadcrumb"><Link to="/">Home</Link><span>/</span><strong>Cart</strong></div>

      <section className="cart-page__content" aria-labelledby="cart-page-title">
        <div className="cart-page__heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h1 id="cart-page-title">Your cart</h1>
          </div>
          {items.length > 0 && <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>}
        </div>

        {order ? (
          <div className="cart-page__success" role="status">
            <span className="cart-page__success-icon" aria-hidden="true">✓</span>
            <h2>Order placed successfully</h2>
            <p>Thank you, {order.customer.name}. Your order number is <strong>{order.id}</strong>.</p>
            <p className="cart-page__demo-note">This is a demo checkout; no payment was collected.</p>
            <button className="cart-page__primary" type="button" onClick={() => navigate("/")}>Continue shopping</button>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-page__empty">
            <div className="cart-page__empty-icon" aria-hidden="true">🛍</div>
            <h2>Your cart is empty</h2>
            <p>Find something you love and it will be waiting here.</p>
            <button className="cart-page__primary" type="button" onClick={() => navigate("/#products")}>Explore products</button>
          </div>
        ) : (
          <div className="cart-page__layout">
            <div className="cart-page__items" aria-label="Items in your cart">
              {items.map((item) => (
                <article className="cart-page__item" key={item.cartItemId}>
                  <ProductImage product={item} className="cart-page__image" />
                  <div className="cart-page__item-info">
                    <p className="cart-page__category">{item.category}</p>
                    <h2>{item.name}</h2>
                    {(item.size || item.color) && (
                      <p className="cart-page__selection">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </p>
                    )}
                    <p className="cart-page__unit-price">{money.format(item.price)} <span>each</span></p>
                    {item.originalPrice > item.price && <del>{money.format(item.originalPrice)}</del>}
                  </div>
                  <div className="cart-page__item-controls">
                    <div className="cart-page__quantity" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" onClick={() => setCartQuantity(item.cartItemId, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => setCartQuantity(item.cartItemId, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                    </div>
                    <strong>{money.format(item.price * item.quantity)}</strong>
                    <button className="cart-page__remove" type="button" onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-page__summary">
              <h2>Order summary</h2>
              <div className="cart-page__summary-line"><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div>
              <div className="cart-page__summary-line"><span>Delivery</span><strong className="cart-page__free">Free</strong></div>
              <div className="cart-page__summary-total"><span>Total</span><strong>{money.format(subtotal)}</strong></div>
              <form className="cart-page__checkout" onSubmit={handleCheckout}>
                <label>
                  Name
                  <input
                    value={customer.name}
                    onChange={(event) => setCustomer((current) => ({ ...current, name: event.target.value }))}
                    required
                    maxLength={80}
                  />
                </label>
                <label>
                  Delivery address
                  <textarea
                    value={customer.address}
                    onChange={(event) => setCustomer((current) => ({ ...current, address: event.target.value }))}
                    required
                    maxLength={240}
                    rows={3}
                  />
                </label>
                <button className="cart-page__primary" type="submit">Complete purchase <span aria-hidden="true">→</span></button>
                <p className="cart-page__demo-note">Demo checkout — no payment is collected.</p>
              </form>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
