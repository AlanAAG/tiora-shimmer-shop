import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getStylePreferences, updateStylePreferences } from "@/services/accountService";
import { StylePreferences } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

export const AccountStylePreferences = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    occasion_daily: false,
    occasion_office: false,
    occasion_party: false,
    occasion_wedding: false,
    aesthetic_minimal: false,
    aesthetic_bold: false,
    aesthetic_traditional: false,
    aesthetic_indo_western: false,
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      if (user) {
        try {
          const data = await getStylePreferences(user.id);
          if (data) {
            setPreferences({
              occasion_daily: data.occasion_daily,
              occasion_office: data.occasion_office,
              occasion_party: data.occasion_party,
              occasion_wedding: data.occasion_wedding,
              aesthetic_minimal: data.aesthetic_minimal,
              aesthetic_bold: data.aesthetic_bold,
              aesthetic_traditional: data.aesthetic_traditional,
              aesthetic_indo_western: data.aesthetic_indo_western,
            });
          }
        } catch (error) {
          console.error("Error fetching preferences:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPreferences();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await updateStylePreferences(user.id, preferences);
      toast({
        title: "Preferences saved",
        description: "Your style preferences have been updated.",
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

  const occasions = [
    { key: "occasion_daily", label: "Daily Wear", description: "Everyday elegance" },
    { key: "occasion_office", label: "Office", description: "Professional & subtle" },
    { key: "occasion_party", label: "Party", description: "Statement pieces" },
    { key: "occasion_wedding", label: "Wedding", description: "Bridal & festive" },
  ];

  const aesthetics = [
    { key: "aesthetic_minimal", label: "Minimal", description: "Clean & understated" },
    { key: "aesthetic_bold", label: "Bold", description: "Eye-catching designs" },
    { key: "aesthetic_traditional", label: "Traditional", description: "Classic Indian motifs" },
    { key: "aesthetic_indo_western", label: "Indo-Western", description: "Modern fusion" },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-display">Style Preferences</h2>
        <div className="animate-pulse space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 h-48" />
          <div className="bg-card border border-border rounded-2xl p-6 h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display">Style Preferences</h2>
          <p className="text-sm text-muted-foreground">
            Help us personalize your experience
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-medium mb-4">What occasions do you buy jewellery for?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {occasions.map((item) => (
            <label
              key={item.key}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                preferences[item.key as keyof typeof preferences]
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Checkbox
                checked={preferences[item.key as keyof typeof preferences]}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    [item.key]: checked === true,
                  }))
                }
                className="mt-0.5"
              />
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-medium mb-4">What's your preferred aesthetic?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aesthetics.map((item) => (
            <label
              key={item.key}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                preferences[item.key as keyof typeof preferences]
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Checkbox
                checked={preferences[item.key as keyof typeof preferences]}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    [item.key]: checked === true,
                  }))
                }
                className="mt-0.5"
              />
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
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
