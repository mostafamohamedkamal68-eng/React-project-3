import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductImage from "./ProductImage";
import { useShopStore } from "../zustand/Zustand";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const defaultSizes = ["S", "M", "L", "XL", "XXL"];
const defaultColors = [
  { name: "Black", hex: "#202020" },
  { name: "White", hex: "#f0eee9" },
  { name: "Navy", hex: "#26354b" },
];

function ProductDetails({ productId }) {
  const navigate = useNavigate();
  const product = useShopStore((state) => state.products.find((item) => item.id === productId));
  const addToCart = useShopStore((state) => state.addToCart);
  const reserveProduct = useShopStore((state) => state.reserveProduct);
  const sizes = product?.sizes?.length
    ? product.sizes
    : product?.category === "Accessories"
      ? ["One size"]
      : defaultSizes;
  const colors = product?.colors?.length ? product.colors : defaultColors;
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const hasSelection = Boolean(selectedSize && selectedColor);

  if (!product) {
    return (
      <main className="product-detail-page">
        <header className="product-detail-header"><Link className="cart-page__brand" to="/">SHOP.CO</Link></header>
        <div className="product-detail-not-found">
          <h1>Product not found</h1>
          <Link className="button button--dark" to="/">Back to shop</Link>
        </div>
      </main>
    );
  }

  const selection = { size: selectedSize, color: selectedColor, quantity };

  function handleAddToCart() {
    if (!hasSelection) return;
    addToCart(product.id, selection);
    setNotice({ type: "cart", text: `${product.name} was added to your cart.` });
  }

  function handleBuyNow() {
    if (!hasSelection) return;
    addToCart(product.id, selection);
    navigate("/cart");
  }

  function handleReserve() {
    if (!hasSelection) return;
    const reservation = reserveProduct(product.id, selection);
    if (reservation) {
      setNotice({ type: "reservation", text: "Your item is reserved." });
    }
  }

  return (
    <main className="product-detail-page">
      <header className="product-detail-header">
        <Link className="cart-page__brand" to="/" aria-label="SHOP.CO home">SHOP.CO</Link>
        <nav aria-label="Shop navigation">
          <Link to="/">Continue shopping</Link>
          <Link to="/reservations">My reservations</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <div className="product-detail-breadcrumb">
        <Link to="/">Home</Link><span>/</span><Link to="/#products">Shop</Link><span>/</span><strong>{product.name}</strong>
      </div>

      <section className="product-detail" aria-labelledby="product-detail-title">
        <div className="product-detail__visual">
          <ProductImage product={product} className="product-detail__image" />
        </div>

        <div className="product-detail__info">
          <p className="product-detail__category">{product.category} · {product.collection || "SHOP.CO"}</p>
          <h1 id="product-detail-title">{product.name}</h1>
          <p className="product-detail__rating"><span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span> {product.rating}/5</p>
          <div className="product-detail__price">
            <strong>{money.format(product.price)}</strong>
            {product.originalPrice > product.price && <del>{money.format(product.originalPrice)}</del>}
            {product.originalPrice > product.price && <span className="product-detail__discount">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
          </div>
          <p className="product-detail__description">{product.description || `Discover ${product.name}, a comfortable piece from the SHOP.CO collection.`}</p>

          <div className="product-detail__option">
            <div className="product-detail__option-heading"><span>Choose color</span><strong>{selectedColor || "Select a color"}</strong></div>
            <div className="product-detail__colors" role="group" aria-label="Choose a color">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`product-detail__color${selectedColor === color.name ? " is-selected" : ""}`}
                  style={{ "--swatch-color": color.hex }}
                  type="button"
                  onClick={() => { setSelectedColor(color.name); setNotice(null); }}
                  aria-label={color.name}
                  aria-pressed={selectedColor === color.name}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="product-detail__option">
            <div className="product-detail__option-heading"><span>Choose size</span><button type="button" className="size-guide-button" onClick={() => setIsSizeGuideOpen(true)}>Size guide</button></div>
            <div className="product-detail__sizes" role="group" aria-label="Choose a size">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`product-detail__size${selectedSize === size ? " is-selected" : ""}`}
                  type="button"
                  onClick={() => { setSelectedSize(size); setNotice(null); }}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <label className="product-detail__quantity">
            Quantity
            <input type="number" min="1" max="20" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(20, Number(event.target.value) || 1)))} />
          </label>

          {notice && (
            <div className={`product-detail__notice product-detail__notice--${notice.type}`} role="status">
              <span>{notice.text}</span>
              {notice.type === "reservation" && <Link to="/reservations">View reservation</Link>}
              {notice.type === "cart" && <Link to="/cart">Open cart</Link>}
            </div>
          )}
          {!hasSelection && <p className="product-detail__hint">Choose a color and size to continue.</p>}

          <div className="product-detail__actions">
            <button className="button button--light" type="button" disabled={!hasSelection} onClick={handleReserve}>Reserve product</button>
            <button className="button button--dark" type="button" disabled={!hasSelection} onClick={handleAddToCart}>Add to cart</button>
            <button className="product-detail__buy" type="button" disabled={!hasSelection} onClick={handleBuyNow}>Buy now</button>
          </div>
        </div>
      </section>

      {isSizeGuideOpen && (
        <div className="size-guide-backdrop" role="presentation" onClick={() => setIsSizeGuideOpen(false)}>
          <section className="size-guide-dialog" role="dialog" aria-modal="true" aria-labelledby="size-guide-title" onClick={(event) => event.stopPropagation()}>
            <div className="product-modal__heading">
              <h2 id="size-guide-title">Size guide</h2>
              <button className="modal-close" type="button" aria-label="Close size guide" onClick={() => setIsSizeGuideOpen(false)}>×</button>
            </div>
            <p>Available sizes for {product.name}:</p>
            <div className="size-guide-list">{sizes.map((size) => <span key={size}>{size}</span>)}</div>
            <p className="cart-page__demo-note">If you are between sizes, choose the larger size for a relaxed fit.</p>
          </section>
        </div>
      )}
    </main>
  );
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  return <ProductDetails key={id} productId={id} />;
}
