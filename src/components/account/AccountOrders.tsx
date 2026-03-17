import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ChevronRight, Package, Truck, ExternalLink, MapPin } from "lucide-react";
import { format } from "date-fns";

// Shopify order types
interface ShopifyLineItem {
  id: number;
  title: string;
  variant_title: string | null;
  quantity: number;
  price: string;
  image_url: string | null;
}

interface ShopifyFulfillment {
  id: number;
  status: string;
  tracking_number: string | null;
  tracking_url: string | null;
  tracking_company: string | null;
  created_at: string;
}

interface ShopifyOrder {
  id: number;
  name: string;
  created_at: string;
  total_price: string;
  currency: string;
  financial_status: string;
  fulfillment_status: string;
  order_status_url: string;
  line_items: ShopifyLineItem[];
  fulfillments: ShopifyFulfillment[];
}

export const AccountOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const { data, error: fnError } = await supabase.functions.invoke(
          "fetch-shopify-orders"
        );

        if (fnError) {
          console.error("Error fetching orders:", fnError);
          setError("Unable to load orders. Please try again later.");
          return;
        }

        setOrders(data?.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Unable to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "success":
      case "fulfilled":
        return "bg-green-100 text-green-700 border-green-200";
      case "in_transit":
      case "shipped":
      case "partial":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "unfulfilled":
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled":
      case "refunded":
      case "voided":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatStatus = (status: string) => {
    if (!status) return "Processing";
    return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const formatCurrency = (amount: string, currency: string) => {
    const num = parseFloat(amount);
    if (currency === "INR") return `₹${num.toLocaleString("en-IN")}`;
    return `${currency} ${num.toFixed(2)}`;
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

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display">My Orders</h2>
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">{error}</p>
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
        {orders.map((order) => {
          const orderId = String(order.id);
          const isExpanded = expandedOrder === orderId;
          const latestFulfillment = order.fulfillments[0];

          return (
            <div
              key={order.id}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              {/* Order header */}
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : orderId)}
                className="w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Order {order.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(order.total_price, order.currency)}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs border ${getStatusColor(
                        order.fulfillment_status
                      )}`}
                    >
                      {formatStatus(order.fulfillment_status)}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t border-border p-4 sm:p-6 bg-muted/20 space-y-5">
                  {/* Line items */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm">Items</h4>
                    <div className="space-y-3">
                      {order.line_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                              {item.image_url ? (
                                <img
                                  src={item.image_url}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-5 h-5 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              {item.variant_title && item.variant_title !== "Default Title" && (
                                <p className="text-xs text-muted-foreground">
                                  {item.variant_title}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium text-sm">
                            {formatCurrency(item.price, order.currency)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fulfillment / Tracking */}
                  {latestFulfillment && (
                    <div className="bg-card border border-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Shipping</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getStatusColor(latestFulfillment.status)}`}
                        >
                          {formatStatus(latestFulfillment.status)}
                        </Badge>
                      </div>
                      {latestFulfillment.tracking_company && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {latestFulfillment.tracking_company}
                          {latestFulfillment.tracking_number &&
                            ` — ${latestFulfillment.tracking_number}`}
                        </p>
                      )}
                      {latestFulfillment.tracking_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          asChild
                        >
                          <a
                            href={latestFulfillment.tracking_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="w-3.5 h-3.5 mr-1.5" />
                            Track Shipment
                          </a>
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Payment: {formatStatus(order.financial_status)}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={order.order_status_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        View Order Status
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
