import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Briefcase, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authModalMode,
    authModalRole,
    closeAuthModal,
    loginUser,
    candidates
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [role, setRole] = useState<'candidate' | 'recruiter'>(authModalRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Sync mode and role if modal re-opens
  React.useEffect(() => {
    if (authModalOpen) {
      setMode(authModalMode);
      setRole(authModalRole);
      setError('');
      setForgotSent(false);
    }
  }, [authModalOpen, authModalMode, authModalRole]);

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'forgot') {
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      setForgotSent(true);
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (mode === 'signup') {
      if (!name) {
        setError('Please provide your full name');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    loginUser(role, email);
  };

  const handleQuickDemoLogin = (selectedRole: 'candidate' | 'recruiter', demoEmail: string) => {
    loginUser(selectedRole, demoEmail);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold tracking-wide uppercase mb-2 border border-indigo-500/30">
            CareerPulse Security
          </div>
          <h2 className="text-xl font-bold">
            {mode === 'login'
              ? `Sign in to CareerPulse`
              : mode === 'signup'
              ? `Create your ${role === 'candidate' ? 'Candidate' : 'Recruiter'} Account`
              : `Reset your password`}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {mode === 'login'
              ? 'Access intelligent AI matching, applications, and recruiter tools.'
              : mode === 'signup'
              ? 'Join the AI-driven recruitment network designed for speed and transparency.'
              : 'Enter your email to receive a password reset link.'}
          </p>

          {/* Role selector tabs in modal */}
          {mode !== 'forgot' && (
            <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  role === 'candidate'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Candidate</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  role === 'recruiter'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Recruiter</span>
              </button>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-medium">
              {error}
            </div>
          )}

          {forgotSent ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Password Reset Email Sent</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                We have sent instructions to <strong>{email}</strong>. Check your inbox and follow the link.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setForgotSent(false);
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-950 rounded-lg"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={role === 'candidate' ? 'Aarav Sharma' : 'Sunita Mehra'}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={
                      role === 'candidate'
                        ? 'aarav.sharma@example.com'
                        : 'sunita.mehra@nextwavelabs.io'
                    }
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-medium"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Remember me on this browser</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-lg shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <span>
                  {mode === 'login'
                    ? 'Sign In'
                    : mode === 'signup'
                    ? 'Create Account'
                    : 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Login Shortcut Section */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-2.5">
              Instant Demo Access (One-Click)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('candidate', 'aarav.sharma@example.com')}
                className="p-2 text-left bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 rounded-lg transition-colors group"
              >
                <div className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 group-hover:text-indigo-900 dark:group-hover:text-indigo-300">
                  Aarav (Candidate)
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Full Stack • Bengaluru</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('recruiter', 'sunita.mehra@nextwavelabs.io')}
                className="p-2 text-left bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 rounded-lg transition-colors group"
              >
                <div className="text-[11px] font-bold text-blue-700 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-blue-300">
                  Sunita (Recruiter)
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">NextWave Labs</div>
              </button>
            </div>
          </div>

          {/* Switch mode links */}
          <div className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">
            {mode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Sign up for free
                </button>
              </p>
            ) : mode === 'signup' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                &larr; Back to login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};
