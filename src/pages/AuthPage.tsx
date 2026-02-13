import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, Phone, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AuthPage = () => {
  const [view, setView] = useState<'login' | 'signup' | 'reset'>('login');
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    signIn,
    signUp,
    resetPassword
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {
    from?: string;
  })?.from || "/account";

  // Validate Indian mobile number (10 digits)
  const validatePhone = (phoneNumber: string) => {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(cleanPhone);
  };

  const validateEmail = (emailValue: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  };

  const formatPhoneDisplay = (value: string) => {
    // Remove non-digits and limit to 10 digits
    const digits = value.replace(/\D/g, '').slice(0, 10);
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneDisplay(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (view !== 'reset') {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    if (view === 'signup') {
      if (!fullName.trim()) {
        setError("Please enter your full name");
        return;
      }
      if (phone && !validatePhone(phone)) {
        setError("Please enter a valid 10-digit Indian mobile number");
        return;
      }
    }

    setLoading(true);
    try {
      if (view === 'login') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate(from, { replace: true });
        }
      } else if (view === 'signup') {
        const { error } = await signUp(email, password, fullName.trim(), phone || undefined);
        if (error) {
          setError(error.message);
        } else {
          navigate(from, { replace: true });
        }
      } else if (view === 'reset') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setSuccess("Password reset link sent to your email!");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBanner={false} disableScrollHide />
      
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>
          
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h1 className="text-2xl font-display text-center mb-2">
              {view === 'login' && "Welcome Back"}
              {view === 'signup' && "Create Account"}
              {view === 'reset' && "Reset Password"}
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              {view === 'login' && "Sign in with your email address"}
              {view === 'signup' && "Join us for a personalized shopping experience"}
              {view === 'reset' && "Enter your email to receive a password reset link"}
            </p>
            
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-6">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {view === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {view === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-xs text-muted-foreground">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="9876543210"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="h-12 pl-20"
                      maxLength={10}
                    />
                  </div>
                </div>
              )}
              
              {view !== 'reset' && (
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full h-12" disabled={loading}>
                {loading ? "Please wait..." :
                 view === 'login' ? "Sign In" :
                 view === 'signup' ? "Create Account" :
                 "Send Reset Link"}
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-2">
              {view === 'login' && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => { setView('signup'); setError(""); setSuccess(""); }}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Forgot your password?{" "}
                    <button
                      type="button"
                      onClick={() => { setView('reset'); setError(""); setSuccess(""); }}
                      className="text-primary hover:underline"
                    >
                      Reset it
                    </button>
                  </p>
                </>
              )}

              {view === 'signup' && (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { setView('login'); setError(""); setSuccess(""); }}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}

              {view === 'reset' && (
                <p className="text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => { setView('login'); setError(""); setSuccess(""); }}
                    className="text-primary hover:underline font-medium"
                  >
                    Back to Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
