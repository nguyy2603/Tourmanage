import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute({ children }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="py-16 text-center text-gray-500">Đang kiểm tra quyền truy cập...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/dang-nhap" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto my-10 px-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-xl font-bold text-red-700">Không có quyền truy cập</h1>
          <p className="mt-2 text-sm text-red-600">Chỉ tài khoản có vai trò Admin mới được vào trang quản lý tour.</p>
        </div>
      </div>
    );
  }

  return children;
}
