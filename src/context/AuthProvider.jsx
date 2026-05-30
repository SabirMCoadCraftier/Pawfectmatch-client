import { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '../firebase/firebase.init';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে টোকেন ও প্রোফাইল ডাটা সিঙ্ক করার সেন্ট্রালাইজড ফাংশন
  const syncWithBackend = async (firebaseUser, customName = null) => {
    try {
      const loginRes = await axiosInstance.post('/api/auth/login', {
        email: firebaseUser.email,
        name: customName || firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
      });

      if (loginRes.data.token) {
        localStorage.setItem('token', loginRes.data.token);
      }

      const res = await axiosInstance.get('/api/auth/me');
      setUser(res.data);
    } catch (error) {
      console.error('Auth state sync error:', error);
      // ব্যাকএন্ড ফেইল করলে ফায়ারবেস ডাটা দিয়ে ব্যাকআপ স্টেট সেট হবে
      setUser({
        email: firebaseUser.email,
        name: customName || firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // যদি রেজিস্ট্রেশনের প্রসেস রানিং থাকে, তবে লিসেনারকে স্কিপ করতে দেব 
        // কারণ register ফাংশন নিজেই নামসহ সিঙ্ক কমপ্লিট করবে।
        if (auth.currentUser && !firebaseUser.displayName && !user) {
          return;
        }
        await syncWithBackend(firebaseUser);
      } else {
        setUser(null);
        localStorage.removeItem('token');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // ফায়ারবেস প্রোফাইলে নাম আপডেট করা
      await updateProfile(result.user, { displayName: name });
      
      // নাম আপডেট হওয়ার সাথে সাথে কাস্টম নামসহ ব্যাকএন্ড সিঙ্ক রান করা
      await syncWithBackend(result.user, name);
      return result;
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncWithBackend(result.user);
      return result;
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      await syncWithBackend(result.user);
      return result;
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Google sign-in failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout').catch(() => {});
    } finally {
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const apiFetch = async (endpoint, options = {}) => {
    const res = await axiosInstance({
      url: `/api${endpoint}`,
      method: options.method || 'GET',
      data: options.data || (options.body ? JSON.parse(options.body) : undefined),
    });
    return res.data;
  };

  const value = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    apiFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};