import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WorkType } from '../types';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Upload,
  FileText,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Save,
  Check,
  Building,
  Target
} from 'lucide-react';

export const CandidateProfilePage: React.FC = () => {
  const {
    currentCandidate,
    updateCandidateProfile,
    addSkillToProfile,
    removeSkillFromProfile,
    uploadResumeMock
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [name, setName] = useState(currentCandidate.name);
  const [email, setEmail] = useState(currentCandidate.email);
  const [phone, setPhone] = useState(currentCandidate.phone);
  const [location, setLocation] = useState(currentCandidate.location);
  const [targetRole, setTargetRole] = useState(currentCandidate.target_role);
  const [careerObjective, setCareerObjective] = useState(currentCandidate.career_objective);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Experience modal/add
  const [expTitle, setExpTitle] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expYears, setExpYears] = useState(1);
  const [showAddExp, setShowAddExp] = useState(false);

  // Resume upload simulation
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile({
      name,
      email,
      phone,
      location,
      target_role: targetRole,
      career_objective: careerObjective
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkillToProfile(newSkillInput.trim());
      setNewSkillInput('');
    }
  };

  const handleSimulateResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setUploadSuccessMsg('');

    setTimeout(() => {
      // Simulate intelligent NLP parsing: extracts extra in-demand skills
      const extractedTech = ['Docker', 'Kubernetes', 'Redis', 'GraphQL', 'AWS'];
      uploadResumeMock(file.name, extractedTech);
      setUploadingResume(false);
      setUploadSuccessMsg(`Resume "${file.name}" parsed successfully! Detected 5 new skill proficiencies and updated profile completeness.`);
      setTimeout(() => setUploadSuccessMsg(''), 4000);
    }, 1200);
  };

  const handleAddExperience = () => {
    if (!expTitle || !expCompany) return;
    const newExp = {
      id: `exp-${Date.now()}`,
      title: expTitle,
      company: expCompany,
      duration: '2024 - Present',
      description: `Engineered modules and led technical development at ${expCompany}.`,
      years: expYears
    };

    updateCandidateProfile({
      experience: [newExp, ...currentCandidate.experience],
      total_experience_years: currentCandidate.total_experience_years + expYears
    });

    setExpTitle('');
    setExpCompany('');
    setShowAddExp(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header & Save Confirmation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <User className="w-3.5 h-3.5" />
              <span>Candidate Dossier</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Profile &amp; Preferences
            </h1>
            <p className="text-sm text-slate-500">
              Manage personal details, skills inventory, preferences, and verified credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Profile Saved</span>
              </span>
            )}

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                isEditing
                  ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
              }`}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Strength & Improvement Tips Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Profile Completion</h3>
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  {currentCandidate.profile_completion}%
                </span>
              </div>
              <p className="text-xs text-slate-500">
                A higher completion score directly increases your ranking in recruiter talent searches.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1">
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentCandidate.profile_completion}%` }}
                ></div>
              </div>
              <div className="text-right text-[11px] font-bold text-slate-500">
                {currentCandidate.profile_completion}% Complete
              </div>
            </div>
          </div>

          {/* Improve Profile suggestions */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="font-bold text-indigo-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Improve Profile:</span>
            </span>
            {!currentCandidate.resume_name && (
              <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200 font-medium">
                • Upload resume PDF (+10%)
              </span>
            )}
            {currentCandidate.skills.length < 8 && (
              <span className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-md border border-blue-200 font-medium">
                • Add 3 more core skills (+5%)
              </span>
            )}
            {currentCandidate.experience.length < 2 && (
              <span className="bg-purple-50 text-purple-800 px-2.5 py-1 rounded-md border border-purple-200 font-medium">
                • Detail previous project impact (+5%)
              </span>
            )}
            {currentCandidate.profile_completion >= 90 && (
              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
                ✓ Outstanding profile! Optimally tuned for TF-IDF matching.
              </span>
            )}
          </div>
        </div>

        {/* 1. Personal & Professional Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Personal &amp; Professional Details
          </h2>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Role</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Career Objective / Summary</label>
                  <textarea
                    rows={3}
                    value={careerObjective}
                    onChange={e => setCareerObjective(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentCandidate.avatar}
                  alt={currentCandidate.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{currentCandidate.name}</h3>
                  <p className="text-sm text-indigo-600 font-semibold">{currentCandidate.target_role}</p>
                  <p className="text-xs text-slate-500">{currentCandidate.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-semibold mb-1">Email Address</div>
                  <div className="font-bold text-slate-800">{currentCandidate.email}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-semibold mb-1">Phone Number</div>
                  <div className="font-bold text-slate-800">{currentCandidate.phone}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-slate-400 font-semibold mb-1">Total Experience</div>
                  <div className="font-bold text-slate-800">{currentCandidate.total_experience_years} Years</div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Career Objective</div>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {currentCandidate.career_objective}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. Skills Management Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Technical Skills Inventory</h2>
              <p className="text-xs text-slate-500">
                Skills are directly vectorized into the TF-IDF representation during job matching.
              </p>
            </div>

            {/* Add skill input */}
            <form onSubmit={handleAddSkill} className="flex items-center gap-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={e => setNewSkillInput(e.target.value)}
                placeholder="Add skill (e.g. Redis, PyTorch)..."
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-2xs"
              >
                + Add
              </button>
            </form>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {currentCandidate.skills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-800 group"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkillFromProfile(skill)}
                  className="text-indigo-400 hover:text-rose-600 transition-colors"
                  title="Remove skill"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 3. Job Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Career &amp; Work Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-slate-400 font-semibold mb-1">Preferred Locations</div>
              <div className="font-bold text-slate-800">
                {currentCandidate.preferences.preferred_locations.join(', ')}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-slate-400 font-semibold mb-1">Work Types</div>
              <div className="font-bold text-slate-800">
                {currentCandidate.preferences.work_types.join(', ')}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-slate-400 font-semibold mb-1">Target Industries</div>
              <div className="font-bold text-slate-800">
                {currentCandidate.preferences.industries.join(', ')}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-slate-400 font-semibold mb-1">Min Expected CTC</div>
              <div className="font-bold text-indigo-700">
                ₹{currentCandidate.preferences.min_salary} LPA
              </div>
            </div>
          </div>
        </div>

        {/* 4. Experience & Education Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience list */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Work Experience</span>
              </h3>
              <button
                onClick={() => setShowAddExp(!showAddExp)}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                + Add Role
              </button>
            </div>

            {showAddExp && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Job Title (e.g. Backend Dev)"
                  value={expTitle}
                  onChange={e => setExpTitle(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={expCompany}
                  onChange={e => setExpCompany(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button onClick={() => setShowAddExp(false)} className="px-2 py-1 text-slate-600">Cancel</button>
                  <button onClick={handleAddExperience} className="px-3 py-1 bg-indigo-600 text-white rounded font-bold">Add</button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {currentCandidate.experience.map(exp => (
                <div key={exp.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{exp.title}</div>
                  <div className="text-indigo-600 font-semibold">{exp.company} • {exp.duration}</div>
                  <p className="text-slate-600 pt-1 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education list */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Education</span>
            </h3>

            <div className="space-y-4">
              {currentCandidate.education.map(edu => (
                <div key={edu.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{edu.degree}</div>
                  <div className="text-purple-600 font-semibold">{edu.institution}</div>
                  <div className="text-slate-500">Graduated: {edu.year} {edu.grade ? `• ${edu.grade}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Resume Upload & Intelligent Parser Simulator */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Resume &amp; Document Parsing</h2>
          </div>
          <p className="text-xs text-slate-500">
            Upload an updated PDF/DOCX resume. CareerPulse automatically tokenizes your text and detects skills to enrich your TF-IDF vector.
          </p>

          {uploadSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccessMsg}</span>
            </div>
          )}

          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-6 text-center space-y-3 transition-colors bg-slate-50/50">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>

            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
                <span>{uploadingResume ? 'Parsing Document...' : 'Choose File to Upload'}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleSimulateResumeUpload}
                  disabled={uploadingResume}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400 mt-2">
                Supported formats: PDF, DOC, DOCX up to 10MB
              </p>
            </div>

            {currentCandidate.resume_name && (
              <div className="pt-2 text-xs text-slate-600 flex items-center justify-center gap-2">
                <span className="font-semibold text-slate-800">Current Resume:</span>
                <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-mono">
                  {currentCandidate.resume_name}
                </span>
                <span className="text-slate-400">({currentCandidate.resume_uploaded_at})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
