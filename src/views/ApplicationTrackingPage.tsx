import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus } from '../types';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  XCircle,
  ChevronRight,
  ExternalLink,
  MapPin,
  Building2,
  Sparkles,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

export const ApplicationTrackingPage: React.FC = () => {
  const {
    currentCandidate,
    getApplicationsForCandidate,
    openJobDetails,
    setActiveTab
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const applications = getApplicationsForCandidate(currentCandidate.candidate_id);

  const filteredApps = applications.filter(app => {
    if (statusFilter !== 'All' && app.status !== statusFilter) return false;
    return true;
  });

  const stages: { label: ApplicationStatus; color: string }[] = [
    { label: 'Applied', color: 'bg-blue-500' },
    { label: 'Under Review', color: 'bg-amber-500' },
    { label: 'Interview', color: 'bg-purple-500' },
    { label: 'Offer', color: 'bg-emerald-500' }
  ];

  const getStageIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied': return 0;
      case 'Under Review': return 1;
      case 'Interview': return 2;
      case 'Offer': return 3;
      case 'Rejected': return -1;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Real-Time Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Application Tracking
            </h1>
            <p className="text-sm text-slate-500">
              Track your recruitment pipeline from submission to final offer stage.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors shrink-0"
          >
            Apply for More Roles
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
          {['All', 'Applied', 'Under Review', 'Interview', 'Offer', 'Rejected'].map(status => {
            const count = status === 'All'
              ? applications.length
              : applications.filter(a => a.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{status}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  statusFilter === status ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No applications in this category</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore open positions with high AI match scores and submit your application.
            </p>
            <button
              onClick={() => setActiveTab('jobs')}
              className="mt-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Search Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map(app => {
              const currentStageIdx = getStageIndex(app.status);
              const isRejected = app.status === 'Rejected';
              const isExpanded = selectedAppId === app.application_id;

              return (
                <div
                  key={app.application_id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-5"
                >
                  {/* Top Row: Job Title, Company, Applied Date, Status */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={app.job.company_logo}
                        alt={app.job.company}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2
                            onClick={() => openJobDetails(app.job_id)}
                            className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                          >
                            {app.job.title}
                          </h2>
                          <span className="px-2 py-0.5 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {app.match.overallScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {app.job.company} • {app.job.location} • {app.job.work_type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right text-xs">
                        <div className="text-slate-400">Applied on</div>
                        <div className="font-semibold text-slate-700">{app.applied_at.split('T')[0]}</div>
                      </div>

                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                          app.status === 'Offer'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'Interview'
                            ? 'bg-purple-100 text-purple-800'
                            : app.status === 'Under Review'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {app.status === 'Offer' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {app.status === 'Rejected' && <XCircle className="w-4 h-4 text-rose-600" />}
                        <span>{app.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* VISUAL PIPELINE (Applied -> Under Review -> Interview -> Offer) */}
                  <div className="py-2 px-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="relative flex items-center justify-between">
                      {/* Line connector */}
                      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0"></div>

                      {stages.map((stg, idx) => {
                        const isCompleted = !isRejected && currentStageIdx >= idx;
                        const isCurrent = !isRejected && currentStageIdx === idx;

                        return (
                          <div key={stg.label} className="relative z-10 flex flex-col items-center">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                                isCompleted
                                  ? 'bg-indigo-600 text-white'
                                  : isCurrent
                                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                                  : 'bg-white text-slate-400 border-2 border-slate-300'
                              }`}
                            >
                              {isCompleted ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[11px] font-semibold mt-1.5 ${
                              isCurrent ? 'text-indigo-700 font-extrabold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                            }`}>
                              {stg.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {isRejected && (
                      <div className="mt-3 p-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 text-center font-medium">
                        This application has concluded. Profile is retained in candidate pool for future opportunities.
                      </div>
                    )}
                  </div>

                  {/* Latest recruiter update note & toggle timeline */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-1">
                    <div className="text-slate-600">
                      <span className="font-semibold text-slate-800">Latest Update: </span>
                      <span>
                        {app.timeline[app.timeline.length - 1]?.comment || 'Application undergoing recruiter review.'}
                      </span>
                      <span className="text-slate-400 ml-1">
                        (Updated {app.updated_at.split('T')[0]})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedAppId(isExpanded ? null : app.application_id)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Hide Timeline' : 'View Full History'}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                      <button
                        onClick={() => openJobDetails(app.job_id)}
                        className="px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
                      >
                        View Job
                      </button>
                    </div>
                  </div>

                  {/* Expanded Audit Timeline */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Application Progression Audit Log
                      </div>
                      <div className="space-y-3">
                        {app.timeline.map((event, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-xs">
                            <div className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0"></div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">{event.status}</span>
                                <span className="text-[11px] text-slate-400">• {event.date}</span>
                              </div>
                              <p className="text-slate-600 leading-relaxed">{event.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
