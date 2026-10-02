import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
  Bookmark
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
    savedJobIds
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
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
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 bg-clip-text text-transparent">
                    CareerPulse
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded-md border border-indigo-200/60">
                    AI Match
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
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
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNavClick('jobs')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'jobs'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Explore Jobs
                  </button>
                  <button
                    onClick={() => handleNavClick('presentation')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'presentation'
                        ? 'text-purple-600 bg-purple-50 font-semibold'
                        : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/60'
                    }`}
                  >
                    <Presentation className="w-4 h-4 text-purple-600" />
                    <span>Project Demo (Jury)</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('privacy')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'privacy'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Privacy & Ethics
                  </button>
                </>
              )}

              {userRole === 'candidate' && (
                <>
                  <button
                    onClick={() => handleNavClick('candidate-dashboard')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'candidate-dashboard'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('jobs')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'jobs'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Find Jobs
                  </button>
                  <button
                    onClick={() => handleNavClick('recommended')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'recommended'
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>AI Matches</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('applications')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'applications'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Applications
                  </button>
                  <button
                    onClick={() => handleNavClick('profile')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'profile'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavClick('presentation')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ml-1 ${
                      activeTab === 'presentation'
                        ? 'text-purple-700 bg-purple-100 font-semibold'
                        : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
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
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-jobs')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'recruiter-jobs'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    My Jobs
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-post')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'recruiter-post'
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Post a Job</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-applicants')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'recruiter-applicants'
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Applicants
                  </button>
                  <button
                    onClick={() => handleNavClick('recruiter-analytics')}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'recruiter-analytics'
                        ? 'text-indigo-600 bg-indigo-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Analytics</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('presentation')}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ml-1 ${
                      activeTab === 'presentation'
                        ? 'text-purple-700 bg-purple-100 font-semibold'
                        : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
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

          {/* Right Action Controls: Role Switcher & Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Demo Role Switcher (Essential for easy college jury demonstration!) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Role:</span>
                <span className="capitalize text-indigo-700 font-bold">
                  {userRole === 'candidate' ? 'Candidate' : userRole === 'recruiter' ? 'Recruiter' : 'Guest'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-2.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Active Persona (Demo)
                  </div>

                  <button
                    onClick={() => {
                      setUserRole('candidate');
                      setActiveTab('candidate-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition-colors ${
                      userRole === 'candidate' ? 'bg-indigo-50 text-indigo-800' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold">Candidate: {currentCandidate.name}</div>
                        <div className="text-[10px] text-slate-500">{currentCandidate.target_role}</div>
                      </div>
                    </div>
                    {userRole === 'candidate' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setUserRole('recruiter');
                      setActiveTab('recruiter-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition-colors ${
                      userRole === 'recruiter' ? 'bg-indigo-50 text-indigo-800' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold">Recruiter: {currentRecruiter.name}</div>
                        <div className="text-[10px] text-slate-500">{currentRecruiter.company}</div>
                      </div>
                    </div>
                    {userRole === 'recruiter' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setUserRole('guest');
                      setActiveTab('home');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs font-medium transition-colors ${
                      userRole === 'guest' ? 'bg-indigo-50 text-indigo-800' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold">Guest Landing View</div>
                        <div className="text-[10px] text-slate-500">Public presentation page</div>
                      </div>
                    </div>
                    {userRole === 'guest' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </button>

                  {userRole === 'candidate' && (
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <div className="px-2 py-1 text-[10px] text-slate-400 font-semibold uppercase">
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
                                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span>{c.name}</span>
                            <span className="text-[10px] text-slate-400">{c.target_role.split(' ')[0]}</span>
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
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Candidate Login
                </button>
                <button
                  onClick={() => openAuthModal('login', 'recruiter')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
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
              <div className="flex items-center gap-3">
                {userRole === 'candidate' && (
                  <button
                    onClick={() => handleNavClick('candidate-dashboard')}
                    className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
                  >
                    <img
                      src={currentCandidate.avatar}
                      alt={currentCandidate.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      {currentCandidate.name.split(' ')[0]}
                    </span>
                  </button>
                )}

                {userRole === 'recruiter' && (
                  <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                    <img
                      src={currentRecruiter.company_logo}
                      alt={currentRecruiter.company}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      {currentRecruiter.company}
                    </span>
                  </div>
                )}

                <button
                  onClick={logoutUser}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="px-2 py-1 text-xs font-semibold bg-slate-100 rounded-lg text-slate-700"
            >
              {userRole}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setUserRole('candidate');
                setActiveTab('candidate-dashboard');
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-lg text-xs font-semibold text-center border ${
                userRole === 'candidate' ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-700'
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
                userRole === 'recruiter' ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-700'
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
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('jobs')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Explore Jobs
                </button>
                <button
                  onClick={() => handleNavClick('presentation')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-700 bg-purple-50 rounded-lg flex items-center gap-2"
                >
                  <Presentation className="w-4 h-4 text-purple-600" />
                  <span>College Project Jury Presentation</span>
                </button>
                <button
                  onClick={() => handleNavClick('privacy')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Privacy & Ethics
                </button>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login', 'candidate');
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg"
                  >
                    Candidate Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login', 'recruiter');
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
                  >
                    Recruiter Login
                  </button>
                </div>
              </>
            ) : userRole === 'candidate' ? (
              <>
                <button
                  onClick={() => handleNavClick('candidate-dashboard')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('jobs')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Find Jobs
                </button>
                <button
                  onClick={() => handleNavClick('recommended')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  AI Recommendations
                </button>
                <button
                  onClick={() => handleNavClick('applications')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  My Applications
                </button>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  My Profile
                </button>
                <button
                  onClick={() => handleNavClick('presentation')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-700 bg-purple-50 rounded-lg flex items-center gap-2"
                >
                  <Presentation className="w-4 h-4 text-purple-600" />
                  <span>Jury Mode</span>
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-rose-600 bg-rose-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('recruiter-dashboard')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Recruiter Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-jobs')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  My Posted Jobs
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-post')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Post a Job
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-applicants')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Applicant Management
                </button>
                <button
                  onClick={() => handleNavClick('recruiter-analytics')}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                >
                  Analytics & Reports
                </button>
                <button
                  onClick={() => handleNavClick('presentation')}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-purple-700 bg-purple-50 rounded-lg flex items-center gap-2"
                >
                  <Presentation className="w-4 h-4 text-purple-600" />
                  <span>Jury Mode</span>
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 text-center text-sm font-semibold text-rose-600 bg-rose-50 rounded-lg"
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
