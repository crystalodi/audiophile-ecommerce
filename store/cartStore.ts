import { useEffect, useState } from 'react';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  slug: string;
  quantity: number;
}

interface CartStore {
  cartItems: Map<string, CartItem>;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  getCartItemsArray: () => CartItem[];
  addCartItem: (item: CartItem) => void;
  deleteCartItem: (slug: string) => void;
  updateQuantity: (item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: new Map(),
      hasHydrated: false,
      
      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state })
      },
      
      getCartItemsArray: () => Array.from(get().cartItems.values()),
      
      addCartItem: (item: CartItem) => {
        const { cartItems } = get()
        const existingItem = cartItems.get(item.slug)
        
        if (existingItem) {
          // Update existing item
          const newCartItems = new Map(cartItems)
          newCartItems.set(item.slug, {
            ...existingItem,
            quantity: existingItem.quantity + item.quantity
          })
          set({ cartItems: newCartItems })
        } else {
          // Add new item
          const newCartItems = new Map(cartItems)
          newCartItems.set(item.slug, item)
          set({ cartItems: newCartItems })
        }
      },
      
      deleteCartItem: (slug: string) => {
        set(state => {
          const newCartItems = new Map(state.cartItems)
          newCartItems.delete(slug)
          return { cartItems: newCartItems }
        })
      },
      
      updateQuantity: (item: CartItem) => {
        set(state => {
          const newCartItems = new Map(state.cartItems)
          const existingItem = newCartItems.get(item.slug)
          
          if (existingItem) {
            newCartItems.set(item.slug, {
              ...existingItem,
              quantity: item.quantity
            })
          }
          
          return { cartItems: newCartItems }
        })
      },
      
      clearCart: () => {
        set({ cartItems: new Map() })
      }
    }),
    {
      name: 'audiophile-cart-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          
          const { state } = JSON.parse(str)
          return {
            state: {
              ...state,
              cartItems: new Map(state.cartItems || [])
            }
          }
        },
        setItem: (name, value) => {
          const cartItemsArray = Array.from(value.state.cartItems.entries())
          const toStore = {
            state: {
              ...value.state,
              cartItems: cartItemsArray
            }
          }
          localStorage.setItem(name, JSON.stringify(toStore))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export function useCartWithProductDetail() {
  const cartItems = useCartStore(state => state.cartItems);
  const hasHydrated = useCartStore(state => state.hasHydrated);
  const [itemsWithPrices, setItemsWithPrices] = useState<(CartItem & {price:number, productName: string, image: string, maxQuantity: number})[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasHydrated) return;
    const fetchCartWithProductDetail = async () => {
      const items = Array.from(cartItems.values());
      const slugs = items.map(items => items.slug);
      if (slugs.length === 0) {
        setItemsWithPrices([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch("/api/cart/details", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ slugs })
        });

        if(!response.ok) throw new Error("Failed to fetch cart details");
        const products = await response.json();
        const itemsWithDetails = items.map(cartItem => {
          const product = products.find((prod: any) => prod.slug === cartItem.slug);
          return {
            ...cartItem,
            price: product?.price,
            productName: product?.shortName ? product?.shortName : product?.productName,
            image: product?.image,
            maxQuantity: product?.maxQuantity
          }
        });
        setItemsWithPrices(itemsWithDetails);
      } catch (error) {
        console.error('Failed to fetch cart details:', error)
        setItemsWithPrices([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCartWithProductDetail();
  }, [hasHydrated, cartItems])
  return { itemsWithPrices, isLoading }
}