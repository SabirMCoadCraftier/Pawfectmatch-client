import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider } from './context/AuthProvider';
import MainLayout from './components/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllPets from './pages/AllPets';
import PetDetails from './pages/PetDetails';
import AddPet from './pages/AddPet';
import MyListings from './pages/MyListings';
import MyRequests from './pages/MyRequests';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManagePets from './pages/admin/ManagePets';
import ManageRequests from './pages/admin/ManageRequests';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              {/* Main Layout Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/pets" element={<AllPets />} />
                <Route
                  path="/pets/:id"
                  element={
                    <PrivateRoute>
                      <PetDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add-pet"
                  element={
                    <PrivateRoute>
                      <AddPet />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-listings"
                  element={
                    <PrivateRoute>
                      <MyListings />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-requests"
                  element={
                    <PrivateRoute>
                      <MyRequests />
                    </PrivateRoute>
                  }
                />
                {/* Dashboard nested routes */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                >
                  <Route path="add-pet" element={<AddPet />} />
                  <Route path="my-listings" element={<MyListings />} />
                  <Route path="my-requests" element={<MyRequests />} />
                </Route>
                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <PrivateRoute>
                      <AdminRoute>
                        <ManageUsers />
                      </AdminRoute>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/pets"
                  element={
                    <PrivateRoute>
                      <AdminRoute>
                        <ManagePets />
                      </AdminRoute>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/requests"
                  element={
                    <PrivateRoute>
                      <AdminRoute>
                        <ManageRequests />
                      </AdminRoute>
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
