import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, Candidate } from '../types';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  BarChart3,
  ExternalLink,
  Search,
  Filter,
  Eye,
  Check,
  X,
  MapPin,
  Clock,
  ArrowUpRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const {
    currentRecruiter,
    jobs,
    getApplicationsForRecruiter,
    updateApplicationStatus,
    openJobDetails,
    setActiveTab,
    setSelectedApplicantId
  } = useApp();

  const [selectedCandidatePreview, setSelectedCandidatePreview] = useState<Candidate | null>(null);
  const [statusChangeFeedback, setStatusChangeFeedback] = useState<string | null>(null);

  const recruiterApps = getApplicationsForRecruiter();

  // Metrics
  const activeJobsCount = jobs.filter(j => j.status === 'active').length;
  const totalApplicantsCount = recruiterApps.length;
  const interviewCount = recruiterApps.filter(a => a.status === 'Interview').length;
  const offerCount = recruiterApps.filter(a => a.status === 'Offer').length;

  const handleStatusUpdate = (appId: string, newStatus: ApplicationStatus, candName: string) => {
    updateApplicationStatus(appId, newStatus);
    setStatusChangeFeedback(`Updated ${candName}'s application status to "${newStatus}".`);
    setTimeout(() => setStatusChangeFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Recruiter Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200/60 dark:border-blue-800/60">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Hiring Management Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome back, {currentRecruiter.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
              Recruiter at <strong className="text-slate-800 dark:text-slate-200">{currentRecruiter.company}</strong> ({currentRecruiter.industry}). Manage openings, review applicants ranked by AI match score, and update pipeline stages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('recruiter-post')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a New Job</span>
            </button>

            <button
              onClick={() => setActiveTab('recruiter-analytics')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Analytics</span>
            </button>
          </div>
        </div>

        {/* Status update alert banner */}
        {statusChangeFeedback && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{statusChangeFeedback}</span>
            </div>
            <button onClick={() => setStatusChangeFeedback(null)} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 font-bold">
              ✕
            </button>
          </div>
        )}

        {/* Dashboard 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Active Jobs */}
          <div
            onClick={() => setActiveTab('recruiter-jobs')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Active Jobs
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{activeJobsCount}</div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
              <span>View all openings</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </div>
          </div>

          {/* Total Applicants */}
          <div
            onClick={() => setActiveTab('recruiter-applicants')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Applicants
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{totalApplicantsCount}</div>
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
              <span>Ranked by AI match</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </div>
          </div>

          {/* Interviews */}
          <div
            onClick={() => setActiveTab('recruiter-applicants')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 shadow-xs hover:shadow-md transition-all cursor-pointer group"
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
              <span>Shortlisted candidates</span>
            </div>
          </div>

          {/* Offers */}
          <div
            onClick={() => setActiveTab('recruiter-applicants')}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-xs hover:shadow-md transition-all cursor-pointer group"
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
              <span>Extended & pending</span>
            </div>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Applications</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI-Ranked
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Candidates matched against posted job descriptions using TF-IDF cosine similarity.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('recruiter-applicants')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              Manage All Applicants &rarr;
            </button>
          </div>

          {recruiterApps.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs">
              No applications submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4">Candidate</th>
                    <th className="pb-3 px-4">Applied Role</th>
                    <th className="pb-3 px-4">Match %</th>
                    <th className="pb-3 px-4">Experience</th>
                    <th className="pb-3 px-4">Top Skills</th>
                    <th className="pb-3 px-4">Status</th>
                    <th className="pb-3 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recruiterApps.slice(0, 8).map(app => (
                    <tr key={app.application_id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      {/* Candidate */}
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={app.candidate.avatar}
                            alt={app.candidate.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                          />
                          <div>
                            <div
                              onClick={() => setSelectedCandidatePreview(app.candidate)}
                              className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                            >
                              {app.candidate.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">{app.candidate.location.split(',')[0]}</div>
                          </div>
                        </div>
                      </td>

                      {/* Applied Role */}
                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {app.job.title}
                      </td>

                      {/* Match % */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-black inline-flex items-center gap-1 ${
                            app.match.overallScore >= 85
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : app.match.overallScore >= 70
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{app.match.overallScore}%</span>
                        </span>
                      </td>

                      {/* Experience */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                        {app.candidate.total_experience_years} Years
                      </td>

                      {/* Skills */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {app.candidate.skills.slice(0, 3).map(skill => (
                            <span
                              key={skill}
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            >
                              {skill}
                            </span>
                          ))}
                          {app.candidate.skills.length > 3 && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              +{app.candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status Selector Dropdown (Immediate update!) */}
                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={e => handleStatusUpdate(app.application_id, e.target.value as ApplicationStatus, app.candidate.name)}
                          className={`py-1 px-2.5 rounded-lg text-xs font-bold border focus:outline-hidden cursor-pointer ${
                            app.status === 'Offer'
                              ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : app.status === 'Interview'
                              ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                              : app.status === 'Under Review'
                              ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                              : app.status === 'Rejected'
                              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                              : 'bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                          }`}
                        >
                          <option value="Applied" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Applied</option>
                          <option value="Under Review" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Under Review</option>
                          <option value="Interview" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Interview</option>
                          <option value="Offer" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Offer</option>
                          <option value="Rejected" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Rejected</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 pl-4 text-right">
                        <button
                          onClick={() => setSelectedCandidatePreview(app.candidate)}
                          className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Drawer / Modal */}
      {selectedCandidatePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCandidatePreview.avatar}
                  alt={selectedCandidatePreview.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCandidatePreview.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{selectedCandidatePreview.target_role}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedCandidatePreview.location} • {selectedCandidatePreview.email}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidatePreview(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Candidate Bio */}
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Career Summary</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {selectedCandidatePreview.career_objective}
              </p>
            </div>

            {/* Skills */}
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Technical Skills</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidatePreview.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/60">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Experience</div>
              <div className="space-y-2">
                {selectedCandidatePreview.experience.map(e => (
                  <div key={e.id} className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white">{e.title} at {e.company}</div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium">{e.duration}</div>
                    <p className="text-slate-600 dark:text-slate-300 pt-1">{e.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume File info */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Resume Document:</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{selectedCandidatePreview.resume_name || 'Candidate_Profile.pdf'}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCandidatePreview(null)}
                className="px-5 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
