export type UserRole = 'candidate' | 'recruiter' | 'guest';

export type WorkType = 'Remote' | 'Hybrid' | 'On-site';

export type ExperienceLevel = 'Internship' | 'Entry Level' | 'Mid Level' | 'Senior' | 'Lead';

export type ApplicationStatus = 'Applied' | 'Under Review' | 'Interview' | 'Offer' | 'Rejected';

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  field: string;
  grade?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  years: number;
}

export interface CandidatePreferences {
  preferred_locations: string[];
  work_types: WorkType[];
  industries: string[];
  desired_roles: string[];
  min_salary: number; // in LPA / INR
}

export interface Candidate {
  candidate_id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  target_role: string;
  career_objective: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  total_experience_years: number;
  preferences: CandidatePreferences;
  resume_name?: string;
  resume_uploaded_at?: string;
  profile_completion: number;
}

export interface Job {
  job_id: string;
  title: string;
  company: string;
  company_logo?: string;
  description: string;
  skills: string[];
  industry: string;
  location: string;
  work_type: WorkType;
  level: ExperienceLevel;
  min_experience_years: number;
  salary_range: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  posted_at: string;
  status: 'active' | 'closed';
  recruiter_id: string;
  applicant_count?: number;
}

export interface ApplicationTimelineEvent {
  status: ApplicationStatus;
  date: string;
  comment: string;
}

export interface Application {
  application_id: string;
  candidate_id: string;
  job_id: string;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
  notes?: string;
  timeline: ApplicationTimelineEvent[];
}

export interface Recruiter {
  recruiter_id: string;
  name: string;
  company: string;
  company_logo?: string;
  email: string;
  role: string;
  company_description: string;
  company_website: string;
  company_location: string;
  industry: string;
}

export interface Interaction {
  interaction_id: string;
  candidate_id: string;
  job_id: string;
  action: 'view' | 'save' | 'apply';
  timestamp: string;
}

export interface TfidfTokenWeight {
  term: string;
  weight: number;
}

export interface MatchBreakdown {
  overallScore: number;
  skillsScore: number;
  skillsMatched: string[];
  skillsMissing: string[];
  roleScore: number;
  locationScore: number;
  workTypeScore: number;
  experienceScore: number;
  textSimilarityScore: number;
  explanation: string;
  tfidfDetails: {
    candidateTopTerms: TfidfTokenWeight[];
    jobTopTerms: TfidfTokenWeight[];
    sharedTerms: TfidfTokenWeight[];
    rawCosineSim: number;
  };
}

export interface RecommendedJob extends Job {
  match: MatchBreakdown;
}
