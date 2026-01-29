import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getOrders, getOrderItems } from "@/services/accountService";
import { Order, OrderItem } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronRight, Package, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { useCartStore } from "@/stores/cartStore";

export const AccountOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const data = await getOrders(user.id);
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const handleExpandOrder = async (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
      return;
    }

    setExpandedOrder(orderId);

    if (!orderItems[orderId]) {
      try {
        const items = await getOrderItems(orderId);
        setOrderItems((prev) => ({ ...prev, [orderId]: items }));
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // TODO: Integrate with real product data from Shopify
  const handleReorder = (items: OrderItem[]) => {
    // Placeholder: Add items to cart
    console.log("Reorder items:", items);
    // In production, this would use the cart store to add products
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display">My Orders</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display">My Orders</h2>
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No orders yet</h3>
          <p className="text-muted-foreground text-sm mb-6">
            When you make a purchase, it will appear here
          </p>
          <Button asChild>
            <a href="/shop">Start Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => handleExpandOrder(order.id)}
              className="w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(order.created_at), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">₹{order.total_amount.toLocaleString()}</p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedOrder === order.id ? "rotate-90" : ""
                  }`}
                />
              </div>
            </button>

            {expandedOrder === order.id && (
              <div className="border-t border-border p-4 sm:p-6 bg-muted/20">
                <h4 className="font-medium mb-4">Order Items</h4>
                {orderItems[order.id] ? (
                  <div className="space-y-3">
                    {orderItems[order.id].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-muted rounded-lg" />
                          <div>
                            {/* TODO: Replace with actual product name from Shopify */}
                            <p className="text-sm font-medium">Product {item.product_id.slice(0, 8)}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">₹{item.price.toLocaleString()}</p>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-border flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(orderItems[order.id])}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                      <p className="font-medium">
                        Total: ₹{order.total_amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Loading items...</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
