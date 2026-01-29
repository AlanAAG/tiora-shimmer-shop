import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AccountOverview } from "@/components/account/AccountOverview";
import { AccountOrders } from "@/components/account/AccountOrders";
import { AccountWishlist } from "@/components/account/AccountWishlist";
import { AccountProfile } from "@/components/account/AccountProfile";
import { AccountAddresses } from "@/components/account/AccountAddresses";
import { AccountStylePreferences } from "@/components/account/AccountStylePreferences";
import { AccountNotifications } from "@/components/account/AccountNotifications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  User, 
  MapPin, 
  Sparkles, 
  Bell, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AccountPage = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showCompletionBanner, setShowCompletionBanner] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: { from: "/account" } });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Check if profile is incomplete
    if (profile && !profile.phone_number && !profile.full_name) {
      const dismissed = localStorage.getItem('profile_banner_dismissed');
      if (!dismissed) {
        setShowCompletionBanner(true);
      }
    }
  }, [profile]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const dismissBanner = () => {
    setShowCompletionBanner(false);
    localStorage.setItem('profile_banner_dismissed', 'true');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "style", label: "Style Preferences", icon: Sparkles },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? "flex flex-col gap-2 p-4" : "space-y-1"}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            if (mobile) setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-colors ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-destructive hover:bg-destructive/10 transition-colors mt-4"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header showBanner={false} disableScrollHide />
      
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Profile Completion Banner */}
          {showCompletionBanner && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Complete your profile</p>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations and faster checkout
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("profile")}
                >
                  Complete Profile
                </Button>
                <button
                  onClick={dismissBanner}
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display">
                Hi, {firstName}
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome to your Jewellery Wallet
              </p>
            </div>
            
            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="p-4 border-b">
                  <h2 className="font-display text-lg">Account Menu</h2>
                </div>
                <NavContent mobile />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card rounded-2xl border border-border p-4 sticky top-28">
                <NavContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {activeTab === "overview" && <AccountOverview onNavigate={setActiveTab} />}
              {activeTab === "orders" && <AccountOrders />}
              {activeTab === "wishlist" && <AccountWishlist />}
              {activeTab === "profile" && <AccountProfile />}
              {activeTab === "addresses" && <AccountAddresses />}
              {activeTab === "style" && <AccountStylePreferences />}
              {activeTab === "notifications" && <AccountNotifications />}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
