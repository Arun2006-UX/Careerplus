import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Candidate,
  Job,
  Application,
  Recruiter,
  UserRole,
  ApplicationStatus,
  MatchBreakdown,
  RecommendedJob
} from '../types';
import {
  INITIAL_CANDIDATES,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_RECRUITERS
} from '../data/mockData';
import {
  calculateJobMatch,
  calculateIDF,
  tokenizeAndClean,
  getCandidateCorpusText,
  getJobCorpusText
} from '../services/aiMatchingEngine';

interface AppContextType {
  userRole: UserRole;
  currentCandidate: Candidate;
  currentRecruiter: Recruiter;
  candidates: Candidate[];
  jobs: Job[];
  applications: Application[];
  savedJobIds: string[];
  activeTab: string;
  selectedJobId: string | null;
  selectedApplicantId: string | null;
  authModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  authModalRole: 'candidate' | 'recruiter';
  globalIdf: Map<string, number>;

  // Actions
  setUserRole: (role: UserRole) => void;
  setActiveTab: (tab: string) => void;
  openJobDetails: (jobId: string) => void;
  setSelectedJobId: (jobId: string | null) => void;
  setSelectedApplicantId: (applicantId: string | null) => void;
  applyForJob: (jobId: string, customNote?: string) => { success: boolean; message: string };
  toggleSaveJob: (jobId: string) => void;
  updateCandidateProfile: (updated: Partial<Candidate>) => void;
  addSkillToProfile: (skill: string) => void;
  removeSkillFromProfile: (skill: string) => void;
  uploadResumeMock: (fileName: string, extractedSkills?: string[]) => void;
  postNewJob: (jobData: Omit<Job, 'job_id' | 'posted_at' | 'status' | 'applicant_count' | 'recruiter_id'>) => Job;
  editJob: (jobId: string, jobData: Partial<Job>) => void;
  toggleJobStatus: (jobId: string) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, comment?: string) => void;
  switchCandidate: (candidateId: string) => void;
  switchRecruiter: (recruiterId: string) => void;
  openAuthModal: (mode?: 'login' | 'signup', role?: 'candidate' | 'recruiter') => void;
  closeAuthModal: () => void;
  loginUser: (role: 'candidate' | 'recruiter', email?: string) => void;
  logoutUser: () => void;

  // Helpers
  getJobById: (jobId: string) => Job | undefined;
  getCandidateById: (candidateId: string) => Candidate | undefined;
  getMatchForJob: (job: Job, candidate?: Candidate) => MatchBreakdown;
  getRecommendedJobs: (candidate?: Candidate) => RecommendedJob[];
  getApplicationsForCandidate: (candidateId?: string) => (Application & { job: Job; match: MatchBreakdown })[];
  getApplicationsForRecruiter: () => (Application & { job: Job; candidate: Candidate; match: MatchBreakdown })[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem('careerpulse_candidates');
    return saved ? JSON.parse(saved) : INITIAL_CANDIDATES;
  });
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('careerpulse_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('careerpulse_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('careerpulse_saved_jobs');
    return saved ? JSON.parse(saved) : ['job-101', 'job-105'];
  });

  const [currentCandidateId, setCurrentCandidateId] = useState<string>('cand-001');
  const [currentRecruiterId, setCurrentRecruiterId] = useState<string>('rec-001');

  const [activeTab, setActiveTabState] = useState<string>('home');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);

  // Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authModalRole, setAuthModalRole] = useState<'candidate' | 'recruiter'>('candidate');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('careerpulse_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('careerpulse_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('careerpulse_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('careerpulse_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const currentCandidate = useMemo(() => {
    return candidates.find(c => c.candidate_id === currentCandidateId) || candidates[0];
  }, [candidates, currentCandidateId]);

  const currentRecruiter = useMemo(() => {
    return INITIAL_RECRUITERS.find(r => r.recruiter_id === currentRecruiterId) || INITIAL_RECRUITERS[0];
  }, [currentRecruiterId]);

  // Compute corpus-wide IDF across all jobs and candidates for realistic TF-IDF model
  const globalIdf = useMemo(() => {
    const documents: string[][] = [];
    candidates.forEach(c => {
      documents.push(tokenizeAndClean(getCandidateCorpusText(c)));
    });
    jobs.forEach(j => {
      documents.push(tokenizeAndClean(getJobCorpusText(j)));
    });
    return calculateIDF(documents);
  }, [candidates, jobs]);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openJobDetails = (jobId: string) => {
    setSelectedJobId(jobId);
    setActiveTab('job-details');
  };

  const getJobById = (jobId: string) => {
    return jobs.find(j => j.job_id === jobId);
  };

  const getCandidateById = (candidateId: string) => {
    return candidates.find(c => c.candidate_id === candidateId);
  };

  const getMatchForJob = (job: Job, candidate?: Candidate): MatchBreakdown => {
    const targetCandidate = candidate || currentCandidate;
    return calculateJobMatch(targetCandidate, job, globalIdf);
  };

  const getRecommendedJobs = (candidate?: Candidate): RecommendedJob[] => {
    const targetCandidate = candidate || currentCandidate;
    return jobs
      .filter(j => j.status === 'active')
      .map(job => ({
        ...job,
        match: calculateJobMatch(targetCandidate, job, globalIdf)
      }))
      .sort((a, b) => b.match.overallScore - a.match.overallScore);
  };

  const applyForJob = (jobId: string, customNote?: string) => {
    const job = getJobById(jobId);
    if (!job) return { success: false, message: 'Job not found' };

    // Check if already applied
    const existing = applications.find(
      a => a.candidate_id === currentCandidate.candidate_id && a.job_id === jobId
    );

    if (existing) {
      return { success: false, message: 'You have already applied for this position.' };
    }

    const newApp: Application = {
      application_id: `app-${Date.now()}`,
      candidate_id: currentCandidate.candidate_id,
      job_id: jobId,
      status: 'Applied',
      applied_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      notes: customNote || 'Application submitted via CareerPulse AI matching engine.',
      timeline: [
        {
          status: 'Applied',
          date: new Date().toISOString().split('T')[0],
          comment: 'Application submitted successfully. Candidate profile and match score transmitted to recruiter.'
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    // Bump applicant count on job
    setJobs(prev =>
      prev.map(j =>
        j.job_id === jobId ? { ...j, applicant_count: (j.applicant_count || 0) + 1 } : j
      )
    );

    return { success: true, message: 'Application submitted successfully!' };
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const updateCandidateProfile = (updated: Partial<Candidate>) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.candidate_id === currentCandidate.candidate_id) {
          const merged = { ...c, ...updated };
          // recalculate profile completion
          let score = 50;
          if (merged.skills.length >= 5) score += 15;
          if (merged.experience.length > 0) score += 15;
          if (merged.education.length > 0) score += 10;
          if (merged.resume_name) score += 10;
          merged.profile_completion = Math.min(100, score);
          return merged;
        }
        return c;
      })
    );
  };

  const addSkillToProfile = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (currentCandidate.skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) return;

    updateCandidateProfile({
      skills: [...currentCandidate.skills, trimmed]
    });
  };

  const removeSkillFromProfile = (skill: string) => {
    updateCandidateProfile({
      skills: currentCandidate.skills.filter(s => s !== skill)
    });
  };

  const uploadResumeMock = (fileName: string, extractedSkills?: string[]) => {
    const defaultExtracted = extractedSkills || ['Docker', 'Kubernetes', 'Redis', 'CI/CD'];
    const currentSkillsLower = new Set(currentCandidate.skills.map(s => s.toLowerCase()));
    const newSkillsToAdd = defaultExtracted.filter(s => !currentSkillsLower.has(s.toLowerCase()));

    updateCandidateProfile({
      resume_name: fileName,
      resume_uploaded_at: new Date().toISOString().split('T')[0],
      skills: [...currentCandidate.skills, ...newSkillsToAdd]
    });
  };

  const postNewJob = (
    jobData: Omit<Job, 'job_id' | 'posted_at' | 'status' | 'applicant_count' | 'recruiter_id'>
  ): Job => {
    const newJob: Job = {
      ...jobData,
      job_id: `job-${Date.now()}`,
      posted_at: new Date().toISOString().split('T')[0],
      status: 'active',
      applicant_count: 0,
      recruiter_id: currentRecruiter.recruiter_id
    };

    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const editJob = (jobId: string, jobData: Partial<Job>) => {
    setJobs(prev =>
      prev.map(j => (j.job_id === jobId ? { ...j, ...jobData } : j))
    );
  };

  const toggleJobStatus = (jobId: string) => {
    setJobs(prev =>
      prev.map(j =>
        j.job_id === jobId
          ? { ...j, status: j.status === 'active' ? 'closed' : 'active' }
          : j
      )
    );
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: ApplicationStatus,
    comment?: string
  ) => {
    const now = new Date().toISOString();
    const today = now.split('T')[0];

    const defaultComment =
      status === 'Under Review'
        ? 'Application shortlisted for in-depth hiring team review.'
        : status === 'Interview'
        ? 'Interview scheduled with technical evaluation team.'
        : status === 'Offer'
        ? 'Formal employment offer generated and sent.'
        : status === 'Rejected'
        ? 'Application status updated. Profile retained for future relevant roles.'
        : 'Status updated.';

    setApplications(prev =>
      prev.map(app => {
        if (app.application_id === applicationId) {
          const updatedTimeline = [
            ...app.timeline,
            {
              status,
              date: today,
              comment: comment || defaultComment
            }
          ];
          return {
            ...app,
            status,
            updated_at: now,
            timeline: updatedTimeline
          };
        }
        return app;
      })
    );
  };

  const switchCandidate = (candidateId: string) => {
    setCurrentCandidateId(candidateId);
  };

  const switchRecruiter = (recruiterId: string) => {
    setCurrentRecruiterId(recruiterId);
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login', role: 'candidate' | 'recruiter' = 'candidate') => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const loginUser = (role: 'candidate' | 'recruiter', email?: string) => {
    setUserRole(role);
    if (role === 'candidate') {
      if (email) {
        const found = candidates.find(c => c.email.toLowerCase() === email.toLowerCase());
        if (found) setCurrentCandidateId(found.candidate_id);
      }
      setActiveTab('candidate-dashboard');
    } else {
      setActiveTab('recruiter-dashboard');
    }
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUserRole('guest');
    setActiveTab('home');
  };

  const getApplicationsForCandidate = (candidateId?: string) => {
    const targetCandId = candidateId || currentCandidate.candidate_id;
    const cand = candidates.find(c => c.candidate_id === targetCandId) || currentCandidate;

    return applications
      .filter(a => a.candidate_id === targetCandId)
      .map(app => {
        const job = getJobById(app.job_id) || jobs[0];
        const match = calculateJobMatch(cand, job, globalIdf);
        return { ...app, job, match };
      })
      .sort((a, b) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime());
  };

  const getApplicationsForRecruiter = () => {
    return applications
      .map(app => {
        const job = getJobById(app.job_id);
        const candidate = getCandidateById(app.candidate_id);
        if (!job || !candidate) return null;
        const match = calculateJobMatch(candidate, job, globalIdf);
        return { ...app, job, candidate, match };
      })
      .filter(Boolean) as (Application & { job: Job; candidate: Candidate; match: MatchBreakdown })[];
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        currentCandidate,
        currentRecruiter,
        candidates,
        jobs,
        applications,
        savedJobIds,
        activeTab,
        selectedJobId,
        selectedApplicantId,
        authModalOpen,
        authModalMode,
        authModalRole,
        globalIdf,
        setUserRole,
        setActiveTab,
        openJobDetails,
        setSelectedJobId,
        setSelectedApplicantId,
        applyForJob,
        toggleSaveJob,
        updateCandidateProfile,
        addSkillToProfile,
        removeSkillFromProfile,
        uploadResumeMock,
        postNewJob,
        editJob,
        toggleJobStatus,
        updateApplicationStatus,
        switchCandidate,
        switchRecruiter,
        openAuthModal,
        closeAuthModal,
        loginUser,
        logoutUser,
        getJobById,
        getCandidateById,
        getMatchForJob,
        getRecommendedJobs,
        getApplicationsForCandidate,
        getApplicationsForRecruiter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
