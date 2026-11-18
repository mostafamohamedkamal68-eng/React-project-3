import { useEffect, useRef, useState } from 'react';
import './CustomersAndFooter.css';

const testimonials = [
  {
    name: 'Sarah M.',
    quote: "I'm blown away by the quality and style of the clothes I received from ShopCo. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: 'Alex K.',
    quote: "Finding clothes that align with my personal style used to be a challenge until I discovered ShopCo. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: 'James L.',
    quote: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon ShopCo. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: 'Mona R.',
    quote: 'Great quality, comfortable styles, and a smooth shopping experience. I found pieces I love and will definitely be back for more.',
  },
];
const carouselTestimonials = [testimonials[testimonials.length - 1], ...testimonials, testimonials[0]];

const footerGroups = [
  { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
  { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
  { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
  { title: 'RESOURCES', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] },
];

function ArrowIcon({ direction }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={direction === 'left' ? 'arrow-icon arrow-icon--left' : 'arrow-icon'}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

function EnvelopeIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function SocialIcon({ type }) {
  if (type === 'x') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 3H21l-6.9 7.9L22 21h-6.1l-4.8-6.3L5.6 21H3.5l7.4-8.5L3 3h6.3l4.3 5.7L18.9 3Zm-1.1 16h1.7L8.1 4.9H6.3L17.8 19Z" /></svg>;
  if (type === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.5-1.4h1.5V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4.1v1.9H7.7v2.9h2.6V21h3.1Z" /></svg>;
  if (type === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.5" cy="6.8" r=".8" className="social-dot" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 19.5c-4.2 1.3-4.2-2.1-5.9-2.5m11.8 5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.7 4.7 0 0 0-1.3-3.3 4.3 4.3 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.8 11.8 0 0 0-6.2 0C5.7 3.7 4.7 4 4.7 4a4.3 4.3 0 0 0-.1 3.3 4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6a2.8 2.8 0 0 0-.8 2.2V22" /></svg>;
}

function CustomerReviews() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track?.firstElementChild) return;
    track.scrollLeft = track.firstElementChild.getBoundingClientRect().width + 10;
  }, []);

  function scrollReviews(direction) {
    const track = trackRef.current;
    const cardWidth = track?.firstElementChild?.getBoundingClientRect().width ?? 200;
    track?.scrollBy({ left: direction * (cardWidth + 10), behavior: 'smooth' });
  }

  return (
    <section className="customer-reviews" aria-labelledby="customer-reviews-title">
      <div className="reviews-heading">
        <h2 id="customer-reviews-title">OUR HAPPY CUSTOMERS</h2>
        <div className="reviews-controls">
          <button type="button" onClick={() => scrollReviews(-1)} aria-label="Previous reviews"><ArrowIcon direction="left" /></button>
          <button type="button" onClick={() => scrollReviews(1)} aria-label="Next reviews"><ArrowIcon direction="right" /></button>
        </div>
      </div>
      <div className="reviews-window" ref={trackRef}>
        {carouselTestimonials.map((review, index) => (
          <article className="review-card" key={`${review.name}-${index}`}>
            <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <h3>{review.name}<span className="verified-check" aria-label="Verified customer">✓</span></h3>
            <p>“{review.quote}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsletterAndFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function subscribe(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <>
      <div className="newsletter-card" id="newsletter">
        <h2>STAY UP TO DATE ABOUT<br />OUR LATEST OFFERS</h2>
        <form onSubmit={subscribe}>
          <label className="newsletter-input">
            <EnvelopeIcon />
            <input type="email" value={email} onChange={event => { setEmail(event.target.value); setSubscribed(false); }} placeholder="Enter your email address" aria-label="Enter your email address" required />
          </label>
          <button type="submit">{subscribed ? 'Subscribed!' : 'Subscribe to Newsletter'}</button>
        </form>
      </div>

      <footer className="footer-main">
        <div className="footer-columns">
          <div className="footer-brand-column">
            <a href="#top" className="footer-brand">SHOP.CO</a>
            <p>We have clothes that suits your style and which you're proud to wear. From women to men.</p>
            <div className="social-links" aria-label="Social links">
              {['x', 'facebook', 'instagram', 'github'].map(type => <a key={type} href="#newsletter" aria-label={type}><SocialIcon type={type} /></a>)}
            </div>
          </div>
          {footerGroups.map(group => (
            <div className="footer-link-column" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(link => <a key={link} href="#newsletter">{link}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">SHOP.CO © 2026, All Rights Reserved</div>
      </footer>
    </>
  );
}

export default function CustomersAndFooter() {
  return (
    <>
      <CustomerReviews />
      <NewsletterAndFooter />
    </>
  );
}
