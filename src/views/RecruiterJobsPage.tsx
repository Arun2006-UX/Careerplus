import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Job, WorkType, ExperienceLevel } from '../types';
import {
  Briefcase,
  PlusCircle,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Edit,
  Eye,
  Trash2,
  AlertCircle,
  Building2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const RecruiterJobsPage: React.FC = () => {
  const {
    jobs,
    currentRecruiter,
    postNewJob,
    editJob,
    toggleJobStatus,
    openJobDetails,
    setActiveTab,
    getApplicationsForRecruiter
  } = useApp();

  const [showPostModal, setShowPostModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form states for posting/editing job
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState(currentRecruiter.company);
  const [description, setDescription] = useState('');
  const [skillsString, setSkillsString] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Mid Level');
  const [minExpYears, setMinExpYears] = useState(3);
  const [location, setLocation] = useState(currentRecruiter.company_location);
  const [industry, setIndustry] = useState(currentRecruiter.industry);
  const [workType, setWorkType] = useState<WorkType>('Hybrid');
  const [salaryRange, setSalaryRange] = useState('₹18L - ₹26L PA');
  const [responsibilitiesString, setResponsibilitiesString] = useState('');
  const [requirementsString, setRequirementsString] = useState('');
  const [benefitsString, setBenefitsString] = useState('');
  const [formFeedback, setFormFeedback] = useState('');

  const recruiterApps = getApplicationsForRecruiter();

  const openPostModal = () => {
    setEditingJob(null);
    setTitle('');
    setCompany(currentRecruiter.company);
    setDescription('');
    setSkillsString('React, TypeScript, Node.js, PostgreSQL');
    setExperienceLevel('Mid Level');
    setMinExpYears(3);
    setLocation(currentRecruiter.company_location);
    setIndustry(currentRecruiter.industry);
    setWorkType('Hybrid');
    setSalaryRange('₹18L - ₹26L PA');
    setResponsibilitiesString('Design and implement microservices\nCollaborate with product designers\nWrite automated tests');
    setRequirementsString('3+ years of web engineering\nSolid knowledge of TypeScript\nDegree in CS or equivalent');
    setBenefitsString('Comprehensive health coverage\nRemote work allowance\nAnnual learning budget');
    setShowPostModal(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title);
    setCompany(job.company);
    setDescription(job.description);
    setSkillsString(job.skills.join(', '));
    setExperienceLevel(job.level);
    setMinExpYears(job.min_experience_years);
    setLocation(job.location);
    setIndustry(job.industry);
    setWorkType(job.work_type);
    setSalaryRange(job.salary_range);
    setResponsibilitiesString(job.responsibilities.join('\n'));
    setRequirementsString(job.requirements.join('\n'));
    setBenefitsString(job.benefits.join('\n'));
    setShowPostModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setFormFeedback('Please fill out the job title and description');
      return;
    }

    const skillsArray = skillsString
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const responsibilitiesArray = responsibilitiesString
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const requirementsArray = requirementsString
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const benefitsArray = benefitsString
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingJob) {
      editJob(editingJob.job_id, {
        title,
        company,
        description,
        skills: skillsArray,
        level: experienceLevel,
        min_experience_years: minExpYears,
        location,
        industry,
        work_type: workType,
        salary_range: salaryRange,
        responsibilities: responsibilitiesArray,
        requirements: requirementsArray,
        benefits: benefitsArray
      });
    } else {
      postNewJob({
        title,
        company,
        company_logo: currentRecruiter.company_logo,
        description,
        skills: skillsArray,
        level: experienceLevel,
        min_experience_years: minExpYears,
        location,
        industry,
        work_type: workType,
        salary_range: salaryRange,
        responsibilities: responsibilitiesArray,
        requirements: requirementsArray,
        benefits: benefitsArray
      });
    }

    setShowPostModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Job Postings Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              My Job Openings ({jobs.length})
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage live job specifications, monitor incoming applicant pipelines, and close postings.
            </p>
          </div>

          <button
            onClick={openPostModal}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a New Job</span>
          </button>
        </div>

        {/* Jobs List Table / Cards */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3 pr-4">Job Title &amp; Company</th>
                  <th className="pb-3 px-4">Location &amp; Format</th>
                  <th className="pb-3 px-4">Experience</th>
                  <th className="pb-3 px-4">Applicants</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Posted Date</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.map(job => {
                  const jobAppsCount = recruiterApps.filter(a => a.job_id === job.job_id).length || job.applicant_count || 0;

                  return (
                    <tr key={job.job_id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      {/* Title */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={job.company_logo}
                            alt={job.company}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shrink-0"
                          />
                          <div>
                            <div
                              onClick={() => openJobDetails(job.job_id)}
                              className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-sm"
                            >
                              {job.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">{job.company} • {job.industry}</div>
                          </div>
                        </div>
                      </td>

                      {/* Location & Format */}
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                        <div>{job.location.split(',')[0]}</div>
                        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{job.work_type}</div>
                      </td>

                      {/* Level */}
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-medium">
                        {job.level} ({job.min_experience_years}+ yrs)
                      </td>

                      {/* Applicants */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setActiveTab('recruiter-applicants')}
                          className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-xs inline-flex items-center gap-1 transition-colors border border-indigo-200/50 dark:border-indigo-800/50"
                        >
                          <Users className="w-3 h-3" />
                          <span>{jobAppsCount} Applicants</span>
                        </button>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                            job.status === 'active'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                          <span className="capitalize">{job.status}</span>
                        </span>
                      </td>

                      {/* Posted */}
                      <td className="py-4 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        {job.posted_at}
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openJobDetails(job.job_id)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            title="View public details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(job)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            title="Edit Job"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleJobStatus(job.job_id)}
                            className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                              job.status === 'active'
                                ? 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/60'
                                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
                            }`}
                          >
                            {job.status === 'active' ? 'Close' : 'Reopen'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Post a Job / Edit Job Form Modal (Requirement #11) */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-8 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingJob ? 'Edit Job Specification' : 'Post a New Job Opportunity'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Provide rich details so the TF-IDF engine can match relevant candidate vectors.
                </p>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            {formFeedback && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs rounded-lg font-medium">
                {formFeedback}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Senior Full Stack Engineer"
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    placeholder="e.g. Enterprise SaaS, FinTech"
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Type</label>
                  <select
                    value={workType}
                    onChange={e => setWorkType(e.target.value as WorkType)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={e => setExperienceLevel(e.target.value as ExperienceLevel)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Min Experience (Years)</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={minExpYears}
                    onChange={e => setMinExpYears(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={e => setSalaryRange(e.target.value)}
                    placeholder="e.g. ₹20L - ₹28L PA"
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Required Skills (Comma separated) *
                  </label>
                  <input
                    type="text"
                    value={skillsString}
                    onChange={e => setSkillsString(e.target.value)}
                    placeholder="React, TypeScript, Node.js, PostgreSQL, Docker"
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Description *</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Provide overview of the role and mission..."
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Key Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={responsibilitiesString}
                    onChange={e => setResponsibilitiesString(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Requirements (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={requirementsString}
                    onChange={e => setRequirementsString(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Benefits &amp; Perks (One per line)
                  </label>
                  <textarea
                    rows={2}
                    value={benefitsString}
                    onChange={e => setBenefitsString(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm"
                >
                  {editingJob ? 'Update Job' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
