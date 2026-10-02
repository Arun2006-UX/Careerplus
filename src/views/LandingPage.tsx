import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Briefcase,
  Search,
  CheckCircle2,
  TrendingUp,
  Sliders,
  Shield,
  FileText,
  MapPin,
  Clock,
  Building2,
  ExternalLink,
  ChevronRight,
  Award,
  Layers,
  BarChart2,
  Zap,
  Cpu
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    jobs,
    getMatchForJob,
    currentCandidate,
    openJobDetails,
    openAuthModal,
    setActiveTab,
    setUserRole
  } = useApp();

  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);

  // Top featured jobs (displaying first 4)
  const featuredJobs = jobs.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wide uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Gen TF-IDF NLP Matching</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Find the Right Opportunity.{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Faster.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                CareerPulse uses intelligent job matching to connect your skills, experience and preferences with opportunities that fit you.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => openAuthModal('signup', 'candidate')}
                  className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all flex items-center gap-2 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Explore Jobs</span>
                </button>
              </div>

              {/* Fast Login Shortcuts for Demo Presentation */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-600">
                <span className="font-semibold text-slate-400">Quick Access:</span>
                <button
                  onClick={() => {
                    setUserRole('candidate');
                    setActiveTab('candidate-dashboard');
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Candidate Login</span>
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={() => {
                    setUserRole('recruiter');
                    setActiveTab('recruiter-dashboard');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-bold hover:underline flex items-center gap-1"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Recruiter Login</span>
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={() => setActiveTab('presentation')}
                  className="text-purple-600 hover:text-purple-800 font-bold hover:underline flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Jury Mode</span>
                </button>
              </div>
            </div>

            {/* Right: Visual Representation of the AI Matching System (Animated Pipeline) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-mono text-slate-400 ml-2">ai_matching_engine.py</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                    Live Vector Space
                  </span>
                </div>

                {/* Animated Pipeline Diagram as specified */}
                <div className="space-y-3 font-mono text-xs">
                  {/* Step 1: Candidate Profile */}
                  <div
                    onClick={() => setActivePipelineStep(1)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      activePipelineStep === 1
                        ? 'bg-slate-800/90 border-indigo-500 shadow-md shadow-indigo-500/10'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">1</span>
                        <span>Candidate Profile</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans">Aarav S. • Full Stack</span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-300 font-sans flex flex-wrap gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200">React</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200">TypeScript</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200">Node.js</span>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-900/60 text-indigo-300">Pref: Remote</span>
                    </div>
                  </div>

                  {/* Flow Arrow 1 */}
                  <div className="flex items-center justify-center text-indigo-400 py-0.5">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-500">TF-IDF Vectorization</span>
                      <div className="w-0.5 h-3 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                      <ChevronRight className="w-3.5 h-3.5 rotate-90 -mt-1 text-purple-400" />
                    </div>
                  </div>

                  {/* Step 2: AI Matching Engine */}
                  <div
                    onClick={() => setActivePipelineStep(2)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      activePipelineStep === 2
                        ? 'bg-slate-800/90 border-purple-500 shadow-md shadow-purple-500/10'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-400 font-bold">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">2</span>
                        <span>AI Matching Engine</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Cosine Sim: 0.884</span>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 font-mono">
                      score = (0.35 * skills) + (0.25 * tfidf) + (0.15 * role) + (0.10 * loc) + (0.10 * type)
                    </div>
                  </div>

                  {/* Flow Arrow 2 */}
                  <div className="flex items-center justify-center text-purple-400 py-0.5">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-500">Corpus Query</span>
                      <div className="w-0.5 h-3 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                      <ChevronRight className="w-3.5 h-3.5 rotate-90 -mt-1 text-blue-400" />
                    </div>
                  </div>

                  {/* Step 3: Job Opportunities */}
                  <div
                    onClick={() => setActivePipelineStep(3)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      activePipelineStep === 3
                        ? 'bg-slate-800/90 border-blue-500 shadow-md shadow-blue-500/10'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-400 font-bold">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px]">3</span>
                        <span>Job Opportunities Dataset</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans">{jobs.length} Active Postings</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-300 font-sans">
                      Scanned across SaaS, FinTech, AI, &amp; Cloud categories
                    </div>
                  </div>

                  {/* Flow Arrow 3 */}
                  <div className="flex items-center justify-center text-blue-400 py-0.5">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-slate-500">Ranked Ranking Layer</span>
                      <div className="w-0.5 h-3 bg-gradient-to-b from-blue-500 to-emerald-500"></div>
                      <ChevronRight className="w-3.5 h-3.5 rotate-90 -mt-1 text-emerald-400" />
                    </div>
                  </div>

                  {/* Step 4: Personalized Recommendations */}
                  <div
                    onClick={() => setActivePipelineStep(4)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      activePipelineStep === 4
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">4</span>
                        <span>Personalized Recommendations</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                        94% Match
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-300 font-sans leading-tight">
                      "Strong match based on React, TypeScript, Node.js and your preferred remote work type."
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>DS Project Report Architecture</span>
                  <button
                    onClick={() => setActiveTab('presentation')}
                    className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    <span>Inspect Algorithm</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How CareerPulse Works */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Simple 4-Step Workflow
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How CareerPulse Works
            </p>
            <p className="text-slate-600 text-base">
              A transparent, algorithm-driven journey from profile creation to offer acceptance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all group relative">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Create Your Profile</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add skills, experience, education, preferred locations, and target roles or upload your resume for automatic parsing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all group relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Discover Relevant Jobs</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore curated tech opportunities filtered by domain, work format, experience band, and technology stacks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all group relative">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Get AI-Powered Matches</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our TF-IDF vectorizer and multi-signal engine ranks each posting with an explainable compatibility percentage.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all group relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Apply &amp; Track Progress</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Submit applications with 1-click and watch your status advance from Applied to Under Review, Interview, and Offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why CareerPulse */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Core Architectural Pillars
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why CareerPulse
            </p>
            <p className="text-slate-600 text-base">
              Engineered to replace opaque resume black-holes with transparent, explainable matching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Intelligent Job Matching</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Transforms unstructured resumes and job specifications into high-dimensional TF-IDF vectors for cosine similarity computation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Personalized Recommendations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dynamically tailors suggested job feeds based on your verified skillset, career objectives, and location preferences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Smart Job Search</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Multi-faceted filtering across salary, remote/hybrid formats, technology stacks, and experience levels with instant sorting.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Application Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Visual Kanban-style pipeline tracking every stage: Applied &rarr; Under Review &rarr; Interview &rarr; Offer with audit timestamps.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Recruiter Management</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Empowers recruiters to publish positions, evaluate incoming talent ranked by match percentage, and update stages seamlessly.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Explainable Recommendations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No black-box mystery. Candidates and hiring teams see explicit breakdowns of skills overlap, role alignment, and experience fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured / Trending Jobs */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
                Live Openings
              </h2>
              <p className="text-3xl font-black text-slate-900 tracking-tight">
                Featured &amp; Trending Jobs
              </p>
              <p className="text-slate-600 text-sm mt-1">
                Matched against demo candidate profile ({currentCandidate.name})
              </p>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>View all {jobs.length} jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map(job => {
              const match = getMatchForJob(job, currentCandidate);
              return (
                <div
                  key={job.job_id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Logo, Company & Match Badge */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.company_logo}
                          alt={job.company}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-2xs"
                        />
                        <div>
                          <h4 className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer" onClick={() => openJobDetails(job.job_id)}>
                            {job.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">{job.company} • {job.industry}</p>
                        </div>
                      </div>

                      {/* Match Score Badge */}
                      <div className="flex flex-col items-end">
                        <div className={`px-2.5 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                          match.overallScore >= 85
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : match.overallScore >= 70
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Sparkles className="w-3 h-3" />
                          <span>{match.overallScore}% Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 my-3">
                      <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.work_type}</span>
                      </span>
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-semibold">
                        {job.salary_range}
                      </span>
                    </div>

                    {/* Explainable match reason preview */}
                    <div className="p-2.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 mb-4">
                      <span className="font-semibold text-indigo-700">Why it matches: </span>
                      {match.explanation}
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skills.slice(0, 4).map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-500">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Posted on {job.posted_at}
                    </span>
                    <button
                      onClick={() => openJobDetails(job.job_id)}
                      className="px-4 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. For Candidates & For Recruiters Value Sections */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* For Candidates Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>For Job Seekers &amp; Candidates</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Stop applying blindly. Get matched intelligently.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  CareerPulse analyzes your full technical breadth—including past project frameworks, education, and career aspirations—to recommend roles where you stand the highest probability of interview conversion.
                </p>

                <ul className="space-y-2.5 pt-2 text-sm text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant explainable compatibility scores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time status updates from recruiters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Smart resume parsing &amp; skill gap insights</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setUserRole('candidate');
                    setActiveTab('candidate-dashboard');
                  }}
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <span>Explore as Candidate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* For Recruiters Card */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>For Hiring Teams &amp; Recruiters</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Smarter talent screening with zero guesswork.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Filter through hundreds of applicants instantly with mathematical TF-IDF relevance ranking. Manage hiring pipelines from one unified dashboard with auditable status changes.
                </p>

                <ul className="space-y-2.5 pt-2 text-sm text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Rank candidates by multi-signal suitability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Publish &amp; manage job specifications with ease</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Track funnel conversion analytics and candidate flow</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setUserRole('recruiter');
                    setActiveTab('recruiter-dashboard');
                  }}
                  className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <span>Explore as Recruiter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Jury / College Presentation Quick Callout */}
      <section className="py-12 bg-purple-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-800/80 border border-purple-600/50 flex items-center justify-center text-purple-200 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">College Project Jury &amp; Presentation Mode</h4>
              <p className="text-xs text-purple-200 max-w-xl">
                Inspect the system architecture, TF-IDF vector breakdown, mathematical cosine similarities, and the roadmap distinguishing our working prototype from the proposed ML microservice.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('presentation')}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/30 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Launch Presentation View</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
