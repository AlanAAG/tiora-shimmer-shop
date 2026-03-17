import { useState, useEffect, useCallback } from "react";

const WISHLIST_KEY = "tiora_wishlist";

function getStoredWishlist(): Set<string> {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveWishlist(ids: Set<string>) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify([...ids]));
}

export function useLocalWishlist() {
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(getStoredWishlist);

  const toggle = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      saveWishlist(next);
      return next;
    });
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlistedIds.has(productId),
    [wishlistedIds]
  );

  return { wishlistedIds, toggle, isWishlisted };
}
