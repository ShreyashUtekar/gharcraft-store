'use client';

import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, loginUser, registerUser, currentUser, logoutUser } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please fill in both email and password.');
        return;
      }
      loginUser(email, password);
      setIsAuthOpen(false);
    } else {
      if (!name || !email || !password) {
        setError('Please fill in your name, email, and password.');
        return;
      }
      registerUser(name, email, password, phone);
      setIsAuthOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 border border-gray-100 animate-slide-up">
          {/* Close Button */}
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logged in state */}
          {currentUser ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                {currentUser.name[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-dark">Welcome back, {currentUser.name}!</h3>
                <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <a
                  href="/account"
                  onClick={() => setIsAuthOpen(false)}
                  className="block w-full bg-primary text-white font-heading font-semibold py-3 rounded-2xl text-xs hover:bg-primary-dark transition-colors"
                >
                  View My Orders & Account
                </a>
                <button
                  onClick={() => {
                    logoutUser();
                    setIsAuthOpen(false);
                  }}
                  className="w-full bg-gray-100 text-dark font-heading font-semibold py-3 rounded-2xl text-xs hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Auth Form */
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="font-heading font-bold text-2xl text-dark">
                  {mode === 'login' ? 'Sign In to GharCraft' : 'Create Customer Account'}
                </h2>
                <p className="text-xs text-gray-500">
                  {mode === 'login'
                    ? 'Access your saved cart, delivery addresses & orders'
                    : 'Join 50,000+ Indian home organization members'}
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex bg-brandBg p-1 rounded-2xl border border-gray-200 text-xs font-semibold">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    mode === 'login' ? 'bg-white text-dark shadow-sm' : 'text-gray-500 hover:text-dark'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    mode === 'register' ? 'bg-white text-dark shadow-sm' : 'text-gray-500 hover:text-dark'
                  }`}
                >
                  New Account
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                {mode === 'register' && (
                  <div>
                    <label className="font-semibold text-dark block mb-1">Full Name</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-brandBg">
                      <User className="w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Ananya Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent flex-1 text-dark outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="font-semibold text-dark block mb-1">Email Address</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-brandBg">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="your.name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent flex-1 text-dark outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-dark block mb-1">Password</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-brandBg">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent flex-1 text-dark outline-none"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="font-semibold text-dark block mb-1">Mobile Phone (Optional for SMS updates)</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 bg-brandBg">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-transparent flex-1 text-dark outline-none font-mono"
                      />
                    </div>
                  </div>
                )}

                {error && <p className="text-red-500 text-[11px] font-medium pt-1">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all mt-4"
                >
                  {mode === 'login' ? 'Sign In to Account' : 'Create Free Account'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
