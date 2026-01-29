import { supabase, UserProfile, Address, StylePreferences, Order, OrderItem, WishlistItem } from '@/lib/supabase';

// Profile operations
export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Address operations
export const getAddresses = async (userId: string): Promise<Address[]> => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createAddress = async (address: Omit<Address, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('addresses')
    .insert(address)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateAddress = async (id: string, updates: Partial<Address>) => {
  const { data, error } = await supabase
    .from('addresses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteAddress = async (id: string) => {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const setDefaultAddress = async (userId: string, addressId: string) => {
  // First unset all defaults
  await supabase
    .from('addresses')
    .update({ is_default: false })
    .eq('user_id', userId);
  
  // Set the new default
  const { error } = await supabase
    .from('addresses')
    .update({ is_default: true })
    .eq('id', addressId);
  
  if (error) throw error;
  
  // Update profile's default shipping address
  await supabase
    .from('user_profiles')
    .update({ default_shipping_address_id: addressId })
    .eq('user_id', userId);
};

// Style preferences operations
export const getStylePreferences = async (userId: string): Promise<StylePreferences | null> => {
  const { data, error } = await supabase
    .from('style_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) throw error;
  return data;
};

export const updateStylePreferences = async (userId: string, preferences: Partial<StylePreferences>) => {
  const { data, error } = await supabase
    .from('style_preferences')
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Wishlist operations
export const getWishlist = async (userId: string): Promise<WishlistItem[]> => {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const addToWishlist = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('wishlists')
    .insert({ user_id: userId, product_id: productId })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
  
  if (error) throw error;
};

// Order operations
export const getOrders = async (userId: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data || [];
};

export const getOrderWithItems = async (orderId: string) => {
  const [order, items] = await Promise.all([
    supabase.from('orders').select('*').eq('id', orderId).single(),
    supabase.from('order_items').select('*').eq('order_id', orderId)
  ]);
  
  if (order.error) throw order.error;
  return { order: order.data, items: items.data || [] };
};

// Guest order operations
export const createGuestOrder = async (
  guestEmail: string,
  guestPhone: string,
  totalAmount: number,
  items: Array<{ product_id: string; quantity: number; price: number }>,
  shopifyCheckoutToken?: string
) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      guest_email: guestEmail,
      guest_phone: guestPhone,
      total_amount: totalAmount,
      status: 'pending',
      shopify_checkout_token: shopifyCheckoutToken
    })
    .select()
    .single();
  
  if (orderError) throw orderError;
  
  const orderItems = items.map(item => ({
    order_id: order.id,
    ...item
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
  
  if (itemsError) throw itemsError;
  
  return order;
};

// Stats
export const getAccountStats = async (userId: string) => {
  const [ordersResult, wishlistResult] = await Promise.all([
    supabase.from('orders').select('id', { count: 'exact' }).eq('user_id', userId),
    supabase.from('wishlists').select('id', { count: 'exact' }).eq('user_id', userId)
  ]);
  
  return {
    ordersCount: ordersResult.count || 0,
    wishlistCount: wishlistResult.count || 0
  };
};
