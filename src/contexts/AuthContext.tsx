import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, UserProfile } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

// Default context value for when used outside provider
const defaultAuthContext: AuthContextType = {
  user: null,
  session: null,
  profile: null,
  loading: true,
  signUp: async () => ({ error: new Error('Auth not initialized') }),
  signIn: async () => ({ error: new Error('Auth not initialized') }),
  signOut: async () => {},
  resetPassword: async () => ({ error: new Error('Auth not initialized') }),
  updatePassword: async () => ({ error: new Error('Auth not initialized') }),
  refreshProfile: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as UserProfile | null;
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Use setTimeout to avoid potential race conditions
        setTimeout(async () => {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
          
          // Link guest orders to new user
          if (event === 'SIGNED_IN') {
            const userPhone = session.user.phone || session.user.user_metadata?.phone;
            const userEmail = session.user.email || session.user.user_metadata?.email;
            await linkGuestOrders(session.user.id, userPhone, userEmail);
            await syncLocalStylePreferences(session.user.id);
          }
        }, 0);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    // Then get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const linkGuestOrders = async (userId: string, phone?: string, email?: string) => {
    try {
      // Link by phone first (primary identifier)
      if (phone) {
        await supabase
          .from('orders')
          .update({ user_id: userId })
          .eq('guest_phone', phone)
          .is('user_id', null);
      }
      
      // Also link by email if provided
      if (email) {
        await supabase
          .from('orders')
          .update({ user_id: userId })
          .eq('guest_email', email)
          .is('user_id', null);
      }
    } catch (error) {
      console.error('Error linking guest orders:', error);
    }
  };

  const syncLocalStylePreferences = async (userId: string) => {
    const localPrefs = localStorage.getItem('style_preferences');
    if (!localPrefs) return;
    
    try {
      const prefs = JSON.parse(localPrefs);
      await supabase
        .from('style_preferences')
        .upsert({
          user_id: userId,
          ...prefs,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
      
      localStorage.removeItem('style_preferences');
    } catch (error) {
      console.error('Error syncing style preferences:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    // Format phone with +91 prefix if not already present, but only if phone is provided
    let formattedPhone = null;
    if (phone) {
      formattedPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: formattedPhone,
          // email is automatically handled by Auth
        }
      }
    });
    
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    return { error: error as Error | null };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    return { error: error as Error | null };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
