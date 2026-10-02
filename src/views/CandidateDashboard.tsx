import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Briefcase,
  FileText,
  Clock,
  CheckCircle2,
  Bookmark,
  MapPin,
  ChevronRight,
  TrendingUp,
  Search,
  User,
  Sliders,
  AlertCircle,
  ExternalLink,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const CandidateDashboard: React.FC = () => {
  const {
    currentCandidate,
    getRecommendedJobs,
    getApplicationsForCandidate,
    openJobDetails,
    applyForJob,
    toggleSaveJob,
    savedJobIds,
    setActiveTab,
    jobs
  } = useApp();

  const [applyModalJobId, setApplyModalJobId] = useState<string | null>(null);
  const [applyCustomNote, setApplyCustomNote] = useState<string>('');
  const [applyFeedback, setApplyFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const recommendedJobs = getRecommendedJobs(currentCandidate).slice(0, 6);
  const candidateApps = getApplicationsForCandidate(currentCandidate.candidate_id);

  // Status counters
  const totalApps = candidateApps.length;
  const underReviewCount = candidateApps.filter(a => a.status === 'Under Review').length;
  const interviewCount = candidateApps.filter(a => a.status === 'Interview').length;
  const offerCount = candidateApps.filter(a => a.status === 'Offer').length;

  const handleQuickApply = (jobId: string) => {
    setApplyModalJobId(jobId);
    setApplyCustomNote(`I am excited to apply for this position matching my skills in ${currentCandidate.skills.slice(0, 4).join(', ')}.`);
    setApplyFeedback(null);
  };

  const confirmApply = () => {
    if (!applyModalJobId) return;
    const res = applyForJob(applyModalJobId, applyCustomNote);
    setApplyFeedback(res);
    if (res.success) {
      setTimeout(() => {
        setApplyModalJobId(null);
        setApplyFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Greeting Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-50 dark:from-indigo-950/30 to-transparent pointer-events-none"></div>

          <div className="space-y-2 relative">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200/60 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Candidate Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Good morning, {currentCandidate.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
              Here is your AI matching overview. Based on your profile as a <strong className="text-slate-800 dark:text-slate-200">{currentCandidate.target_role}</strong>, we've identified high-compatibility openings.
            </p>
          </div>

          {/* Profile Completion widget */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-72 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-700 dark:text-slate-200">Profile Strength</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{currentCandidate.profile_completion}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentCandidate.profile_completion}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{currentCandidate.resume_name ? 'Resume Attached' : 'Missing resume'}</span>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                Improve Profile &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Applications */}
          <div
            onClick={() => setActiveTab('applications')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Applications
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{totalApps}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span>View all submitted</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </div>
          </div>

          {/* Under Review */}
          <div
            onClick={() => setActiveTab('applications')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Under Review
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{underReviewCount}</div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
              <span>Shortlisted by hiring teams</span>
            </div>
          </div>

          {/* Interviews */}
          <div
            onClick={() => setActiveTab('applications')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Interviews
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{interviewCount}</div>
            <div className="text-xs text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
              <span>Rounds scheduled</span>
            </div>
          </div>

          {/* Offers */}
          <div
            onClick={() => setActiveTab('applications')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Offers
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{offerCount}</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span>Extended to you</span>
            </div>
          </div>
        </div>

        {/* Section: AI Recommended Jobs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  AI Recommended Jobs
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  TF-IDF + Multi-Signal
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Calculated using natural language cosine similarity and skill vector overlap
              </p>
            </div>

            <button
              onClick={() => setActiveTab('recommended')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View all AI recommendations</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recommended Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map(job => {
              const isSaved = savedJobIds.includes(job.job_id);
              const alreadyApplied = candidateApps.some(a => a.job_id === job.job_id);

              return (
                <div
                  key={job.job_id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Logo, Match Score, Save button */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.company_logo}
                          alt={job.company}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                        />
                        <div>
                          <h3
                            onClick={() => openJobDetails(job.job_id)}
                            className="text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer line-clamp-1"
                          >
                            {job.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{job.company}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job.job_id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Job'}
                      >
                        <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* AI Match % Badge */}
                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-xs font-black text-indigo-900 dark:text-indigo-200">
                          AI Match: {job.match.overallScore}%
                        </span>
                      </div>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                        {job.match.overallScore >= 88 ? 'Excellent' : 'Strong'}
                      </span>
                    </div>

                    {/* Explainable Why This Matches Text (strictly as requested in specification) */}
                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 mb-3 leading-relaxed">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">Why this matches: </span>
                      {job.match.explanation}
                    </div>

                    {/* Location, Work type, Experience */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{job.location.split(',')[0]}</span>
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium text-slate-700 dark:text-slate-300">
                        {job.work_type}
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium text-slate-700 dark:text-slate-300">
                        {job.level}
                      </span>
                    </div>

                    {/* Required Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.skills.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions: View Job & Apply */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openJobDetails(job.job_id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      View Job
                    </button>

                    {alreadyApplied ? (
                      <span className="px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleQuickApply(job.job_id)}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Recent Applications Snapshot */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Active Applications</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track candidate status progression in real-time</p>
            </div>
            <button
              onClick={() => setActiveTab('applications')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              Full Application Pipeline &rarr;
            </button>
          </div>

          {candidateApps.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
              No applications submitted yet. Explore recommended jobs above and click Apply!
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {candidateApps.slice(0, 3).map(app => (
                <div key={app.application_id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={app.job.company_logo}
                      alt={app.job.company}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                    />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{app.job.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{app.job.company} • Applied {app.applied_at.split('T')[0]}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      app.status === 'Offer'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : app.status === 'Interview'
                        ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                        : app.status === 'Under Review'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        : app.status === 'Rejected'
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                    }`}>
                      {app.status}
                    </span>

                    <button
                      onClick={() => openJobDetails(app.job_id)}
                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Apply Confirmation Modal */}
      {applyModalJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Job Application</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Applying as <strong className="text-slate-800 dark:text-slate-200">{currentCandidate.name}</strong>
                </p>
              </div>
              <button
                onClick={() => setApplyModalJobId(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {applyFeedback && (
              <div className={`p-3 rounded-lg text-xs font-semibold ${
                applyFeedback.success ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}>
                {applyFeedback.message}
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Attached Profile Information:</div>
                <div>• Verified Skills: {currentCandidate.skills.slice(0, 6).join(', ')}</div>
                <div>• Resume: {currentCandidate.resume_name || 'Generated CareerPulse Candidate Portfolio'}</div>
                <div>• Work Preference: {currentCandidate.preferences.work_types.join(', ')}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Candidate Note / Cover Note to Recruiter:
                </label>
                <textarea
                  rows={3}
                  value={applyCustomNote}
                  onChange={e => setApplyCustomNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setApplyModalJobId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmApply}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
