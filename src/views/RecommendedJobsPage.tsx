import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  MapPin,
  Clock,
  Briefcase,
  Bookmark,
  CheckCircle2,
  Sliders,
  ChevronRight,
  TrendingUp,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const RecommendedJobsPage: React.FC = () => {
  const {
    currentCandidate,
    getRecommendedJobs,
    openJobDetails,
    toggleSaveJob,
    savedJobIds,
    applyForJob,
    getApplicationsForCandidate,
    setActiveTab
  } = useApp();

  const [minMatchThreshold, setMinMatchThreshold] = useState<number>(60);
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  const allRecommended = getRecommendedJobs(currentCandidate);
  const candidateApps = getApplicationsForCandidate(currentCandidate.candidate_id);

  const filteredRecommended = allRecommended.filter(job => {
    if (job.match.overallScore < minMatchThreshold) return false;
    if (selectedFormat !== 'All' && job.work_type !== selectedFormat) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized AI Feed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              AI Recommended Jobs for {currentCandidate.name}
            </h1>
            <p className="text-sm text-slate-500">
              Ranked dynamically by TF-IDF term vector overlap, skill proficiency match, and work format compatibility.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('presentation')}
            className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Inspect TF-IDF Math</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Threshold Slider */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Minimum AI Match:</span>
              <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {minMatchThreshold}%
              </span>
              <input
                type="range"
                min={40}
                max={95}
                step={5}
                value={minMatchThreshold}
                onChange={e => setMinMatchThreshold(Number(e.target.value))}
                className="w-28 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Work Format */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Format:</span>
              <select
                value={selectedFormat}
                onChange={e => setSelectedFormat(e.target.value)}
                className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
              >
                <option value="All">All Formats</option>
                <option value="Remote">Remote Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <span className="text-slate-400">
            Found <strong className="text-slate-800">{filteredRecommended.length}</strong> matching roles
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommended.map(job => {
            const isSaved = savedJobIds.includes(job.job_id);
            const alreadyApplied = candidateApps.some(a => a.job_id === job.job_id);

            return (
              <div
                key={job.job_id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.company_logo}
                        alt={job.company}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100"
                      />
                      <div>
                        <h3
                          onClick={() => openJobDetails(job.job_id)}
                          className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer text-sm line-clamp-1"
                        >
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{job.company}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.job_id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Match Meter */}
                  <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-black">
                      <div className="flex items-center gap-1.5 text-indigo-900">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>AI Match: {job.match.overallScore}%</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 uppercase">
                        Skills: {job.match.skillsScore}%
                      </span>
                    </div>
                    <div className="w-full bg-indigo-200/70 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${job.match.overallScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Explainable match reason (Requirement #5) */}
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    <span className="font-bold text-slate-800">Why this matches: </span>
                    {job.match.explanation}
                  </div>

                  {/* Location & Format */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{job.location.split(',')[0]}</span>
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
                      {job.work_type}
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">
                      {job.salary_range}
                    </span>
                  </div>

                  {/* Required skills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.skills.slice(0, 4).map(skill => {
                      const matched = job.match.skillsMatched.includes(skill);
                      return (
                        <span
                          key={skill}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            matched ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {matched && '✓ '}{skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openJobDetails(job.job_id)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl"
                  >
                    View Details
                  </button>

                  {alreadyApplied ? (
                    <span className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Applied</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => openJobDetails(job.job_id)}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
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
    </div>
  );
};
