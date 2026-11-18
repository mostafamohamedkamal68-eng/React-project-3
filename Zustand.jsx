import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialProducts = [
  {
    id: "shopco-1",
    name: "T-shirt with Tape Details",
    category: "T-shirts",
    collection: "New Arrivals",
    style: ["Casual", "Gym"],
    description: "A relaxed cotton T-shirt with clean tape details. An easy everyday layer that feels soft and keeps its shape.",
    price: 120,
    originalPrice: null,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#171717" }, { name: "White", hex: "#f4f2ed" }, { name: "Navy", hex: "#26354b" }],
  },
  {
    id: "shopco-2",
    name: "Skinny Fit Jeans",
    category: "Jeans",
    collection: "New Arrivals",
    style: ["Casual", "Party"],
    description: "A modern slim silhouette in comfortable stretch denim, made for easy styling from day to night.",
    price: 240,
    originalPrice: 260,
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [{ name: "Indigo", hex: "#405a78" }, { name: "Black", hex: "#202020" }],
  },
  {
    id: "shopco-3",
    name: "Checkered Shirt",
    category: "Shirts",
    collection: "New Arrivals",
    style: ["Casual", "Formal"],
    description: "A versatile checked shirt with a comfortable fit and a timeless pattern. Wear it buttoned up or layered over a tee.",
    price: 180,
    originalPrice: null,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Red Check", hex: "#a33d3d" }, { name: "Blue Check", hex: "#3b5f7e" }],
  },
  {
    id: "shopco-4",
    name: "Sleeve Striped T-shirt",
    category: "T-shirts",
    collection: "New Arrivals",
    style: ["Casual", "Gym"],
    description: "A sporty striped T-shirt with a relaxed cut and soft cotton feel for comfortable everyday wear.",
    price: 130,
    originalPrice: 160,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Orange", hex: "#e76a2d" }, { name: "Blue", hex: "#315778" }, { name: "Black", hex: "#222222" }],
  },
  {
    id: "shopco-5",
    name: "Vertical Striped Shirt",
    category: "Shirts",
    collection: "Top Selling",
    style: ["Casual", "Formal"],
    description: "A sharp vertical stripe brings a fresh look to this lightweight shirt. Comfortable enough for all-day wear.",
    price: 212,
    originalPrice: 232,
    rating: 5,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Sage", hex: "#778775" }, { name: "Blue", hex: "#617d9d" }, { name: "White", hex: "#f2eee7" }],
  },
  {
    id: "shopco-6",
    name: "Courage Graphic T-shirt",
    category: "T-shirts",
    collection: "Top Selling",
    style: ["Casual", "Party", "Gym"],
    description: "A bold graphic tee in soft cotton with an easy fit. Made to bring a little personality to a casual look.",
    price: 145,
    originalPrice: null,
    rating: 4,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Rust", hex: "#c95e32" }, { name: "Black", hex: "#222222" }, { name: "White", hex: "#f4f1eb" }],
  },
  {
    id: "shopco-7",
    name: "Loose Fit Denim Shorts",
    category: "Shorts",
    collection: "Top Selling",
    style: ["Casual", "Party", "Gym"],
    description: "Relaxed denim shorts with room to move and an easy mid-rise fit. A warm-weather essential.",
    price: 80,
    originalPrice: null,
    rating: 3,
    image: "https://images.unsplash.com/photo-1511196044526-5cb3bcb7071b?auto=format&fit=crop&w=900&q=85",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [{ name: "Blue Denim", hex: "#6184a5" }, { name: "Black", hex: "#222222" }],
  },
  {
    id: "shopco-8",
    name: "Black Slim Fit Jeans",
    category: "Jeans",
    collection: "Top Selling",
    style: ["Casual", "Formal", "Party"],
    description: "A clean black denim style with a slim cut that works just as well with a T-shirt as with a button-up.",
    price: 180,
    originalPrice: null,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [{ name: "Black", hex: "#202020" }, { name: "Indigo", hex: "#405a78" }],
  },
  {
    id: "shopco-9",
    name: "Gradient Graphic T-shirt",
    category: "T-shirts",
    collection: "New Arrivals",
    style: ["Casual", "Party"],
    description: "A soft cotton graphic tee with a subtle gradient print and relaxed everyday fit.",
    price: 140,
    originalPrice: null,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#202020" }, { name: "Cream", hex: "#eee7d9" }, { name: "Blue", hex: "#536f8b" }],
  },
  {
    id: "shopco-10",
    name: "Loose Fit Hoodie",
    category: "Outerwear",
    collection: "New Arrivals",
    style: ["Casual", "Gym"],
    description: "A cozy brushed-fleece hoodie with a roomy fit, ribbed cuffs, and an easy front pocket.",
    price: 180,
    originalPrice: 200,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Gray", hex: "#aaa9a5" }, { name: "Black", hex: "#202020" }, { name: "Olive", hex: "#65705c" }],
  },
  {
    id: "shopco-11",
    name: "Relaxed Fit Chinos",
    category: "Pants",
    collection: "New Arrivals",
    style: ["Casual", "Formal"],
    description: "Easy-wearing chino trousers with a straight relaxed leg and a clean finish for work or weekends.",
    price: 190,
    originalPrice: null,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [{ name: "Sand", hex: "#b9a98e" }, { name: "Navy", hex: "#26354b" }, { name: "Black", hex: "#202020" }],
  },
  {
    id: "shopco-12",
    name: "Quilted Zip Jacket",
    category: "Outerwear",
    collection: "New Arrivals",
    style: ["Casual", "Formal"],
    description: "A lightweight quilted jacket with a full zip and a neat collar for cool-weather layering.",
    price: 260,
    originalPrice: 300,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Black", hex: "#202020" }, { name: "Olive", hex: "#65705c" }],
  },
  {
    id: "shopco-13",
    name: "Blue Graphic Cotton T-Shirt",
    category: "Shirts",
    collection: "Top Selling",
    style: ["Casual", "Party"],
    description: "A soft cream cotton tee with a bold blue front print and a relaxed everyday fit.",
    price: 160,
    originalPrice: null,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1778426140719-26f148a046ce?auto=format&fit=crop&fm=jpg&q=85&w=1000",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Cream", hex: "#eee9dc" }, { name: "White", hex: "#f5f3ed" }],
  },
  {
    id: "shopco-14",
    name: "Classic Denim Jacket",
    category: "Outerwear",
    collection: "Top Selling",
    style: ["Casual", "Party"],
    description: "A dependable denim jacket with classic pockets and a comfortable layer-ready fit.",
    price: 230,
    originalPrice: 270,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Blue Denim", hex: "#526c85" }, { name: "Black", hex: "#202020" }],
  },
  {
    id: "shopco-15",
    name: "Weekend Cargo Pants",
    category: "Pants",
    collection: "Top Selling",
    style: ["Casual", "Gym"],
    description: "Utility-inspired cargo pants with practical pockets and an easy fit for active days out.",
    price: 175,
    originalPrice: null,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1511196044526-5cb3bcb7071b?auto=format&fit=crop&w=900&q=85",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [{ name: "Olive", hex: "#65705c" }, { name: "Black", hex: "#202020" }, { name: "Sand", hex: "#b9a98e" }],
  },
  {
    id: "shopco-16",
    name: "Casual Knit Sweater",
    category: "Knitwear",
    collection: "Top Selling",
    style: ["Casual", "Formal"],
    description: "A soft mid-weight knit with a classic crew neck, made for simple layering through the week.",
    price: 195,
    originalPrice: 220,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Charcoal", hex: "#474747" }, { name: "Cream", hex: "#eee7d9" }, { name: "Navy", hex: "#26354b" }],
  },
];

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `product-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getCartItemId(productId, size = "", color = "") {
  return `${productId}::${size}::${color}`;
}

export const useShopStore = create(
  persist(
    (set, get) => ({
      products: initialProducts,
      cart: [],
      favorites: [],
      reservations: [],
      orders: [],

      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: createId(),
          collection: product.collection || "New Arrivals",
          description: product.description || `${product.name} from the latest SHOP.CO collection.`,
          price: Number(product.price),
          originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
          rating: Number(product.rating) || 5,
        };
        set((state) => ({ products: [newProduct, ...state.products] }));
        return newProduct;
      },

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? {
                  ...product,
                  ...updates,
                  price: Number(updates.price),
                  originalPrice: updates.originalPrice ? Number(updates.originalPrice) : null,
                  rating: Number(updates.rating) || product.rating || 5,
                }
              : product,
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          cart: state.cart.filter((item) => item.productId !== id),
          favorites: state.favorites.filter((productId) => productId !== id),
          reservations: state.reservations.filter((reservation) => reservation.productId !== id),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((productId) => productId !== id)
            : [...state.favorites, id],
        })),

      addToCart: (id, selection = {}) => {
        if (!get().products.some((product) => product.id === id)) return;
        const size = selection.size || "";
        const color = selection.color || "";
        const quantity = Math.max(1, Number(selection.quantity) || 1);
        const cartItemId = getCartItemId(id, size, color);
        set((state) => {
          const existingItem = state.cart.find((item) =>
            item.productId === id && (item.size || "") === size && (item.color || "") === color,
          );
          return {
            cart: existingItem
              ? state.cart.map((item) =>
                  item === existingItem ? { ...item, cartItemId, quantity: item.quantity + quantity } : item,
                )
              : [...state.cart, { productId: id, cartItemId, size, color, quantity }],
          };
        });
      },

      setCartQuantity: (cartItemId, quantity) => {
        const nextQuantity = Math.max(1, Number(quantity) || 1);
        set((state) => ({
          cart: state.cart.map((item) =>
            (item.cartItemId || getCartItemId(item.productId, item.size, item.color)) === cartItemId
              ? { ...item, quantity: nextQuantity }
              : item,
          ),
        }));
      },

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) =>
            (item.cartItemId || getCartItemId(item.productId, item.size, item.color)) !== cartItemId,
          ),
        })),

      reserveProduct: (id, selection = {}) => {
        const product = get().products.find((item) => item.id === id);
        if (!product) return null;
        const reservation = {
          id: createId(),
          productId: id,
          size: selection.size || "",
          color: selection.color || "",
          quantity: Math.max(1, Number(selection.quantity) || 1),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ reservations: [reservation, ...state.reservations] }));
        return reservation;
      },

      cancelReservation: (id) =>
        set((state) => ({ reservations: state.reservations.filter((reservation) => reservation.id !== id) })),

      checkout: (customer) => {
        const state = get();
        const items = state.cart
          .map((cartItem) => {
            const product = state.products.find((item) => item.id === cartItem.productId);
            return product
              ? { ...product, ...cartItem, cartItemId: cartItem.cartItemId || getCartItemId(cartItem.productId, cartItem.size, cartItem.color) }
              : null;
          })
          .filter(Boolean);

        if (!items.length) return null;

        const order = {
          id: `SC-${Date.now().toString(36).toUpperCase()}`,
          items,
          total: items.reduce((total, item) => total + item.price * item.quantity, 0),
          customer: { name: customer.name.trim(), address: customer.address.trim() },
          createdAt: new Date().toISOString(),
        };

        set((current) => ({ orders: [order, ...current.orders], cart: [] }));
        return order;
      },
    }),
    {
      name: "shopco-store-v1",
      version: 4,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState, version) => {
        if (version < 4) {
          const savedProducts = Array.isArray(persistedState.products) ? persistedState.products : [];
          const customProducts = savedProducts.filter((product) => !/^shopco-\d+$/.test(String(product.id)));
          return {
            ...persistedState,
            products: [...initialProducts, ...customProducts],
            reservations: persistedState.reservations || [],
          };
        }
        return persistedState;
      },
      partialize: (state) => ({
        products: state.products,
        cart: state.cart,
        favorites: state.favorites,
        reservations: state.reservations,
        orders: state.orders,
      }),
    },
  ),
);
