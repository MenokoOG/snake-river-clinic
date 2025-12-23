import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, googleProvider } from "../firebase/auth";
import { db } from "../firebase/firestore";
import type { AppRole, UserProfile } from "./types";

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  role: AppRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (args: {
    email: string;
    password: string;
    displayName?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureUserProfile(u: User): Promise<UserProfile> {
  const ref = doc(db, "users", u.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data() as Partial<UserProfile>;
    return {
      uid: u.uid,
      email: u.email ?? "",
      displayName: (u.displayName ?? data.displayName) || undefined,
      role: (data.role as AppRole) ?? "user",
      createdAt:
        typeof data.createdAt === "number" ? data.createdAt : Date.now(),
    };
  }

  const profile: UserProfile = {
    uid: u.uid,
    email: u.email ?? "",
    displayName: u.displayName ?? undefined,
    role: "user",
    createdAt: Date.now(),
  };

  await setDoc(
    ref,
    { ...profile, createdAtServer: serverTimestamp() },
    { merge: true }
  );

  return profile;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (!u) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const p = await ensureUserProfile(u);
        setProfile(p);
      } catch {
        // If Firestore is locked down, auth can still succeed.
        // Profile/role will be null until rules are fixed.
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    // profile creation will occur via onAuthStateChanged -> ensureUserProfile
  };

  const signup = async (args: {
    email: string;
    password: string;
    displayName?: string;
  }) => {
    const email = args.email.trim();
    const password = args.password;
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    if (args.displayName?.trim()) {
      await updateProfile(cred.user, { displayName: args.displayName.trim() });
    }

    try {
      const p = await ensureUserProfile(cred.user);
      setProfile(p);
    } catch {
      setProfile(null);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      role: profile?.role ?? null,
      loading,
      login,
      loginWithGoogle,
      signup,
      logout,
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
