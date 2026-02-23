'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, Shield, Zap } from 'lucide-react';
import { signIn } from '@/lib/supabase/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log('[Login] Starting sign in for:', email);

    try {
      console.log('[Login] Calling signIn...');
      const authData = await signIn(email, password);
      console.log('[Login] signIn returned:', { 
        hasSession: !!authData.session, 
        hasUser: !!authData.user,
        userId: authData.user?.id 
      });
      
      if (!authData.session) {
        console.log('[Login] No session returned');
        setError('Sign in failed. Please try again.');
        return;
      }

      console.log('[Login] Calling check-admin API...');
      const response = await fetch(`/api/auth/check-admin?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Bearer ${authData.session.access_token}`,
        },
      });
      console.log('[Login] check-admin response status:', response.status);
      const data = await response.json();
      console.log('[Login] check-admin data:', data);
      
      if (data.isAdmin) {
        console.log('[Login] User is admin, redirecting...');
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        window.location.href = '/admin';
      } else {
        console.log('[Login] User is NOT admin');
        setError('You do not have admin access.');
      }
    } catch (err: unknown) {
      console.error('[Login] Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';
      setError(errorMessage);
    } finally {
      console.log('[Login] Finally block, setting loading to false');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden flex items-center justify-center p-4">

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="h-[2px] w-8 bg-[#fe6004]" />
          <span className="text-[#fe6004] text-sm font-bold uppercase tracking-[0.3em]">
            Admin Portal
          </span>
          <div className="h-[2px] w-8 bg-[#fe6004]" />
        </motion.div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-lime px-8 py-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#fe6004]" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-black uppercase tracking-wide">
                  Hanuman Luge
                </h1>
                <p className="text-black/60 text-sm font-medium">Management System</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hanumanluge.com"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-[#fe6004] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-14 pl-12 pr-14 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-[#fe6004] focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full h-14 bg-[#fe6004] hover:bg-[#ff7a2e] text-white font-black rounded-xl flex items-center justify-center gap-3 transition-colors disabled:opacity-50 uppercase tracking-wide text-lg shadow-lg shadow-[#fe6004]/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6">
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Encrypted
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Authorized Only</span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/40 text-sm mt-6"
        >
          Protected area for staff members only
        </motion.p>
      </motion.div>
    </div>
  );
}
