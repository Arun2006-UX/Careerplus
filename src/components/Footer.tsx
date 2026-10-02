import React from 'react';
import { Sparkles, Shield, Cpu, ExternalLink, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setUserRole } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Project Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                CareerPulse
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium">
              AI-Driven Job Application Matching &amp; Recommendation System
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An intelligent, transparent recruitment engine bridging candidates and recruiters through explainable multi-signal NLP matching (TF-IDF + Cosine Similarity) and real-time application pipelines.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-700/50 text-[11px] font-semibold text-indigo-300">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                NLP Engine: TF-IDF + Cosine Sim
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/50 text-[11px] font-semibold text-emerald-300">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Explainable AI
              </span>
            </div>
          </div>

          {/* Links for Candidates */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Candidates
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setUserRole('candidate');
                    setActiveTab('candidate-dashboard');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Candidate Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('candidate');
                    setActiveTab('recommended');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Recommended Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="hover:text-white transition-colors text-left"
                >
                  Search &amp; Filter Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('candidate');
                    setActiveTab('applications');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Application Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('candidate');
                    setActiveTab('profile');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Profile &amp; Resume Parser
                </button>
              </li>
            </ul>
          </div>

          {/* Links for Recruiters */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Recruiters
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setUserRole('recruiter');
                    setActiveTab('recruiter-dashboard');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Recruiter Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('recruiter');
                    setActiveTab('recruiter-jobs');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Job Postings Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('recruiter');
                    setActiveTab('recruiter-post');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Post a New Job
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('recruiter');
                    setActiveTab('recruiter-applicants');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Applicant Review &amp; Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setUserRole('recruiter');
                    setActiveTab('recruiter-analytics');
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Recruiter Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* About & Jury Presentation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Project &amp; Compliance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('presentation')}
                  className="text-purple-300 font-semibold hover:text-purple-200 transition-colors flex items-center gap-1.5"
                >
                  <span>Project Demo (Jury Mode)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy, Security &amp; Bias Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('presentation')}
                  className="hover:text-white transition-colors text-left"
                >
                  System Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  How CareerPulse Works
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 CareerPulse. AI-Driven Job Application Matching &amp; Recommendation System.
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Authoritative Academic Demonstration Platform</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
