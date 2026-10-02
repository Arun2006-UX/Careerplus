import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  Building2,
  Bookmark,
  Share2,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  FileCheck
} from 'lucide-react';

export const JobDetailsPage: React.FC = () => {
  const {
    selectedJobId,
    getJobById,
    currentCandidate,
    getMatchForJob,
    applyForJob,
    toggleSaveJob,
    savedJobIds,
    getApplicationsForCandidate,
    setActiveTab
  } = useApp();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [candidateNotes, setCandidateNotes] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const job = selectedJobId ? getJobById(selectedJobId) : null;
  const match = job ? getMatchForJob(job, currentCandidate) : null;
  const isSaved = job ? savedJobIds.includes(job.job_id) : false;

  const candidateApps = getApplicationsForCandidate(currentCandidate.candidate_id);
  const existingApp = job ? candidateApps.find(a => a.job_id === job.job_id) : null;

  if (!job || !match) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Job Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The selected job posting may have been closed or removed.</p>
        <button
          onClick={() => setActiveTab('jobs')}
          className="mt-4 px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const handleApply = () => {
    const res = applyForJob(job.job_id, candidateNotes);
    setFeedback(res);
    if (res.success) {
      setTimeout(() => {
        setApplyModalOpen(false);
        setFeedback(null);
      }, 1500);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation back */}
        <button
          onClick={() => setActiveTab('jobs')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Job Search</span>
        </button>

        {/* Hero Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={job.company_logo}
                alt={job.company}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shadow-sm shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {job.title}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {job.level}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {job.company} • <span className="text-slate-500 dark:text-slate-400 font-normal">{job.industry}</span>
                </p>

                {/* Attributes */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-700 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-700 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.work_type}</span>
                  </span>
                  <span className="bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold px-2.5 py-1 rounded-md border border-indigo-200/60 dark:border-indigo-800">
                    {job.salary_range}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Posted on {job.posted_at}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Save, Share, Apply */}
            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative"
                title="Share Job"
              >
                <Share2 className="w-4 h-4" />
                {copiedShare && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>

              <button
                onClick={() => toggleSaveJob(job.job_id)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save Job'}
              >
                <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
              </button>

              {existingApp ? (
                <div className="px-5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Applied ({existingApp.status})</span>
                </div>
              ) : (
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all"
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI EXPLANATION SECTION (strictly per Requirement #7) */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold tracking-wide uppercase border border-indigo-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explainable AI Engine</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Why this job matches you
                </h2>
                <p className="text-xs text-indigo-200">
                  Multi-signal evaluation comparing <strong className="text-white">{currentCandidate.name}</strong>'s vector profile against this role.
                </p>
              </div>

              {/* Big Score Gauge */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-indigo-200 font-semibold uppercase">Overall Compatibility</div>
                  <div className="text-2xl font-black text-white">{match.overallScore}%</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center font-black text-sm text-white shadow-md">
                  {match.overallScore}%
                </div>
              </div>
            </div>

            {/* Explanation Quote */}
            <div className="p-4 rounded-2xl bg-indigo-900/40 border border-indigo-700/50 text-sm leading-relaxed text-indigo-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Algorithm Summary: </span>
                {match.explanation}
              </div>
            </div>

            {/* Visual Matching Factors Progress Bars (Skills, Role, Location, Work-type, Experience) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Factor 1: Skills Match */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Skills Match</span>
                  <span className="text-emerald-400 font-extrabold">{match.skillsScore}%</span>
                </div>
                <div className="w-full bg-slate-700/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${match.skillsScore}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  {match.skillsMatched.length} of {job.skills.length} required skills matched ({match.skillsMatched.slice(0, 3).join(', ')}).
                </div>
              </div>

              {/* Factor 2: Role Match */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Role Compatibility</span>
                  <span className="text-indigo-400 font-extrabold">{match.roleScore}%</span>
                </div>
                <div className="w-full bg-slate-700/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${match.roleScore}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Target role "{currentCandidate.target_role}" aligns with "{job.title}".
                </div>
              </div>

              {/* Factor 3: Location Match */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Location Match</span>
                  <span className="text-blue-400 font-extrabold">{match.locationScore}%</span>
                </div>
                <div className="w-full bg-slate-700/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${match.locationScore}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  {job.work_type === 'Remote' ? 'Fully remote opening fulfills location preferences.' : `Office in ${job.location.split(',')[0]} matches preferred regions.`}
                </div>
              </div>

              {/* Factor 4: Work Type Match */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Work-Type Match</span>
                  <span className="text-purple-400 font-extrabold">{match.workTypeScore}%</span>
                </div>
                <div className="w-full bg-slate-700/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${match.workTypeScore}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Role is {job.work_type}; candidate accepts {currentCandidate.preferences.work_types.join(', ')}.
                </div>
              </div>

              {/* Factor 5: Experience Match */}
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2 md:col-span-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Experience Match</span>
                  <span className="text-cyan-400 font-extrabold">{match.experienceScore}%</span>
                </div>
                <div className="w-full bg-slate-700/80 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${match.experienceScore}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Candidate has {currentCandidate.total_experience_years} years total experience; role requires {job.min_experience_years}+ years.
                </div>
              </div>
            </div>

            {/* Matched vs Missing Skills breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-emerald-950/40 p-4 rounded-2xl border border-emerald-800/50">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Matched Skills ({match.skillsMatched.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {match.skillsMatched.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-900/60 text-emerald-200 text-xs font-medium border border-emerald-700/60">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-amber-950/30 p-4 rounded-2xl border border-amber-800/50">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Skills to Gain / Highlight ({match.skillsMissing.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {match.skillsMissing.length > 0 ? (
                    match.skillsMissing.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-amber-900/40 text-amber-200 text-xs font-medium border border-amber-700/50">
                        + {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-amber-200/80">You possess all required technical skills for this role!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Content: Description, Responsibilities, Requirements, Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">About the Role</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Key Responsibilities</h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-2 shrink-0"></span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Candidate Requirements</h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Benefits &amp; Perks</h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {job.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Job Overview</h4>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">Company</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.company}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">Industry</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.industry}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">Location</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.location}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">Work Format</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.work_type}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">Experience</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.min_experience_years}+ Years</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">Compensation</span>
                  <span className="font-bold text-indigo-700 dark:text-indigo-400">{job.salary_range}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400 dark:text-slate-500">Total Applicants</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.applicant_count || 12} Candidates</span>
                </div>
              </div>

              {!existingApp && (
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Apply for this position
                </button>
              )}
            </div>

            {/* Profile sync card */}
            <div className="bg-slate-100/70 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Audited Matching Data</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Matches are calculated based strictly on verified technical skills, experience tenure, and preferences. Demographic attributes are fully masked.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Apply to {job.company}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Position: {job.title}</p>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {feedback && (
              <div className={`p-3 rounded-lg text-xs font-semibold ${
                feedback.success ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}>
                {feedback.message}
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
                <div className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">Applying as: {currentCandidate.name}</div>
                <div>• Current Role: {currentCandidate.target_role}</div>
                <div>• Match Rating: {match.overallScore}%</div>
                <div>• Attached Resume: {currentCandidate.resume_name || 'Standard CareerPulse Profile CV'}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Cover Note / Message to Recruiter:
                </label>
                <textarea
                  rows={3}
                  value={candidateNotes}
                  onChange={e => setCandidateNotes(e.target.value)}
                  placeholder="Share a short note on why you're interested in this role..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setApplyModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
