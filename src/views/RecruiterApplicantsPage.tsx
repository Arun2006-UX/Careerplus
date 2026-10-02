import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, Candidate } from '../types';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  XCircle,
  Eye,
  Building2,
  Briefcase,
  ChevronDown
} from 'lucide-react';

export const RecruiterApplicantsPage: React.FC = () => {
  const {
    jobs,
    getApplicationsForRecruiter,
    updateApplicationStatus,
    openJobDetails
  } = useApp();

  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [candidateSearch, setCandidateSearch] = useState<string>('');
  const [selectedCandidateModal, setSelectedCandidateModal] = useState<Candidate | null>(null);

  const recruiterApps = getApplicationsForRecruiter();

  const filteredApps = useMemo(() => {
    return recruiterApps.filter(app => {
      if (selectedJobFilter !== 'All' && app.job_id !== selectedJobFilter) return false;
      if (selectedStatusFilter !== 'All' && app.status !== selectedStatusFilter) return false;
      if (candidateSearch.trim()) {
        const q = candidateSearch.toLowerCase().trim();
        const matchName = app.candidate.name.toLowerCase().includes(q);
        const matchSkills = app.candidate.skills.some(s => s.toLowerCase().includes(q));
        const matchTitle = app.job.title.toLowerCase().includes(q);
        if (!matchName && !matchSkills && !matchTitle) return false;
      }
      return true;
    }).sort((a, b) => b.match.overallScore - a.match.overallScore);
  }, [recruiterApps, selectedJobFilter, selectedStatusFilter, candidateSearch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Talent Pipeline & Review</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Applicant Management
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Review candidates ranked by explainable AI match percentage and update stage statuses.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search candidate or skill */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={candidateSearch}
                onChange={e => setCandidateSearch(e.target.value)}
                placeholder="Search candidate name, technical skills (e.g. React, PyTorch)..."
                className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filter by Job */}
            <div className="sm:col-span-3">
              <select
                value={selectedJobFilter}
                onChange={e => setSelectedJobFilter(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-xl font-medium text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer truncate"
              >
                <option value="All" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Jobs ({jobs.length})</option>
                {jobs.map(j => (
                  <option key={j.job_id} value={j.job_id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{j.title}</option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="sm:col-span-3">
              <select
                value={selectedStatusFilter}
                onChange={e => setSelectedStatusFilter(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 rounded-xl font-medium text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
              >
                <option value="All" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Pipeline Stages</option>
                <option value="Applied" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Applied</option>
                <option value="Under Review" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Under Review</option>
                <option value="Interview" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Interview</option>
                <option value="Offer" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Offer</option>
                <option value="Rejected" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredApps.length}</strong> applicants
          </span>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-800/50">
            Ranked highest to lowest by Multi-Factor TF-IDF Match
          </span>
        </div>

        {/* Applicants Cards / Table */}
        {filteredApps.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No applicants match criteria</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try resetting filters or exploring other jobs in your posting catalogue.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredApps.map(app => (
              <div
                key={app.application_id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Candidate Information */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={app.candidate.avatar}
                    alt={app.candidate.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        onClick={() => setSelectedCandidateModal(app.candidate)}
                        className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                      >
                        {app.candidate.name}
                      </h3>

                      {/* AI Match Score Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-black inline-flex items-center gap-1 ${
                          app.match.overallScore >= 85
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : app.match.overallScore >= 70
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{app.match.overallScore}% AI Match</span>
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Applied for <strong className="text-slate-800 dark:text-slate-200">{app.job.title}</strong>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{app.candidate.location}</span>
                      </span>
                      <span>•</span>
                      <span>{app.candidate.total_experience_years} Years Exp</span>
                      <span>•</span>
                      <span>Applied: {app.applied_at.split('T')[0]}</span>
                    </div>

                    {/* Explainable match reason preview */}
                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 max-w-2xl leading-relaxed">
                      <span className="font-bold text-indigo-700 dark:text-indigo-400">Matching Signals: </span>
                      {app.match.explanation}
                    </div>

                    {/* Candidate Skills badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {app.candidate.skills.slice(0, 5).map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {app.candidate.skills.length > 5 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800">
                          +{app.candidate.skills.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Update & Actions */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="space-y-1 text-right">
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                      Update Stage Status
                    </div>
                    <select
                      value={app.status}
                      onChange={e => updateApplicationStatus(app.application_id, e.target.value as ApplicationStatus)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-bold border focus:outline-hidden cursor-pointer ${
                        app.status === 'Offer'
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : app.status === 'Interview'
                          ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                          : app.status === 'Under Review'
                          ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                          : app.status === 'Rejected'
                          ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                          : 'bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                      }`}
                    >
                      <option value="Applied" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Applied</option>
                      <option value="Under Review" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Under Review</option>
                      <option value="Interview" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Interview</option>
                      <option value="Offer" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Offer</option>
                      <option value="Rejected" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Rejected</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCandidateModal(app.candidate)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Profile</span>
                    </button>
                    <button
                      onClick={() => openJobDetails(app.job_id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250"
                    >
                      Job Spec
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Candidate Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedCandidateModal.avatar}
                  alt={selectedCandidateModal.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedCandidateModal.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{selectedCandidateModal.target_role}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedCandidateModal.location} • {selectedCandidateModal.email}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Career Objective</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {selectedCandidateModal.career_objective}
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Technical Skills</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidateModal.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/60">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Experience</div>
              <div className="space-y-2">
                {selectedCandidateModal.experience.map(e => (
                  <div key={e.id} className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="font-bold text-slate-900 dark:text-white">{e.title} at {e.company}</div>
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium">{e.duration}</div>
                    <p className="text-slate-600 dark:text-slate-300 pt-1">{e.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCandidateModal(null)}
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
