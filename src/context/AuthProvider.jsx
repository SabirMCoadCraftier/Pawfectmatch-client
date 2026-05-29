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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const loginRes = await axiosInstance.post('/api/auth/login', {
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });

          if (loginRes.data.token) {
            localStorage.setItem('token', loginRes.data.token);
          }

          const res = await axiosInstance.get('/api/auth/me');
          setUser(res.data);
        } catch (error) {
          console.error('Auth state sync error:', error);
          setUser({
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    const loginRes = await axiosInstance.post('/api/auth/login', {
      email: result.user.email,
      name,
      photoURL: result.user.photoURL || '',
    });

    if (loginRes.data.token) {
      localStorage.setItem('token', loginRes.data.token);
    }

    const res = await axiosInstance.get('/api/auth/me');
    setUser(res.data);
    return result;
  };

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    const loginRes = await axiosInstance.post('/api/auth/login', {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
    });

    if (loginRes.data.token) {
      localStorage.setItem('token', loginRes.data.token);
    }

    const res = await axiosInstance.get('/api/auth/me');
    setUser(res.data);
    return result;
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    const loginRes = await axiosInstance.post('/api/auth/login', {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL,
    });

    if (loginRes.data.token) {
      localStorage.setItem('token', loginRes.data.token);
    }

    const res = await axiosInstance.get('/api/auth/me');
    setUser(res.data);
    return result;
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
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