import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "@/services/accountService";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Bell, Loader2, MessageSquare, Mail, Smartphone } from "lucide-react";

export const AccountNotifications = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    whatsapp_opt_in: false,
    email_marketing: false,
    sms_offers: false,
    whatsapp_updates: false,
  });

  useEffect(() => {
    if (profile) {
      const commPrefs = profile.communication_preferences || {};
      setPreferences({
        whatsapp_opt_in: profile.whatsapp_opt_in || false,
        email_marketing: commPrefs.email_marketing || false,
        sms_offers: commPrefs.sms_offers || false,
        whatsapp_updates: commPrefs.whatsapp_updates || false,
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await updateProfile(user.id, {
        whatsapp_opt_in: preferences.whatsapp_opt_in,
        communication_preferences: {
          email_marketing: preferences.email_marketing,
          sms_offers: preferences.sms_offers,
          whatsapp_updates: preferences.whatsapp_updates,
        },
      });
      await refreshProfile();
      toast({
        title: "Preferences saved",
        description: "Your notification preferences have been updated.",
      });
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationOptions = [
    {
      key: "whatsapp_opt_in",
      icon: MessageSquare,
      title: "WhatsApp Order Updates",
      description: "Receive order confirmations and shipping updates via WhatsApp",
    },
    {
      key: "whatsapp_updates",
      icon: MessageSquare,
      title: "WhatsApp Exclusive Offers",
      description: "Get early access to sales and exclusive deals on WhatsApp",
    },
    {
      key: "email_marketing",
      icon: Mail,
      title: "Email Newsletter",
      description: "Receive our weekly newsletter with new arrivals and styling tips",
    },
    {
      key: "sms_offers",
      icon: Smartphone,
      title: "SMS Offers",
      description: "Get flash sale alerts and special discounts via SMS",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display">Notifications & Communication</h2>
          <p className="text-sm text-muted-foreground">
            Manage how we stay in touch with you
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {notificationOptions.map((option) => (
          <div
            key={option.key}
            className="p-5 flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                <option.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">{option.title}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
            <Switch
              checked={preferences[option.key as keyof typeof preferences]}
              onCheckedChange={() =>
                togglePreference(option.key as keyof typeof preferences)
              }
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Preferences
        </Button>
      </div>
    </div>
  );
};
