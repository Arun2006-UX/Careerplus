import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Job, WorkType, ExperienceLevel } from '../types';
import {
  Search,
  MapPin,
  Filter,
  Sparkles,
  Bookmark,
  Building2,
  Clock,
  ArrowUpDown,
  Briefcase,
  X,
  ChevronRight,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const JobSearchPage: React.FC = () => {
  const {
    jobs,
    currentCandidate,
    getMatchForJob,
    openJobDetails,
    toggleSaveJob,
    savedJobIds,
    applyForJob,
    getApplicationsForCandidate
  } = useApp();

  const [keyword, setKeyword] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'best_match' | 'newest' | 'relevance'>('best_match');

  const candidateApps = getApplicationsForCandidate(currentCandidate.candidate_id);

  // Extract unique filters from jobs list
  const industries = useMemo(() => {
    return ['All', ...Array.from(new Set(jobs.map(j => j.industry)))];
  }, [jobs]);

  const workTypes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const levels = ['All', 'Entry Level', 'Mid Level', 'Senior', 'Lead'];

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => j.skills.forEach(s => set.add(s)));
    return ['All', ...Array.from(set).sort()];
  }, [jobs]);

  // Compute matches and filter jobs
  const filteredJobs = useMemo(() => {
    return jobs
      .map(job => ({
        ...job,
        match: getMatchForJob(job, currentCandidate)
      }))
      .filter(job => {
        // Keyword filter: title, company, description, or skills
        if (keyword.trim()) {
          const q = keyword.toLowerCase().trim();
          const matchTitle = job.title.toLowerCase().includes(q);
          const matchCompany = job.company.toLowerCase().includes(q);
          const matchSkills = job.skills.some(s => s.toLowerCase().includes(q));
          const matchDesc = job.description.toLowerCase().includes(q);
          if (!matchTitle && !matchCompany && !matchSkills && !matchDesc) return false;
        }

        // Location filter
        if (locationSearch.trim()) {
          const locQ = locationSearch.toLowerCase().trim();
          if (!job.location.toLowerCase().includes(locQ)) return false;
        }

        // Industry filter
        if (selectedIndustry !== 'All' && job.industry !== selectedIndustry) {
          return false;
        }

        // Work type filter
        if (selectedWorkType !== 'All' && job.work_type !== selectedWorkType) {
          return false;
        }

        // Level filter
        if (selectedLevel !== 'All' && job.level !== selectedLevel) {
          return false;
        }

        // Skill filter
        if (selectedSkill !== 'All' && !job.skills.includes(selectedSkill)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'best_match') {
          return b.match.overallScore - a.match.overallScore;
        }
        if (sortBy === 'newest') {
          return new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime();
        }
        // Relevance = blend of overall score and text similarity
        return (
          b.match.overallScore + b.match.textSimilarityScore -
          (a.match.overallScore + a.match.textSimilarityScore)
        );
      });
  }, [
    jobs,
    keyword,
    locationSearch,
    selectedIndustry,
    selectedWorkType,
    selectedLevel,
    selectedSkill,
    sortBy,
    currentCandidate
  ]);

  const resetFilters = () => {
    setKeyword('');
    setLocationSearch('');
    setSelectedIndustry('All');
    setSelectedWorkType('All');
    setSelectedLevel('All');
    setSelectedSkill('All');
    setSortBy('best_match');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            <span>Job Discovery Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Opportunities &amp; AI Matches
          </h1>
          <p className="text-sm text-slate-500">
            Search across {jobs.length} tech positions with real-time TF-IDF compatibility ranking tailored to <strong className="text-slate-800">{currentCandidate.name}</strong>.
          </p>
        </div>

        {/* Primary Search Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Keyword / Role input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Job title, technical skill, or company (e.g. React, Python, FinTech)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {keyword && (
                <button
                  onClick={() => setKeyword('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location input */}
            <div className="md:col-span-4 relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={locationSearch}
                onChange={e => setLocationSearch(e.target.value)}
                placeholder="Location (e.g. Bengaluru, Remote, Pune)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {locationSearch && (
                <button
                  onClick={() => setLocationSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="md:col-span-2">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full py-2.5 px-3 text-xs font-semibold bg-indigo-50/80 text-indigo-900 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                >
                  <option value="best_match">Sort: Best Match</option>
                  <option value="newest">Sort: Newest</option>
                  <option value="relevance">Sort: Relevance</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Filters Row */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Filters:</span>
            </span>

            {/* Industry Filter */}
            <select
              value={selectedIndustry}
              onChange={e => setSelectedIndustry(e.target.value)}
              className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Industries</option>
              {industries.filter(i => i !== 'All').map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>

            {/* Work Type Filter */}
            <select
              value={selectedWorkType}
              onChange={e => setSelectedWorkType(e.target.value)}
              className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Work Types</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>

            {/* Skill Filter */}
            <select
              value={selectedSkill}
              onChange={e => setSelectedSkill(e.target.value)}
              className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none max-w-xs truncate"
            >
              <option value="All">All Tech Stacks</option>
              {allSkills.filter(s => s !== 'All').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Reset All */}
            {(keyword || locationSearch || selectedIndustry !== 'All' || selectedWorkType !== 'All' || selectedLevel !== 'All' || selectedSkill !== 'All') && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredJobs.length}</strong> matching jobs
          </span>
          <span className="text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">
            Ranked by multi-factor TF-IDF algorithm
          </span>
        </div>

        {/* Job Listings (Card List) */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No jobs match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms, clearing specific technology filters, or widening your location preference.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map(job => {
              const isSaved = savedJobIds.includes(job.job_id);
              const alreadyApplied = candidateApps.some(a => a.job_id === job.job_id);

              return (
                <div
                  key={job.job_id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left Column: Job Info */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-4">
                      <img
                        src={job.company_logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2
                            onClick={() => openJobDetails(job.job_id)}
                            className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                          >
                            {job.title}
                          </h2>

                          {/* Match score badge */}
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-black flex items-center gap-1 ${
                              job.match.overallScore >= 85
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : job.match.overallScore >= 70
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{job.match.overallScore}% Match</span>
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 font-medium">
                          {job.company} • <span className="text-slate-700">{job.industry}</span>
                        </p>
                      </div>
                    </div>

                    {/* Meta attributes */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.work_type}</span>
                      </span>
                      <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                        {job.level} ({job.min_experience_years}+ yrs)
                      </span>
                      <span className="bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-md">
                        {job.salary_range}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Posted {job.posted_at}
                      </span>
                    </div>

                    {/* Explainable match insight */}
                    <div className="text-xs text-indigo-950 bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
                      <span className="font-bold text-indigo-700">AI Match Insight: </span>
                      {job.match.explanation}
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skills.map(skill => {
                        const isMatched = job.match.skillsMatched.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                              isMatched
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                            title={isMatched ? 'Skill matched with your profile' : 'Required skill'}
                          >
                            {isMatched && '✓ '}{skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveJob(job.job_id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isSaved
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title={isSaved ? 'Remove from Saved' : 'Save Job'}
                      >
                        <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        onClick={() => openJobDetails(job.job_id)}
                        className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      >
                        Details
                      </button>
                    </div>

                    {alreadyApplied ? (
                      <span className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => openJobDetails(job.job_id)}
                        className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
