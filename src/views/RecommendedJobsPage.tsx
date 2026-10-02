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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized AI Feed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              AI Recommended Jobs for {currentCandidate.name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ranked dynamically by TF-IDF term vector overlap, skill proficiency match, and work format compatibility.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('presentation')}
            className="px-4 py-2 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-xs rounded-xl border border-purple-200 dark:border-purple-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Inspect TF-IDF Math</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Threshold Slider */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Minimum AI Match:</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
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
              <span className="font-semibold text-slate-700 dark:text-slate-300">Format:</span>
              <select
                value={selectedFormat}
                onChange={e => setSelectedFormat(e.target.value)}
                className="p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-medium"
              >
                <option value="All">All Formats</option>
                <option value="Remote">Remote Only</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          <span className="text-slate-400 dark:text-slate-500">
            Found <strong className="text-slate-800 dark:text-slate-200">{filteredRecommended.length}</strong> matching roles
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
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.company_logo}
                        alt={job.company}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                      />
                      <div>
                        <h3
                          onClick={() => openJobDetails(job.job_id)}
                          className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-sm line-clamp-1"
                        >
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{job.company}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.job_id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Match Meter */}
                  <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-black">
                      <div className="flex items-center gap-1.5 text-indigo-900 dark:text-indigo-200">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>AI Match: {job.match.overallScore}%</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase">
                        Skills: {job.match.skillsScore}%
                      </span>
                    </div>
                    <div className="w-full bg-indigo-200/70 dark:bg-indigo-900/60 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full"
                        style={{ width: `${job.match.overallScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Explainable match reason (Requirement #5) */}
                  <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                    <span className="font-bold text-slate-800 dark:text-slate-100">Why this matches: </span>
                    {job.match.explanation}
                  </div>

                  {/* Location & Format */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{job.location.split(',')[0]}</span>
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium text-slate-700 dark:text-slate-300">
                      {job.work_type}
                    </span>
                    <span className="bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800">
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
                            matched ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {matched && '✓ '}{skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openJobDetails(job.job_id)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    View Details
                  </button>

                  {alreadyApplied ? (
                    <span className="px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
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
