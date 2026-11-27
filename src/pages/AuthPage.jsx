import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ displayName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      setSubmitting(true);
      await register(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use'
        ? 'Email này đã được đăng ký.'
        : err.code === 'auth/weak-password'
          ? 'Mật khẩu phải có ít nhất 6 ký tự.'
          : 'Không thể đăng ký. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Tạo tài khoản">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField label="Họ và tên" type="text" value={form.displayName} onChange={(value) => setForm({ ...form, displayName: value })} required />
        <AuthField label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
        <AuthField label="Mật khẩu" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required />
        <AuthField label="Xác nhận mật khẩu" type="password" value={form.confirmPassword} onChange={(value) => setForm({ ...form, confirmPassword: value })} required />
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={submitting} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
          {submitting ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-600">Đã có tài khoản? <Link className="font-medium text-blue-600" to="/dang-nhap">Đăng nhập</Link></p>
    </AuthCard>
  );
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setSubmitting(true);
      await login(email, password);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(err.code === 'auth/invalid-credential'
        ? 'Email hoặc mật khẩu không đúng.'
        : 'Không thể đăng nhập. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Đăng nhập">
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField label="Email" type="email" value={email} onChange={setEmail} required />
        <AuthField label="Mật khẩu" type="password" value={password} onChange={setPassword} required />
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={submitting} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
          {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-600">Chưa có tài khoản? <Link className="font-medium text-blue-600" to="/dang-ky">Đăng ký</Link></p>
    </AuthCard>
  );
}

function AuthCard({ title, children }) {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">{title}</h1>
        {children}
      </div>
    </div>
  );
}

function AuthField({ label, type, value, onChange, required }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
      />
    </div>
  );
}
