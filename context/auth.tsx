import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "@/utils/supabase";

const GUEST_KEY = "@guest_mode";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  continueAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isGuest: false,
  continueAsGuest: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [
        {
          data: { session },
        },
        guestFlag,
      ] = await Promise.all([supabase.auth.getSession(), AsyncStorage.getItem(GUEST_KEY)]);
      setSession(session);
      if (!session && guestFlag === "true") setIsGuest(true);
      setLoading(false);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // A real session always supersedes guest mode.
      if (session) {
        setIsGuest(false);
        AsyncStorage.removeItem(GUEST_KEY);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const continueAsGuest = async () => {
    await AsyncStorage.setItem(GUEST_KEY, "true");
    setIsGuest(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem(GUEST_KEY);
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
        isGuest,
        continueAsGuest,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Best-effort human-readable name for a user: full name, then email handle, then fallback.
export const getDisplayName = (user: User | null, fallback = "User") =>
  user?.user_metadata?.full_name || user?.email?.split("@")[0] || fallback;
