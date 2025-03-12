import { RootState } from "@/redux/store";
import { TProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 



// Define the initial state
type WishlistState = {
  items: TProduct[];
};

// Load wishlist items from localStorage
const loadWishlistFromLocalStorage = (): TProduct[] => {
  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  }
  return [];
};

const initialState: WishlistState = {
  items: loadWishlistFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add item to wishlist
    addToWishlist: (state, action: PayloadAction<TProduct>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);

      if (!existingItem) {
        state.items.push(item);
        // Save to localStorage
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    // Remove item from wishlist
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
      // Update localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    // Clear the entire wishlist
    clearWishlist: (state) => {
      state.items = [];
      // Clear localStorage
      localStorage.removeItem("wishlist");
    },
  },
});

// Export actions
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

// Export reducer
export default wishlistSlice.reducer;
export const getWishlist = (state: RootState) => state.wishlist.items;