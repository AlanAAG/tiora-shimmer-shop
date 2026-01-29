import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAccountStats } from "@/services/accountService";
import { ShoppingBag, Heart, Award } from "lucide-react";

interface AccountOverviewProps {
  onNavigate: (tab: string) => void;
}

export const AccountOverview = ({ onNavigate }: AccountOverviewProps) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ ordersCount: 0, wishlistCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        try {
          const data = await getAccountStats(user.id);
          setStats(data);
        } catch (error) {
          console.error("Error fetching stats:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
  }, [user]);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.ordersCount,
      icon: ShoppingBag,
      onClick: () => onNavigate("orders"),
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "Wishlist Items",
      value: stats.wishlistCount,
      icon: Heart,
      onClick: () => onNavigate("wishlist"),
      color: "bg-pink-500/10 text-pink-600",
    },
    {
      label: "Member Tier",
      value: "Gold",
      icon: Award,
      onClick: undefined,
      color: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-display">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            disabled={!stat.onClick}
            className={`bg-card border border-border rounded-2xl p-6 text-left transition-all ${
              stat.onClick ? "hover:shadow-md cursor-pointer" : "cursor-default"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-display">
              {loading ? "..." : stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate("orders")}
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <ShoppingBag className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
            <span className="text-sm">View Orders</span>
          </button>
          <button
            onClick={() => onNavigate("wishlist")}
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <Heart className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
            <span className="text-sm">Wishlist</span>
          </button>
          <button
            onClick={() => onNavigate("profile")}
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <span className="text-sm">Edit Profile</span>
          </button>
          <button
            onClick={() => onNavigate("style")}
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
          >
            <span className="text-sm">Style Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
