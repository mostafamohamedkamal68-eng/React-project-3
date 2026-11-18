import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AddProductForm from "./AddApi";
import DeleteProductButton from "./DeleteApi";
import UpdateProductForm from "./UpdateApi";
import ProductImage from "../Product/ProductImage";
import { useShopStore } from "../zustand/Zustand";

const categories = ["All", "T-shirts", "Shirts", "Jeans", "Shoes", "Knitwear", "Outerwear", "Accessories"];
const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function HeartIcon({ filled = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={filled ? "heart-icon is-filled" : "heart-icon"}>
      <path d="M20.8 8.8c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.8 2.4Z" />
    </svg>
  );
}

function ProductCard({ product, isFavorite, isManaging, onEdit }) {
  const toggleFavorite = useShopStore((state) => state.toggleFavorite);
  const productPath = `/products/${product.id}`;

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <Link className="product-card__media-link" to={productPath} aria-label={`View ${product.name}`}>
          <ProductImage product={product} />
          {product.originalPrice > product.price && (
            <span className="product-card__sale">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </Link>
        <button
          className={`favorite-button${isFavorite ? " is-active" : ""}`}
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          aria-pressed={isFavorite}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="product-card__body">
        <Link className="product-card__info-link" to={productPath}>
          <p className="product-card__category">{product.category}</p>
          <h3>{product.name}</h3>
          <p className="product-card__rating" aria-label={`${product.rating} out of 5 stars`}>
            <span aria-hidden="true">★★★★★</span> {product.rating}
          </p>
          <div className="product-card__prices">
            <strong>{money.format(product.price)}</strong>
            {product.originalPrice > product.price && <del>{money.format(product.originalPrice)}</del>}
          </div>
        </Link>
        {!isManaging && <Link className="button button--dark product-card__add" to={productPath}>Choose options</Link>}
        {isManaging && (
          <div className="product-card__manage">
            <button className="button button--light" type="button" onClick={onEdit}>Edit</button>
            <DeleteProductButton productId={product.id} />
          </div>
        )}
      </div>
    </article>
  );
}

function CartView({ cartLines }) {
  const setCartQuantity = useShopStore((state) => state.setCartQuantity);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const checkout = useShopStore((state) => state.checkout);
  const [customer, setCustomer] = useState({ name: "", address: "" });
  const [order, setOrder] = useState(null);
  const total = cartLines.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleCheckout(event) {
    event.preventDefault();
    setOrder(checkout(customer));
  }

  if (order) {
    return (
      <div className="order-success" role="status">
        <span className="order-success__check" aria-hidden="true">✓</span>
        <h3>Order placed successfully</h3>
        <p>Thanks, {order.customer.name}. Your order number is <strong>{order.id}</strong>.</p>
        <p className="order-success__note">This is a demo checkout. No payment was collected.</p>
      </div>
    );
  }

  if (!cartLines.length) {
    return (
      <div className="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add something you like and it will show up here.</p>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-list">
        {cartLines.map((item) => (
          <article className="cart-item" key={item.cartItemId}>
            <ProductImage product={item} />
            <div className="cart-item__details">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              {(item.size || item.color) && <p>{[item.size && `Size ${item.size}`, item.color && `Color ${item.color}`].filter(Boolean).join(" · ")}</p>}
              <strong>{money.format(item.price)}</strong>
            </div>
            <div className="cart-item__actions">
              <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button type="button" onClick={() => setCartQuantity(item.cartItemId, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => setCartQuantity(item.cartItemId, item.quantity + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button className="text-button" type="button" onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
            </div>
          </article>
        ))}
      </div>

      <aside className="checkout-card">
        <h3>Order summary</h3>
        <div className="checkout-card__total"><span>Total</span><strong>{money.format(total)}</strong></div>
        <form className="checkout-form" onSubmit={handleCheckout}>
          <label>
            Your name
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
          <button className="button button--dark" type="submit">Complete purchase</button>
          <p className="checkout-form__note">Demo checkout — no payment is collected.</p>
        </form>
      </aside>
    </div>
  );
}

export default function ProductsApi({ view, onViewChange, query = "", onQueryChange, styleFilter = "", onStyleFilterChange }) {
  const products = useShopStore((state) => state.products);
  const cart = useShopStore((state) => state.cart);
  const favorites = useShopStore((state) => state.favorites);
  const [activeCategory, setActiveCategory] = useState("All");
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const filterCategories = ["All", ...new Set([...categories.slice(1), ...products.map((product) => product.category)])];

  const cartLines = useMemo(
    () => cart.map((cartItem) => {
      const product = products.find((item) => item.id === cartItem.productId);
      return product
        ? {
            ...product,
            ...cartItem,
            cartItemId: cartItem.cartItemId || `${cartItem.productId}::${cartItem.size || ""}::${cartItem.color || ""}`,
          }
        : null;
    }).filter(Boolean),
    [cart, products],
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesFavorite = view !== "favorites" || favorites.includes(product.id);
      const matchesQuery = !normalizedQuery || `${product.name} ${product.category} ${product.description || ""}`.toLowerCase().includes(normalizedQuery);
      const matchesStyle = !styleFilter || (product.style || []).includes(styleFilter);
      return matchesCategory && matchesFavorite && matchesQuery && matchesStyle;
    });
  }, [activeCategory, favorites, products, query, styleFilter, view]);

  const isManaging = view === "manage";
  const isGroupedView = view === "all" && !query.trim() && !styleFilter;
  const title = view === "favorites"
    ? "Your wishlist"
    : isManaging
      ? "Manage products"
      : styleFilter
        ? `${styleFilter} styles`
        : query.trim()
          ? `Search results for “${query.trim()}”`
          : "Our products";

  function renderProductGrid(items) {
    return items.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        isFavorite={favorites.includes(product.id)}
        isManaging={isManaging}
        onEdit={() => setEditingProduct(product)}
      />
    ));
  }

  return (
    <section className="store-section" id="products" aria-labelledby="products-title">
      {!isGroupedView && (
        <div className="store-section__heading">
          <div>
            <p className="eyebrow">Made for your everyday</p>
            <h2 id="products-title">{view === "cart" ? "Your shopping cart" : title}</h2>
            <p>
              {view === "cart"
                ? "Review your items and add your delivery details."
                : isManaging
                  ? "Add new products, update details, or remove items from the store."
                  : view === "favorites"
                    ? "The pieces you saved for later."
                    : "Choose a piece to see sizes, colors, and product details."}
            </p>
          </div>
          {view !== "cart" && (
            <div className="store-section__actions">
              {isManaging && (
                <button className="button button--dark" type="button" onClick={() => setAddingProduct(true)}>
                  + Add product
                </button>
              )}
              <button
                className="button button--light"
                type="button"
                onClick={() => onViewChange(isManaging ? "all" : "manage")}
              >
                {isManaging ? "Back to shop" : "Manage products"}
              </button>
              {(styleFilter || query.trim()) && (
                <button className="button button--light" type="button" onClick={() => { onStyleFilterChange?.(""); onQueryChange?.(""); onViewChange("all"); }}>
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {view === "cart" ? (
        <CartView cartLines={cartLines} />
      ) : isGroupedView ? (
        ["New Arrivals", "Top Selling"].map((collection) => {
          const collectionProducts = visibleProducts.filter((product) => product.collection === collection);
          if (!collectionProducts.length) return null;
          const sectionId = collection === "New Arrivals" ? "new-arrivals" : "top-selling";
          return (
            <section className="product-collection" id={sectionId} key={collection} aria-labelledby={`${sectionId}-title`}>
              <div className="product-collection__heading">
                <h2 id={`${sectionId}-title`}>{collection}</h2>
                <span>Explore the collection</span>
              </div>
              <div className="product-grid">{renderProductGrid(collectionProducts)}</div>
            </section>
          );
        })
      ) : (
        <>
          <div className="category-filters" aria-label="Filter products by category">
            {filterCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "category-filter is-active" : "category-filter"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {visibleProducts.length ? (
            <div className="product-grid">
              {renderProductGrid(visibleProducts)}
            </div>
          ) : (
            <div className="empty-state">
              <h3>{view === "favorites" && favorites.length === 0 ? "No favorites yet" : "No products found"}</h3>
              <p>{view === "favorites" ? "Tap the heart on a product to save it here." : "Try another search or category."}</p>
            </div>
          )}
        </>
      )}

      {(addingProduct || editingProduct) && (
        <div className="modal-backdrop" role="presentation">
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
            <div className="product-modal__heading">
              <h2 id="product-modal-title">{editingProduct ? "Edit product" : "Add a product"}</h2>
              <button
                className="modal-close"
                type="button"
                aria-label="Close product form"
                onClick={() => { setAddingProduct(false); setEditingProduct(null); }}
              >
                ×
              </button>
            </div>
            {editingProduct ? (
              <UpdateProductForm key={editingProduct.id} product={editingProduct} onCancel={() => setEditingProduct(null)} onDone={() => setEditingProduct(null)} />
            ) : (
              <AddProductForm onCancel={() => setAddingProduct(false)} onDone={() => setAddingProduct(false)} />
            )}
          </section>
        </div>
      )}
    </section>
  );
}
