import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomersAndFooter from './CustomersAndFooter';
import ProductsApi from './Api/ProductsApi';
import { useShopStore } from './zustand/Zustand';

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6" /><path d="m16 16 4 4" /></svg>;
}

function CartIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 1.9-1.4L21 8H6" /><circle cx="9.5" cy="20" r="1" /><circle cx="17.5" cy="20" r="1" /></svg>;
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="9" r="3" /><path d="M6.7 18.5a5.8 5.8 0 0 1 10.6 0" /></svg>;
}

function HeartIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.8 2.4Z" /></svg>;
}

const links = [
  ['Shop', '#products'],
  ['On Sale', '#top-selling'],
  ['New Arrivals', '#new-arrivals'],
  ['Brands', '#brands'],
];

export default function ShopCoLanding() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeView, setStoreView] = useState('all');
  const [styleFilter, setStyleFilter] = useState('');
  const cartCount = useShopStore((state) => state.cart.reduce((total, item) => total + item.quantity, 0));
  const favoritesCount = useShopStore((state) => state.favorites.length);

  function openStoreView(view) {
    setStoreView(view);
    setStyleFilter('');
    setSearchQuery('');
    window.setTimeout(() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }), 0);
  }

  function browseStyle(style) {
    setStoreView('all');
    setSearchQuery('');
    setStyleFilter(style);
    window.setTimeout(() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }), 0);
  }

  return (
    <main className="shopco-page">
      {promoVisible && (
        <div className="promo-banner">
          <p>Sign up and get 20% off to your first order. <a href="#newsletter">Sign Up Now</a></p>
          <button className="promo-close" type="button" onClick={() => setPromoVisible(false)} aria-label="Close promotion">×</button>
        </div>
      )}

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="SHOP.CO home">SHOP.CO</a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            <span /><span /><span />
          </button>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {links.map(([label, href]) => <a href={href} key={label} onClick={() => { setMenuOpen(false); if (label !== 'Brands') { setStoreView('all'); setStyleFilter(''); setSearchQuery(''); } }}>{label}{label === 'Shop' && <span className="nav-chevron">⌄</span>}</a>)}
          </nav>
          <form className="search-box" role="search" onSubmit={event => { event.preventDefault(); setStoreView('all'); setStyleFilter(''); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <SearchIcon />
            <input type="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search for products..." aria-label="Search for products" />
          </form>
          <div className="header-actions">
            <button type="button" onClick={() => openStoreView('favorites')} aria-label={`Wishlist, ${favoritesCount} items`}>
              <HeartIcon />{favoritesCount > 0 && <span className="action-count">{favoritesCount}</span>}
            </button>
            <button type="button" onClick={() => navigate('/cart')} aria-label={`Shopping cart, ${cartCount} items`}>
              <CartIcon />{cartCount > 0 && <span className="action-count">{cartCount}</span>}
            </button>
            <button type="button" onClick={() => openStoreView('manage')} aria-label="Manage products"><UserIcon /></button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE</h1>
            <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <a className="shop-button" href="#products" onClick={() => { setStoreView('all'); setStyleFilter(''); setSearchQuery(''); }}>Shop Now</a>
            <div className="stats-row" aria-label="Shop statistics">
              <div className="stat"><strong>200+</strong><span>International Brands</span></div>
              <div className="stat"><strong>2,000+</strong><span>High-Quality Products</span></div>
              <div className="stat"><strong>30,000+</strong><span>Happy Customers</span></div>
            </div>
          </div>
          <div className="hero-art"><img className="hero-photo" src="/images/hero-couple.png" alt="Two models wearing modern black and neutral outfits" /></div>
        </div>
      </section>

      <section className="brand-strip" id="brands" aria-label="Featured brands">
        <span>VERSACE</span><span>ZARA</span><span>GUCCI</span><span>PRADA</span><span>Calvin Klein</span>
      </section>

      <ProductsApi
        view={storeView}
        onViewChange={setStoreView}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        styleFilter={styleFilter}
        onStyleFilterChange={setStyleFilter}
      />
      <section className="dress-style-section" aria-labelledby="dress-style-title">
        <h2 id="dress-style-title">BROWSE BY DRESS STYLE</h2>
        <div className="dress-style-grid">
          <button className="dress-style-card dress-style-card--casual" type="button" onClick={() => browseStyle('Casual')}>
            <span>Casual</span><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" alt="Casual outfit" loading="lazy" />
          </button>
          <button className="dress-style-card dress-style-card--formal" type="button" onClick={() => browseStyle('Formal')}>
            <span>Formal</span><img src="https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=900&q=80" alt="Formal outfit" loading="lazy" />
          </button>
          <button className="dress-style-card dress-style-card--party" type="button" onClick={() => browseStyle('Party')}>
            <span>Party</span><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80" alt="Party outfit" loading="lazy" />
          </button>
          <button className="dress-style-card dress-style-card--gym" type="button" onClick={() => browseStyle('Gym')}>
            <span>Gym</span><img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80" alt="Gym outfit" loading="lazy" />
          </button>
        </div>
      </section>
      <CustomersAndFooter />
    </main>
  );
}
