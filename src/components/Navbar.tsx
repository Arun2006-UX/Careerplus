import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NotificationCenter } from './NotificationCenter';
import {
  Sparkles,
  Briefcase,
  UserCheck,
  Search,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Layers,
  BarChart3,
  PlusCircle,
  Shield,
  Presentation,
  CheckCircle2,
  Bookmark,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    currentCandidate,
    currentRecruiter,
    candidates,
    switchCandidate,
    openAuthModal,
    logoutUser,
    theme,
    toggleTheme
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => handleNavClick(userRole === 'recruiter' ? 'recruiter-dashboard' : userRole === 'candidate' ? 'candidate-dashboard' : 'home')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 dark:from-white dark:via-indigo-200 dark:to-blue-200 bg-clip-text text-transparent">
                    CareerPulse
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800">
                    AI Match
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5 hidden sm:block">
                  Intelligent Recruitment System
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {userRole === 'guest' && (
                <>
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'home'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNavClick('jobs')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'jobs'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Explore Jobs
                  </button>
                  <button
                    onClick={() => handleNavClick('presentation')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'presentation'
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50/60 dark:hover:bg-purple-950/30'
                    }`}
                  >
                    <Presentation className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Project Demo (Jury)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('privacy')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'privacy'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Privacy &amp; Ethics
                  </button>
                </>
              )}

              {userRole === 'candidate' && (
                <>
                  <button
                    onClick={() => handleNavClick('candidate-dashboard')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'candidate-dashboard'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('jobs')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'jobs'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Find Jobs
                  </button>
                  <button
                    onClick={() => handleNavClick('recommended')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'recommended'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>AI Matches</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('applications')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'applications'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Applications
                  </button>
                  <button
                    onClick={() => handleNavClick('profile')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'profile'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavClick('presentation')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ml-1 ${
                      activeTab === 'presentation'
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 font-semibold'
                        : 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60'
                    }`}
                    title="Jury & College Presentation Mode"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>Jury Mode</span>
                  </button>
                </>
              )}

              {userRole === 'recruiter' && (
                <>
                  <button
                    onClick={() => handleNavClick('recruiter-dashboard')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'recruiter-dashboard'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-jobs')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'recruiter-jobs'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    My Jobs
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-post')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'recruiter-post'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Post a Job</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-applicants')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'recruiter-applicants'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Applicants
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-analytics')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'recruiter-analytics'
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Analytics</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('presentation')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ml-1 ${
                      activeTab === 'presentation'
                        ? 'text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 font-semibold'
                        : 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60'
                    }`}
                    title="Jury & College Presentation Mode"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>Jury Mode</span>
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Right Action Controls: Dark Mode Toggle, Notification Center, Role Switcher & Auth */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Notification Center Component */}
            <NotificationCenter />

            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Role:</span>
                <span className="capitalize text-indigo-700 dark:text-indigo-400 font-bold">
                  {userRole === 'candidate' ? 'Candidate' : userRole === 'recruiter' ? 'Recruiter' : 'Guest'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-2.5 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Switch Active Persona (Demo)
                  </div>

                  <button
                    onClick={() => {
                      setUserRole('candidate');
                      setActiveTab('candidate-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition-colors ${
                      userRole === 'candidate' ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Candidate: {currentCandidate.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{currentCandidate.target_role}</div>
                      </div>
                    </div>
                    {userRole === 'candidate' && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>

                  <button
                    onClick={() => {
                      setUserRole('recruiter');
                      setActiveTab('recruiter-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition-colors ${
                      userRole === 'recruiter' ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Recruiter: {currentRecruiter.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{currentRecruiter.company}</div>
                      </div>
                    </div>
                    {userRole === 'recruiter' && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>

                  <button
                    onClick={() => {
                      setUserRole('guest');
                      setActiveTab('home');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition-colors ${
                      userRole === 'guest' ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">Guest Landing View</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Public presentation page</div>
                      </div>
                    </div>
                    {userRole === 'guest' && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>

                  {userRole === 'candidate' && (
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="px-2 py-1 text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase">
                        Switch Candidate Profile:
                      </div>
                      <div className="max-h-36 overflow-y-auto space-y-1">
                        {candidates.slice(0, 5).map(c => (
                          <button
                            key={c.candidate_id}
                            onClick={() => {
                              switchCandidate(c.candidate_id);
                              setRoleDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1 rounded text-xs truncate flex items-center justify-between ${
                              c.candidate_id === currentCandidate.candidate_id
                                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <span>{c.name}</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{c.target_role.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {userRole === 'guest' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login', 'candidate')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Candidate Login
                </button>
                <button
                  onClick={() => openAuthModal('login', 'recruiter')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Recruiter Login
                </button>
                <button
                  onClick={() => openAuthModal('signup', 'candidate')}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                {userRole === 'candidate' && (
                  <button
                    onClick={() => handleNavClick('candidate-dashboard')}
                    className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      src={currentCandidate.avatar}
                      alt={currentCandidate.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {currentCandidate.name.split(' ')[0]}
                    </span>
                  </button>
                )}

                {userRole === 'recruiter' && (
                  <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img
                      src={currentRecruiter.company_logo}
                      alt={currentRecruiter.company}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {currentRecruiter.company}
                    </span>
                  </div>
                )}

                <button
                  onClick={logoutUser}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center md:hidden gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <NotificationCenter />

            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="px-2 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200"
            >
              {userRole}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setUserRole('candidate');
                setActiveTab('candidate-dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg text-xs font-semibold text-center border ${
                userRole === 'candidate' ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Candidate View
            </button>
            <button
              onClick={() => {
                setUserRole('recruiter');
                setActiveTab('recruiter-dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg text-xs font-semibold text-center border ${
                userRole === 'recruiter' ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Recruiter View
            </button>
          </div>

          <div className="space-y-1">
            {userRole === 'guest' ? (
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('jobs')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Explore Jobs
                </button>
                <button
                  onClick={() => handleNavClick('presentation')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 rounded-lg flex items-center gap-2"
                >
                  <Presentation className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>College Project Jury Presentation</span>
                </button>
                <button
                  onClick={() => handleNavClick('privacy')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Privacy &amp; Ethics
                </button>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login', 'candidate');
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 rounded-lg"
                  >
                    Candidate Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login', 'recruiter');
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg"
                  >
                    Recruiter Login
                  </button>
                </div>
              </>
            ) : userRole === 'candidate' ? (
              <>
                <button
                  onClick={() => handleNavClick('candidate-dashboard')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('jobs')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Find Jobs
                </button>
                <button
                  onClick={() => handleNavClick('recommended')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  AI Recommendations
                </button>
                <button
                  onClick={() => handleNavClick('applications')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  My Applications
                </button>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  My Profile
                </button>
                <button
                  onClick={() => handleNavClick('presentation')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 rounded-lg flex items-center gap-2"
                >
                  <Presentation className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Jury Mode</span>
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('recruiter-dashboard')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Recruiter Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-jobs')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  My Posted Jobs
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-post')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Post a Job
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-applicants')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Applicant Management
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-analytics')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                >
                  Analytics &amp; Reports
                </button>
                <button
                  onClick={() => handleNavClick('presentation')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 rounded-lg flex items-center gap-2"
                >
                  <Presentation className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Jury Mode</span>
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
