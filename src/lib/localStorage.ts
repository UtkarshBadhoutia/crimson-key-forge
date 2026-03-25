// ─── Cart ────────────────────────────────────────────────
export interface LocalCartItem {
  productId: string;
  quantity: number;
}

const CART_KEY = 'strafion_cart';
const WISHLIST_KEY = 'strafion_wishlist';
const USER_KEY = 'strafion_user';
const REVIEWS_KEY = 'strafion_reviews';
const RECENTLY_VIEWED_KEY = 'recentlyViewed';

export const getCart = (): LocalCartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch { return []; }
};

export const saveCart = (items: LocalCartItem[]) =>
  localStorage.setItem(CART_KEY, JSON.stringify(items));

export const addCartItem = (productId: string, quantity = 1): LocalCartItem[] => {
  const cart = getCart();
  const existing = cart.find(i => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  saveCart(cart);
  return cart;
};

export const updateCartItemQty = (productId: string, quantity: number): LocalCartItem[] => {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter(i => i.productId !== productId);
  } else {
    const item = cart.find(i => i.productId === productId);
    if (item) item.quantity = quantity;
  }
  saveCart(cart);
  return cart;
};

export const removeCartItem = (productId: string): LocalCartItem[] => {
  const cart = getCart().filter(i => i.productId !== productId);
  saveCart(cart);
  return cart;
};

export const clearCartStorage = () => localStorage.removeItem(CART_KEY);

// ─── Wishlist ────────────────────────────────────────────
export const getWishlist = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
  } catch { return []; }
};

export const saveWishlist = (ids: string[]) =>
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));

export const toggleWishlistItem = (productId: string): { added: boolean; list: string[] } => {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx >= 0) {
    list.splice(idx, 1);
    saveWishlist(list);
    return { added: false, list };
  }
  list.push(productId);
  saveWishlist(list);
  return { added: true, list };
};

// ─── User / Auth ─────────────────────────────────────────
export interface LocalUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export const getUser = (): LocalUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

export const saveUser = (user: LocalUser) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

export const removeUser = () => localStorage.removeItem(USER_KEY);

// ─── Reviews ─────────────────────────────────────────────
export interface LocalReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export const getReviews = (productId: string): LocalReview[] => {
  try {
    const all: LocalReview[] = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
    return all.filter(r => r.productId === productId);
  } catch { return []; }
};

export const getAllReviews = (): LocalReview[] => {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
  } catch { return []; }
};

export const saveReview = (review: LocalReview) => {
  const all = getAllReviews();
  const idx = all.findIndex(r => r.id === review.id);
  if (idx >= 0) {
    all[idx] = review;
  } else {
    all.push(review);
  }
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
};

export const deleteReviewById = (reviewId: string) => {
  const all = getAllReviews().filter(r => r.id !== reviewId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
};

// ─── Recently Viewed ─────────────────────────────────────
export const getRecentlyViewedIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
  } catch { return []; }
};

export const addRecentlyViewedId = (productId: string) => {
  let ids = getRecentlyViewedIds().filter(id => id !== productId);
  ids.unshift(productId);
  ids = ids.slice(0, 10);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(ids));
};
