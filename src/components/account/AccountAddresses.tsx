import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/services/accountService";
import { Address } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Plus, Edit2, Trash2, Star, Loader2 } from "lucide-react";

export const AccountAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    full_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
  });

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    if (user) {
      try {
        const data = await getAddresses(user.id);
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      label: "",
      full_address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "India",
    });
    setEditingAddress(null);
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      label: address.label,
      full_address: address.full_address,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, formData);
        toast({ title: "Address updated successfully" });
      } else {
        await createAddress({
          user_id: user.id,
          ...formData,
          is_default: addresses.length === 0,
        });
        toast({ title: "Address added successfully" });
      }
      await fetchAddresses();
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast({ title: "Address deleted successfully" });
    } catch (error) {
      console.error("Error deleting address:", error);
      toast({
        title: "Error",
        description: "Failed to delete address.",
        variant: "destructive",
      });
    }
  };

  const handleSetDefault = async (addressId: string) => {
    if (!user) return;

    try {
      await setDefaultAddress(user.id, addressId);
      await fetchAddresses();
      toast({ title: "Default address updated" });
    } catch (error) {
      console.error("Error setting default:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display">My Addresses</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display">My Addresses</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="Home, Office, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_address">Full Address</Label>
                <Input
                  id="full_address"
                  value={formData.full_address}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, full_address: e.target.value }))
                  }
                  placeholder="Street, Building, Apartment"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, state: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, postal_code: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, country: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingAddress ? "Update" : "Add"} Address
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No addresses saved</h3>
          <p className="text-muted-foreground text-sm">
            Add an address for faster checkout
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-card border rounded-2xl p-5 relative ${
                address.is_default ? "border-primary" : "border-border"
              }`}
            >
              {address.is_default && (
                <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 fill-primary" />
                  Default
                </span>
              )}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{address.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {address.full_address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditDialog(address)}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                {!address.is_default && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive ml-auto"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
