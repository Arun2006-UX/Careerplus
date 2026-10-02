import { Candidate, Job, Application, Recruiter } from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    candidate_id: 'cand-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    location: 'Bengaluru, Karnataka',
    target_role: 'Full Stack Engineer',
    career_objective: 'Results-driven Full Stack Engineer with 4 years of experience crafting scalable web architectures, microservices, and reactive frontends. Passionate about TypeScript, React, and cloud native systems.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL', 'Tailwind CSS', 'Next.js', 'Redis'],
    education: [
      {
        id: 'edu-1',
        degree: 'B.Tech in Computer Science & Engineering',
        institution: 'National Institute of Technology Karnataka (NITK), Surathkal',
        year: '2020',
        field: 'Computer Science',
        grade: '8.8 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Software Engineer',
        company: 'NovaStack Technologies',
        duration: '2022 - Present',
        description: 'Engineered high-throughput GraphQL APIs and modernized payment gateway dashboards serving 400K+ monthly active merchants.',
        years: 2.5
      },
      {
        id: 'exp-2',
        title: 'Full Stack Developer',
        company: 'Verve Systems',
        duration: '2020 - 2022',
        description: 'Built customer portal using React, Node.js, and PostgreSQL with automated CI/CD pipelines.',
        years: 2
      }
    ],
    total_experience_years: 4.5,
    preferences: {
      preferred_locations: ['Bengaluru', 'Remote', 'Hyderabad'],
      work_types: ['Remote', 'Hybrid'],
      industries: ['FinTech', 'SaaS', 'E-commerce'],
      desired_roles: ['Full Stack Engineer', 'Senior Frontend Engineer', 'Backend Engineer'],
      min_salary: 22
    },
    resume_name: 'Aarav_Sharma_Resume_2026.pdf',
    resume_uploaded_at: '2026-09-15',
    profile_completion: 92
  },
  {
    candidate_id: 'cand-002',
    name: 'Priya Iyer',
    email: 'priya.iyer@example.com',
    phone: '+91 98111 22334',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    location: 'Hyderabad, Telangana',
    target_role: 'Machine Learning Engineer',
    career_objective: 'AI researcher and Machine Learning Engineer specializing in NLP, transformer models, and recommender systems with hands-on production deployment experience.',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'NLP', 'FastAPI', 'MLOps', 'Docker', 'SQL', 'Hugging Face'],
    education: [
      {
        id: 'edu-2',
        degree: 'M.Tech in Data Science & Artificial Intelligence',
        institution: 'IIIT Hyderabad',
        year: '2022',
        field: 'Artificial Intelligence',
        grade: '9.2 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-3',
        title: 'Machine Learning Engineer',
        company: 'CognitiveCore AI',
        duration: '2022 - Present',
        description: 'Trained and deployed LLM fine-tuning pipelines and semantic search microservices decreasing search latency by 45%.',
        years: 3
      }
    ],
    total_experience_years: 3,
    preferences: {
      preferred_locations: ['Hyderabad', 'Bengaluru', 'Remote'],
      work_types: ['Hybrid', 'Remote'],
      industries: ['AI & Data', 'HealthTech', 'FinTech'],
      desired_roles: ['Machine Learning Engineer', 'Data Scientist', 'AI Engineer'],
      min_salary: 26
    },
    resume_name: 'Priya_Iyer_ML_CV.pdf',
    resume_uploaded_at: '2026-09-18',
    profile_completion: 88
  },
  {
    candidate_id: 'cand-003',
    name: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@example.com',
    phone: '+91 97654 32198',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    location: 'Pune, Maharashtra',
    target_role: 'DevOps & Cloud Architect',
    career_objective: 'Cloud Architect with 5+ years building resilient multi-cloud infrastructures, Kubernetes clusters, and automated Terraform environments.',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Prometheus', 'Linux', 'Python', 'Go', 'ArgoCD'],
    education: [
      {
        id: 'edu-3',
        degree: 'B.E. in Information Technology',
        institution: 'Pune Institute of Computer Technology (PICT)',
        year: '2019',
        field: 'Information Technology',
        grade: '8.5 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-4',
        title: 'Lead DevOps Engineer',
        company: 'CloudNative Solutions',
        duration: '2021 - Present',
        description: 'Maintained zero-downtime infrastructure for 120+ microservices on AWS EKS across 3 regions.',
        years: 4
      }
    ],
    total_experience_years: 5.5,
    preferences: {
      preferred_locations: ['Pune', 'Mumbai', 'Remote'],
      work_types: ['Remote', 'Hybrid'],
      industries: ['Cloud/Enterprise SaaS', 'FinTech'],
      desired_roles: ['DevOps Architect', 'Site Reliability Engineer', 'Cloud Infrastructure Lead'],
      min_salary: 30
    },
    resume_name: 'Rohan_Deshmukh_DevOps.pdf',
    resume_uploaded_at: '2026-09-10',
    profile_completion: 95
  },
  {
    candidate_id: 'cand-004',
    name: 'Ananya Verma',
    email: 'ananya.verma@example.com',
    phone: '+91 99887 66554',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    location: 'Gurugram, Haryana',
    target_role: 'Product Manager',
    career_objective: 'Customer-obsessed technical PM driving product discovery, user experience metrics, and cross-functional agile squads in B2B SaaS.',
    skills: ['Product Strategy', 'Agile/Scrum', 'User Research', 'SQL', 'Jira', 'Figma', 'Wireframing', 'A/B Testing', 'Data Analytics'],
    education: [
      {
        id: 'edu-4',
        degree: 'MBA & B.Tech',
        institution: 'FMS Delhi & DTU',
        year: '2021',
        field: 'Product Management',
        grade: 'Top 5%'
      }
    ],
    experience: [
      {
        id: 'exp-5',
        title: 'Product Manager',
        company: 'FinPulse Mobility',
        duration: '2022 - Present',
        description: 'Scaled user onboarding conversion by 34% through algorithmic checkout optimization.',
        years: 3
      }
    ],
    total_experience_years: 4,
    preferences: {
      preferred_locations: ['Gurugram', 'Delhi NCR', 'Remote'],
      work_types: ['Hybrid', 'On-site'],
      industries: ['FinTech', 'E-commerce', 'EdTech'],
      desired_roles: ['Product Manager', 'Senior Product Manager'],
      min_salary: 28
    },
    resume_name: 'Ananya_Verma_PM.pdf',
    resume_uploaded_at: '2026-08-25',
    profile_completion: 90
  },
  {
    candidate_id: 'cand-005',
    name: 'Vikramaditya Nair',
    email: 'vikram.nair@example.com',
    phone: '+91 98450 11223',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    location: 'Bengaluru, Karnataka',
    target_role: 'Frontend UI/UX Engineer',
    career_objective: 'Creative frontend engineer dedicated to web performance, accessible interactive UI patterns, design systems, and WebGL.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'Jest', 'Storybook', 'HTML5/CSS3'],
    education: [
      {
        id: 'edu-5',
        degree: 'B.Tech in Computer Engineering',
        institution: 'PES University, Bengaluru',
        year: '2023',
        field: 'Computer Science',
        grade: '8.7 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-6',
        title: 'Frontend Developer',
        company: 'PixelCraft Digital',
        duration: '2023 - Present',
        description: 'Built enterprise design system used across 6 web applications, cutting feature turnaround time in half.',
        years: 2
      }
    ],
    total_experience_years: 2,
    preferences: {
      preferred_locations: ['Bengaluru', 'Remote'],
      work_types: ['Remote', 'Hybrid'],
      industries: ['SaaS', 'EdTech', 'Media'],
      desired_roles: ['Frontend Developer', 'UI Engineer'],
      min_salary: 16
    },
    resume_name: 'Vikram_Nair_Portfolio.pdf',
    resume_uploaded_at: '2026-09-22',
    profile_completion: 85
  },
  {
    candidate_id: 'cand-006',
    name: 'Sneha Kulkarni',
    email: 'sneha.kulkarni@example.com',
    phone: '+91 91234 56780',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    location: 'Mumbai, Maharashtra',
    target_role: 'Data Analyst & BI Specialist',
    career_objective: 'Analytical problem solver turning raw data into strategic business decisions with PowerBI, SQL, Python, and statistical modeling.',
    skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel', 'Pandas', 'Data Visualization', 'Statistical Analysis', 'ETL'],
    education: [
      {
        id: 'edu-6',
        degree: 'B.Sc in Statistics & Data Analytics',
        institution: 'St. Xavier\'s College, Mumbai',
        year: '2022',
        field: 'Statistics',
        grade: 'Distinction'
      }
    ],
    experience: [
      {
        id: 'exp-7',
        title: 'Business Data Analyst',
        company: 'Apex Metrics',
        duration: '2022 - Present',
        description: 'Designed automated revenue forecasting models and KPI executive dashboards.',
        years: 2.5
      }
    ],
    total_experience_years: 2.5,
    preferences: {
      preferred_locations: ['Mumbai', 'Pune', 'Remote'],
      work_types: ['Hybrid', 'On-site'],
      industries: ['FinTech', 'E-commerce', 'Consulting'],
      desired_roles: ['Data Analyst', 'BI Developer', 'Analytics Consultant'],
      min_salary: 14
    },
    resume_name: 'Sneha_Kulkarni_Analyst.pdf',
    resume_uploaded_at: '2026-09-05',
    profile_completion: 82
  },
  {
    candidate_id: 'cand-007',
    name: 'Karthik Raja',
    email: 'karthik.raja@example.com',
    phone: '+91 96001 23456',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80',
    location: 'Chennai, Tamil Nadu',
    target_role: 'Backend Java / Spring Boot Engineer',
    career_objective: 'Enterprise backend developer proficient in Java, Spring Boot, distributed caching, and transactional integrity in banking frameworks.',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'REST API', 'Hibernate'],
    education: [
      {
        id: 'edu-7',
        degree: 'B.E. in Computer Science',
        institution: 'College of Engineering, Guindy (Anna University)',
        year: '2020',
        field: 'Computer Science',
        grade: '8.9 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-8',
        title: 'Senior Backend Developer',
        company: 'PaySphere Financial',
        duration: '2021 - Present',
        description: 'Engineered high-concurrency payment ledger processing 25,000 TPS with Kafka event streaming.',
        years: 3.5
      }
    ],
    total_experience_years: 4,
    preferences: {
      preferred_locations: ['Chennai', 'Bengaluru', 'Remote'],
      work_types: ['Hybrid', 'Remote'],
      industries: ['FinTech', 'Banking', 'Enterprise'],
      desired_roles: ['Backend Engineer', 'Java Tech Lead'],
      min_salary: 24
    },
    resume_name: 'Karthik_Raja_Java.pdf',
    resume_uploaded_at: '2026-09-12',
    profile_completion: 90
  },
  {
    candidate_id: 'cand-008',
    name: 'Meera Sen',
    email: 'meera.sen@example.com',
    phone: '+91 97480 98765',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=256&q=80',
    location: 'Kolkata, West Bengal',
    target_role: 'Mobile Application Developer',
    career_objective: 'Cross-platform mobile engineer specializing in Flutter, React Native, offline-first sync, and iOS/Android store releases.',
    skills: ['Flutter', 'Dart', 'React Native', 'Firebase', 'State Management', 'REST API', 'iOS', 'Android', 'Git'],
    education: [
      {
        id: 'edu-8',
        degree: 'B.Tech in Information Technology',
        institution: 'Jadavpur University',
        year: '2022',
        field: 'IT',
        grade: '8.6 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-9',
        title: 'Mobile App Engineer',
        company: 'SwiftApp Studio',
        duration: '2022 - Present',
        description: 'Built customer app with 1M+ downloads, 4.8 star rating, and sub-100ms offline sync.',
        years: 2.5
      }
    ],
    total_experience_years: 2.5,
    preferences: {
      preferred_locations: ['Remote', 'Bengaluru', 'Kolkata'],
      work_types: ['Remote'],
      industries: ['Consumer Tech', 'HealthTech', 'FinTech'],
      desired_roles: ['Mobile Developer', 'Flutter Engineer'],
      min_salary: 15
    },
    resume_name: 'Meera_Sen_Mobile.pdf',
    resume_uploaded_at: '2026-08-30',
    profile_completion: 84
  },
  {
    candidate_id: 'cand-009',
    name: 'Tanya Bansal',
    email: 'tanya.bansal@example.com',
    phone: '+91 98100 45678',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    location: 'Noida, Uttar Pradesh',
    target_role: 'QA Automation Engineer',
    career_objective: 'Quality Assurance leader skilled in Cypress, Selenium, API automation, performance stress testing, and CI/CD quality gates.',
    skills: ['Cypress', 'Selenium', 'JavaScript', 'Python', 'Postman', 'API Testing', 'Jenkins', 'Jira', 'Performance Testing'],
    education: [
      {
        id: 'edu-9',
        degree: 'B.Tech in CSE',
        institution: 'Amity University, Noida',
        year: '2021',
        field: 'Computer Science',
        grade: '8.4 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-10',
        title: 'SDET II',
        company: 'TestRig Technologies',
        duration: '2021 - Present',
        description: 'Automated 1,400+ regression scenarios in Cypress, shortening sprint delivery cycles from 3 days to 4 hours.',
        years: 3.5
      }
    ],
    total_experience_years: 3.5,
    preferences: {
      preferred_locations: ['Noida', 'Gurugram', 'Remote'],
      work_types: ['Hybrid', 'Remote'],
      industries: ['SaaS', 'FinTech', 'E-commerce'],
      desired_roles: ['QA Automation Lead', 'SDET'],
      min_salary: 18
    },
    resume_name: 'Tanya_Bansal_QA.pdf',
    resume_uploaded_at: '2026-09-02',
    profile_completion: 86
  },
  {
    candidate_id: 'cand-010',
    name: 'Devendra Patel',
    email: 'devendra.patel@example.com',
    phone: '+91 97234 11229',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
    location: 'Ahmedabad, Gujarat',
    target_role: 'Cybersecurity Analyst',
    career_objective: 'Security engineer focused on threat modeling, vulnerability assessments, SOC incident response, and cloud security compliance.',
    skills: ['Cybersecurity', 'Vulnerability Assessment', 'SIEM', 'Network Security', 'Python', 'Linux', 'OWASP', 'Penetration Testing'],
    education: [
      {
        id: 'edu-10',
        degree: 'B.Tech in Information Security',
        institution: 'Dharmsinh Desai University',
        year: '2022',
        field: 'Cybersecurity',
        grade: '8.3 CGPA'
      }
    ],
    experience: [
      {
        id: 'exp-11',
        title: 'Information Security Analyst',
        company: 'ShieldGrid Security',
        duration: '2022 - Present',
        description: 'Audited cloud microservices against OWASP Top 10 and implemented ISO 27001 readiness checks.',
        years: 2.5
      }
    ],
    total_experience_years: 2.5,
    preferences: {
      preferred_locations: ['Ahmedabad', 'Pune', 'Remote'],
      work_types: ['Hybrid', 'Remote'],
      industries: ['CyberSecurity', 'Banking', 'FinTech'],
      desired_roles: ['Security Analyst', 'SOC Engineer'],
      min_salary: 15
    },
    resume_name: 'Devendra_Patel_Security.pdf',
    resume_uploaded_at: '2026-09-14',
    profile_completion: 80
  }
];

export const INITIAL_RECRUITERS: Recruiter[] = [
  {
    recruiter_id: 'rec-001',
    name: 'Sunita Mehra',
    company: 'NextWave Labs',
    company_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
    email: 'sunita.mehra@nextwavelabs.io',
    role: 'Talent Acquisition Director',
    company_description: 'NextWave Labs is an enterprise software accelerator building next-generation AI and cloud-native solutions for Fortune 500 innovators.',
    company_website: 'https://nextwavelabs.example.com',
    company_location: 'Bengaluru, Karnataka',
    industry: 'Enterprise SaaS'
  },
  {
    recruiter_id: 'rec-002',
    name: 'Rajesh Chhabra',
    company: 'FinPulse Mobility',
    company_logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=128&q=80',
    email: 'rajesh.c@finpulsemobility.com',
    role: 'Head of Engineering Recruitment',
    company_description: 'India\'s fastest growing digital banking and lending platform powering 15M+ secure transactions daily.',
    company_website: 'https://finpulsemobility.example.com',
    company_location: 'Bengaluru, Karnataka',
    industry: 'FinTech'
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    job_id: 'job-101',
    title: 'Senior Full Stack Engineer (React & Node)',
    company: 'NextWave Labs',
    company_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
    description: 'We are seeking an experienced Full Stack Engineer to architect high-performance distributed web applications using React, TypeScript, Node.js, and modern PostgreSQL backends. You will lead technical design for enterprise customer modules.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL', 'Tailwind CSS'],
    industry: 'Enterprise SaaS',
    location: 'Bengaluru, Karnataka',
    work_type: 'Remote',
    level: 'Senior',
    min_experience_years: 4,
    salary_range: '₹24L - ₹32L PA',
    responsibilities: [
      'Architect and build resilient web features with clean modular architecture',
      'Optimize GraphQL APIs and database queries for low latency and high availability',
      'Mentor junior engineers and champion automated testing and code reviews',
      'Collaborate with Product and Design teams to build frictionless user experiences'
    ],
    requirements: [
      '4+ years of professional full stack software engineering experience',
      'Deep fluency with React 18+, TypeScript, and Node.js runtime',
      'Hands-on experience with SQL schema design, migrations, and indexing in PostgreSQL',
      'Experience containerizing apps using Docker and deploying to cloud infrastructure'
    ],
    benefits: [
      '100% remote flexibility with ergonomic work-from-home stipend',
      'Comprehensive health insurance for employee and immediate family',
      'Annual learning & development allowance of ₹75,000',
      'Generous stock options (ESOPs) in a fast-scaling company'
    ],
    posted_at: '2026-09-28',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 14
  },
  {
    job_id: 'job-102',
    title: 'Machine Learning & NLP Specialist',
    company: 'NeuralWorks Tech',
    company_logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=128&q=80',
    description: 'Join our applied AI team building intelligent recommendation algorithms, vector search, and NLP transformer pipelines for enterprise content intelligence.',
    skills: ['Python', 'PyTorch', 'NLP', 'FastAPI', 'scikit-learn', 'Docker', 'MLOps', 'SQL'],
    industry: 'AI & Data',
    location: 'Hyderabad, Telangana',
    work_type: 'Hybrid',
    level: 'Mid Level',
    min_experience_years: 3,
    salary_range: '₹22L - ₹30L PA',
    responsibilities: [
      'Design, train, and benchmark NLP pipelines and recommendation engines',
      'Build low-latency inference APIs with FastAPI and Docker containerization',
      'Implement model monitoring, drift detection, and automated retraining pipelines',
      'Work alongside data engineers to process and structure multi-source datasets'
    ],
    requirements: [
      '3+ years of experience with Python, scikit-learn, and deep learning frameworks (PyTorch)',
      'Practical understanding of TF-IDF, embeddings, cosine similarity, and transformers',
      'Experience serving models in production with sub-50ms latency',
      'Strong mathematical foundation in linear algebra, probability, and statistics'
    ],
    benefits: [
      'Competitive compensation with performance bonuses',
      'High-spec AI development workstations and cloud GPU credits',
      'Flexible hybrid schedule (2 days in office in HITEC City)',
      'Wellness perks, gym membership, and catered healthy lunches'
    ],
    posted_at: '2026-09-26',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 9
  },
  {
    job_id: 'job-103',
    title: 'Cloud DevOps & Infrastructure Lead',
    company: 'CloudMatrix India',
    company_logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=128&q=80',
    description: 'Looking for a seasoned Cloud DevOps Lead to spearhead our Kubernetes automation, Terraform Infrastructure-as-Code, and zero-trust security postures across AWS.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Prometheus', 'Linux', 'Python'],
    industry: 'Cloud/Enterprise SaaS',
    location: 'Pune, Maharashtra',
    work_type: 'Remote',
    level: 'Lead',
    min_experience_years: 5,
    salary_range: '₹28L - ₹38L PA',
    responsibilities: [
      'Lead infrastructure strategy across multi-region Kubernetes clusters on AWS',
      'Enforce infrastructure-as-code principles using Terraform and GitOps',
      'Drive 99.99% uptime with robust Prometheus, Grafana, and automated alerting',
      'Build automated security scanning into GitHub Actions CI/CD workflows'
    ],
    requirements: [
      '5+ years leading DevOps or Site Reliability engineering teams',
      'Expert level hands-on expertise with AWS, EKS, Terraform, and Docker',
      'Strong scripting ability in Python, Bash, or Go for infrastructure automation',
      'Solid grasp of disaster recovery, VPC peering, and security compliance'
    ],
    benefits: [
      'Remote-first culture with flexible working hours',
      'Top-tier medical coverage with ₹10L insurance cover',
      'Annual global team retreats in exotic destinations',
      'Company-provided latest MacBook Pro and home setup budget'
    ],
    posted_at: '2026-09-27',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 6
  },
  {
    job_id: 'job-104',
    title: 'Senior Product Manager - Fintech Platforms',
    company: 'FinPulse Mobility',
    company_logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=128&q=80',
    description: 'Lead the next generation of consumer financial services at FinPulse. You will own the core digital lending product roadmap, user acquisition funnels, and analytics.',
    skills: ['Product Strategy', 'Agile/Scrum', 'User Research', 'SQL', 'Data Analytics', 'Figma', 'A/B Testing'],
    industry: 'FinTech',
    location: 'Bengaluru, Karnataka',
    work_type: 'Hybrid',
    level: 'Senior',
    min_experience_years: 4,
    salary_range: '₹26L - ₹35L PA',
    responsibilities: [
      'Define product vision, OKRs, and release roadmaps for credit products',
      'Perform user interviews, analyze telemetry data, and run rigorous A/B experiments',
      'Partner closely with Engineering, Compliance, Risk, and Marketing teams',
      'Write clear, actionable PRDs and user stories for development sprints'
    ],
    requirements: [
      '4+ years in product management at a tech product or fintech company',
      'Data fluency with SQL, product metrics (CAC, LTV, churn), and analytics tools',
      'Proven track record of launching successful consumer-facing features',
      'Exceptional stakeholder communication and cross-functional leadership'
    ],
    benefits: [
      'Lucrative incentive plan tied to product business impact',
      'Modern open-office in Koramangala with state-of-the-art facilities',
      'Generous parental leave policies and family health benefits',
      'Frequent company hackathons and innovation sprints'
    ],
    posted_at: '2026-09-25',
    status: 'active',
    recruiter_id: 'rec-002',
    applicant_count: 11
  },
  {
    job_id: 'job-105',
    title: 'Frontend UI/UX Engineer',
    company: 'InnovateX Software',
    company_logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=128&q=80',
    description: 'We are hunting for a design-savvy Frontend UI/UX Engineer who crafts pixel-perfect, accessible, and delightful interactive interfaces using React and modern CSS.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'Storybook'],
    industry: 'Enterprise SaaS',
    location: 'Bengaluru, Karnataka',
    work_type: 'Remote',
    level: 'Mid Level',
    min_experience_years: 2,
    salary_range: '₹15L - ₹22L PA',
    responsibilities: [
      'Translate Figma design mockups into responsive, modular React components',
      'Build smooth micro-interactions, dark mode themes, and fluid animations',
      'Ensure WCAG 2.1 AA accessibility standards and high Lighthouse performance',
      'Maintain and expand our shared design component library in Storybook'
    ],
    requirements: [
      '2+ years of intensive modern frontend development experience',
      'Proficiency in React, TypeScript, Tailwind CSS, and animation libraries',
      'Sharp visual design eye and appreciation for typography and spacing',
      'Experience with responsive layouts across mobile, tablet, and widescreen'
    ],
    benefits: [
      'Full work from home allowance with high-speed internet reimbursement',
      'Generous paid time off (28 days annual leave)',
      'Quarterly performance bonuses and rapid career growth tracks',
      'Annual tech conference pass sponsorship'
    ],
    posted_at: '2026-09-29',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 18
  },
  {
    job_id: 'job-106',
    title: 'High-Concurrency Java Backend Engineer',
    company: 'FinPulse Mobility',
    company_logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=128&q=80',
    description: 'Seeking a seasoned Java & Spring Boot engineer to build rock-solid payment processing pipelines, transaction settlements, and real-time fraud screening microservices.',
    skills: ['Java', 'Spring Boot', 'Kafka', 'Microservices', 'PostgreSQL', 'Redis', 'Docker'],
    industry: 'FinTech',
    location: 'Bengaluru, Karnataka',
    work_type: 'Hybrid',
    level: 'Senior',
    min_experience_years: 4,
    salary_range: '₹24L - ₹32L PA',
    responsibilities: [
      'Architect event-driven microservices using Spring Boot and Apache Kafka',
      'Ensure sub-second response times and 99.999% transaction reliability',
      'Implement distributed locks and caching layers with Redis',
      'Conduct rigorous code reviews and enforce automated unit and integration tests'
    ],
    requirements: [
      '4+ years building production-grade enterprise backends in Java & Spring Boot',
      'Deep knowledge of relational database indexing, ACID transactions, and query plans',
      'Practical experience with Kafka event streaming and distributed systems',
      'Strong debugging and profiling skills under heavy concurrent loads'
    ],
    benefits: [
      'Competitive base plus attractive stock units',
      'Hybrid convenience (flexible in-office days in Bengaluru)',
      'Subsidized transport and premium health insurance',
      'Sponsored certifications in Cloud and Architecture'
    ],
    posted_at: '2026-09-24',
    status: 'active',
    recruiter_id: 'rec-002',
    applicant_count: 8
  },
  {
    job_id: 'job-107',
    title: 'Business Intelligence & Data Analyst',
    company: 'HyperScale Data',
    company_logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=128&q=80',
    description: 'Transform large-scale e-commerce transactional data into actionable growth insights. You will develop automated reporting suites, cohort retention curves, and executive dashboards.',
    skills: ['SQL', 'Python', 'Power BI', 'Tableau', 'Pandas', 'ETL', 'Data Visualization'],
    industry: 'E-commerce',
    location: 'Mumbai, Maharashtra',
    work_type: 'Hybrid',
    level: 'Mid Level',
    min_experience_years: 2,
    salary_range: '₹14L - ₹20L PA',
    responsibilities: [
      'Build and maintain interactive Power BI and Tableau dashboards for leadership',
      'Write complex SQL queries, window functions, and optimize data warehouse views',
      'Partner with marketing and product leads to identify revenue optimization levers',
      'Automate repetitive reporting tasks using Python and Airflow jobs'
    ],
    requirements: [
      '2+ years experience in a data analytics or business intelligence role',
      'Expert proficiency in SQL and data manipulation with Python (Pandas/NumPy)',
      'Strong visual storytelling skills and business intuition',
      'Experience working with Snowflake, BigQuery, or Redshift is a major plus'
    ],
    benefits: [
      'Competitive salary with biannual appraisal cycles',
      'Central office in Bandra Kurla Complex (BKC), Mumbai',
      'Continuous learning subscriptions (DataCamp, Coursera)',
      'Comprehensive medical insurance and wellness stipends'
    ],
    posted_at: '2026-09-23',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 15
  },
  {
    job_id: 'job-108',
    title: 'Flutter Mobile App Developer',
    company: 'HealthPlus Diagnostics',
    company_logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=128&q=80',
    description: 'Help us revolutionize patient care by crafting intuitive, responsive mobile apps on Flutter for tele-consultation, lab report tracking, and health telemetry.',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST API', 'State Management', 'Git', 'iOS', 'Android'],
    industry: 'HealthTech',
    location: 'Remote',
    work_type: 'Remote',
    level: 'Mid Level',
    min_experience_years: 2,
    salary_range: '₹14L - ₹20L PA',
    responsibilities: [
      'Develop smooth cross-platform mobile apps for Android & iOS using Flutter',
      'Integrate Bluetooth medical device telemetry and real-time video consultations',
      'Implement robust offline caching and secure token-based authentication',
      'Manage app store submission and continuous beta testing via TestFlight'
    ],
    requirements: [
      '2+ years practical Flutter & Dart experience with published apps in stores',
      'Experience with state management libraries (Bloc, Riverpod, or Provider)',
      'Solid understanding of mobile memory management, animations, and battery efficiency',
      'Familiarity with HIPAA or patient data privacy guidelines'
    ],
    benefits: [
      'Work from anywhere in India with complete remote setup support',
      'Annual health checkups and teleconsultation for entire family',
      'Flexible working hours with core overlap window',
      'Friendly, mission-driven team dedicated to healthcare impact'
    ],
    posted_at: '2026-09-22',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 12
  },
  {
    job_id: 'job-109',
    title: 'QA Automation Engineer (SDET)',
    company: 'FinPulse Mobility',
    company_logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=128&q=80',
    description: 'Ensure unflinching reliability for financial checkout engines. You will design automated regression suites with Cypress, mock financial APIs, and run performance benchmarks.',
    skills: ['Cypress', 'JavaScript', 'Postman', 'API Testing', 'Jenkins', 'Selenium', 'SQL'],
    industry: 'FinTech',
    location: 'Gurugram, Haryana',
    work_type: 'Hybrid',
    level: 'Mid Level',
    min_experience_years: 3,
    salary_range: '₹16L - ₹22L PA',
    responsibilities: [
      'Build end-to-end automated testing suites in Cypress for web and API layers',
      'Embed automated quality gates into Jenkins CI/CD pipelines',
      'Execute load and stress testing using k6 and JMeter',
      'Investigate bug reports and work closely with developers to reproduce edge cases'
    ],
    requirements: [
      '3+ years in QA automation or software development in test',
      'Proficiency in JavaScript/TypeScript and hands-on Cypress or Playwright experience',
      'Strong grasp of REST API testing and database assertion verification',
      'Passionate about code quality and test-driven engineering culture'
    ],
    benefits: [
      'Hybrid schedule in Cyber City, Gurugram',
      'Competitive salary package with annual loyalty bonuses',
      'Comprehensive healthcare and accident cover',
      'Regular team building outings and hack days'
    ],
    posted_at: '2026-09-21',
    status: 'active',
    recruiter_id: 'rec-002',
    applicant_count: 10
  },
  {
    job_id: 'job-110',
    title: 'Information Security & Compliance Analyst',
    company: 'SecureNet Cyberworks',
    company_logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=128&q=80',
    description: 'Protect cloud services from modern attack vectors. You will perform vulnerability scans, review network security perimeters, and assist in SOC 2 and ISO 27001 compliance.',
    skills: ['Cybersecurity', 'Vulnerability Assessment', 'Linux', 'Network Security', 'OWASP', 'Python', 'SIEM'],
    industry: 'CyberSecurity',
    location: 'Pune, Maharashtra',
    work_type: 'Hybrid',
    level: 'Entry Level',
    min_experience_years: 2,
    salary_range: '₹13L - ₹18L PA',
    responsibilities: [
      'Perform regular vulnerability assessments and penetration test remediations',
      'Monitor SIEM alerts and conduct initial triage for suspicious network events',
      'Assist in internal security audits and developer security best practice workshops',
      'Maintain security policies, incident response runbooks, and risk registers'
    ],
    requirements: [
      '2+ years experience in cybersecurity operations or security engineering',
      'Familiarity with OWASP Top 10 vulnerabilities and modern defense strategies',
      'Understanding of Linux system administration and TCP/IP networking',
      'Security certifications like CEH, CompTIA Security+, or AWS Security are advantageous'
    ],
    benefits: [
      'Certification reimbursement (CISSP, CEH, AWS Security)',
      'Subsidized meal passes and modern campus in Hinjewadi, Pune',
      'Health insurance including parents coverage',
      'Fast-track leadership development program'
    ],
    posted_at: '2026-09-20',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 7
  },
  {
    job_id: 'job-111',
    title: 'Frontend React Developer (Design Systems)',
    company: 'NextWave Labs',
    company_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
    description: 'Build enterprise-grade UI components, themes, and interactive dashboards. Looking for deep React and TypeScript expertise with a focus on web performance.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Storybook', 'GraphQL'],
    industry: 'Enterprise SaaS',
    location: 'Bengaluru, Karnataka',
    work_type: 'Remote',
    level: 'Mid Level',
    min_experience_years: 3,
    salary_range: '₹18L - ₹25L PA',
    responsibilities: [
      'Implement reusable UI design tokens, primitives, and accessible widgets',
      'Collaborate with UX researchers to prototype high-fidelity components',
      'Benchmark frontend rendering performance and eliminate unnecessary re-renders',
      'Participate in RFCs and architecture discussions for frontend standards'
    ],
    requirements: [
      '3+ years of experience with React, TypeScript, and modern CSS architecture',
      'Experience building or maintaining reusable UI component libraries',
      'Deep familiarity with React Hooks, Context, and state management',
      'Strong eye for detail, spacing, typography, and motion design'
    ],
    benefits: [
      'Fully remote with flexible working hours',
      'Comprehensive wellness program and fitness reimbursement',
      'Home office setup budget up to ₹50,000',
      'Annual equity grant refreshed based on performance'
    ],
    posted_at: '2026-09-19',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 22
  },
  {
    job_id: 'job-112',
    title: 'AI Prompt & Evaluation Engineer',
    company: 'NeuralWorks Tech',
    company_logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=128&q=80',
    description: 'Help evaluate and optimize state-of-the-art LLM prompts, agent workflows, and automated evaluation frameworks to ensure high fidelity and safety.',
    skills: ['Python', 'NLP', 'FastAPI', 'MLOps', 'SQL', 'Hugging Face'],
    industry: 'AI & Data',
    location: 'Hyderabad, Telangana',
    work_type: 'Remote',
    level: 'Mid Level',
    min_experience_years: 2,
    salary_range: '₹18L - ₹24L PA',
    responsibilities: [
      'Formulate systematic evaluation datasets to benchmark LLM outputs and safety',
      'Implement automated prompt tuning and retrieval-augmented generation (RAG)',
      'Analyze output variance and hallucinatory behaviors using statistical NLP tests',
      'Write Python tooling to inspect embedding similarity and ranking scores'
    ],
    requirements: [
      '2+ years in software or data engineering with hands-on generative AI exposure',
      'Fluency in Python, regex, and structured JSON parsing',
      'Familiarity with embeddings, vector search, and tokenization techniques',
      'Strong analytical and communicative reasoning skills'
    ],
    benefits: [
      'Pioneering work in cutting-edge generative AI research',
      'Fully remote with work travel to Hyderabad offsites twice a year',
      'Generous paid time off and mental health days',
      'Subsidized conference travel and publication sponsorships'
    ],
    posted_at: '2026-09-18',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 17
  },
  {
    job_id: 'job-113',
    title: 'Site Reliability Engineer (SRE)',
    company: 'CloudMatrix India',
    company_logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=128&q=80',
    description: 'Ensure high reliability, resilience, and operational excellence across our global cloud footprint. You will automate incident response and eliminate manual toil.',
    skills: ['Kubernetes', 'AWS', 'Linux', 'Terraform', 'Prometheus', 'CI/CD', 'Python'],
    industry: 'Cloud/Enterprise SaaS',
    location: 'Pune, Maharashtra',
    work_type: 'Hybrid',
    level: 'Senior',
    min_experience_years: 4,
    salary_range: '₹22L - ₹30L PA',
    responsibilities: [
      'Define Service Level Objectives (SLOs) and Error Budgets with product teams',
      'Automate chaos engineering experiments to surface resiliency bottlenecks',
      'Improve incident management workflows and conduct blameless post-mortems',
      'Optimize AWS infrastructure costs through autoscaling and rightsizing'
    ],
    requirements: [
      '4+ years experience in SRE, Systems Engineering, or Cloud Operations',
      'Hands-on expertise with Linux internals, networking protocols, and Kubernetes',
      'Strong scripting and automation proficiency in Python or Go',
      'Experience managing on-call rotations with automated escalation policies'
    ],
    benefits: [
      'Generous on-call shift bonuses and comp-offs',
      'Competitive salary with annual stock bonuses',
      'Hybrid work model (3 days remote, 2 days office in Pune)',
      'Comprehensive family insurance with parents included'
    ],
    posted_at: '2026-09-17',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 5
  },
  {
    job_id: 'job-114',
    title: 'Associate Product Manager',
    company: 'NextWave Labs',
    company_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=128&q=80',
    description: 'Great opportunity for an ambitious APM to kickstart their product management career in B2B SaaS. You will assist in customer discovery, feature specifications, and agile execution.',
    skills: ['Product Strategy', 'Agile/Scrum', 'User Research', 'SQL', 'Jira', 'Wireframing'],
    industry: 'Enterprise SaaS',
    location: 'Bengaluru, Karnataka',
    work_type: 'On-site',
    level: 'Entry Level',
    min_experience_years: 1,
    salary_range: '₹12L - ₹16L PA',
    responsibilities: [
      'Conduct customer interviews and summarize actionable feature requests',
      'Draft user stories and acceptance criteria for engineering sprints',
      'Run weekly sprint ceremonies and track team velocity in Jira',
      'Monitor launch analytics and user feedback for continuous iteration'
    ],
    requirements: [
      '1-2 years experience in product, business analysis, or technical consulting',
      'Solid problem structuring and written communication skills',
      'Familiarity with agile methodologies and basic SQL for data queries',
      'Passionate about software UX and digital product innovation'
    ],
    benefits: [
      'Direct mentorship from seasoned VP of Product',
      'Fun, collaborative work culture in Indiranagar, Bengaluru',
      'Catered breakfast and snacks in office daily',
      'Rapid promotion path based on merit and impact'
    ],
    posted_at: '2026-09-16',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 31
  },
  {
    job_id: 'job-115',
    title: 'Lead React Native Mobile Architect',
    company: 'FinPulse Mobility',
    company_logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=128&q=80',
    description: 'Lead mobile development for our flagship consumer lending application. You will oversee architecture, offline-first data sync, security hardening, and native bridge modules.',
    skills: ['React Native', 'TypeScript', 'React', 'iOS', 'Android', 'REST API', 'Firebase'],
    industry: 'FinTech',
    location: 'Bengaluru, Karnataka',
    work_type: 'Hybrid',
    level: 'Lead',
    min_experience_years: 5,
    salary_range: '₹30L - ₹42L PA',
    responsibilities: [
      'Architect modular, scalable React Native mobile architecture for 10M+ users',
      'Write custom native modules in Swift and Kotlin where required',
      'Optimize app startup time, JS bundle size, and memory footprint',
      'Establish automated mobile CI/CD pipelines with Fastlane and GitHub Actions'
    ],
    requirements: [
      '5+ years building commercial mobile applications, with 3+ years in React Native',
      'Deep understanding of React Native bridge, New Architecture (TurboModules), and reanimated',
      'Experience with sensitive financial transactions and biometric authentication',
      'Proven leadership skills mentoring cross-functional mobile engineers'
    ],
    benefits: [
      'High-tier executive compensation and equity package',
      'Executive health checkups and premium insurance coverage',
      'Flexible hybrid schedule with modern tech workspace',
      'Generous relocation support for candidates outside Bengaluru'
    ],
    posted_at: '2026-09-15',
    status: 'active',
    recruiter_id: 'rec-002',
    applicant_count: 7
  },
  {
    job_id: 'job-116',
    title: 'Senior Data Engineer (Pipelines & Warehousing)',
    company: 'HyperScale Data',
    company_logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=128&q=80',
    description: 'Build real-time ETL pipelines and scalable analytical warehouses processing petabytes of e-commerce behavior data. Seeking strong SQL, Python, and cloud data stack skills.',
    skills: ['Python', 'SQL', 'ETL', 'Docker', 'PostgreSQL', 'AWS', 'Kafka'],
    industry: 'E-commerce',
    location: 'Mumbai, Maharashtra',
    work_type: 'Remote',
    level: 'Senior',
    min_experience_years: 4,
    salary_range: '₹22L - ₹32L PA',
    responsibilities: [
      'Architect robust data extraction, transformation, and load (ETL) pipelines',
      'Design dimensional schemas and star models for analytical reporting',
      'Monitor data quality, freshness, and lineage across data lakes',
      'Partner with data scientists and analysts to optimize query performance'
    ],
    requirements: [
      '4+ years building production data pipelines and analytics storage systems',
      'Mastery of advanced SQL and Python data frameworks',
      'Experience with distributed data processing and workflow orchestrators (Airflow/Prefect)',
      'Strong grasp of database partitioning, clustering, and performance tuning'
    ],
    benefits: [
      '100% remote anywhere in India',
      'Flexible working hours with emphasis on async collaboration',
      'Generous annual tech budget and home office grant',
      'Comprehensive health coverage for entire family'
    ],
    posted_at: '2026-09-14',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 13
  },
  {
    job_id: 'job-117',
    title: 'Backend Node.js Microservices Developer',
    company: 'InnovateX Software',
    company_logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=128&q=80',
    description: 'Develop high-throughput REST and WebSocket backends for our collaborative document suite. Looking for strong TypeScript, Node.js, and Redis caching abilities.',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'REST API', 'GraphQL'],
    industry: 'Enterprise SaaS',
    location: 'Bengaluru, Karnataka',
    work_type: 'Remote',
    level: 'Mid Level',
    min_experience_years: 3,
    salary_range: '₹18L - ₹26L PA',
    responsibilities: [
      'Develop modular backend services using Node.js, TypeScript, and Express/Fastify',
      'Implement real-time collaborative state sync using WebSockets and Redis pub/sub',
      'Design clean relational databases with PostgreSQL and Prisma/Drizzle ORM',
      'Write comprehensive unit tests with Jest and integration test fixtures'
    ],
    requirements: [
      '3+ years professional backend engineering experience with Node.js',
      'Strong TypeScript skills and asynchronous programming fundamentals',
      'Solid understanding of database transactions, connection pooling, and indexing',
      'Experience designing clean, self-documenting REST and GraphQL endpoints'
    ],
    benefits: [
      'Competitive fixed salary plus annual company performance bonus',
      'Flexible remote policy with co-working space access anywhere in India',
      '₹60,000 yearly education and book stipend',
      'Comprehensive medical insurance'
    ],
    posted_at: '2026-09-13',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 19
  },
  {
    job_id: 'job-118',
    title: 'EdTech Full Stack Developer',
    company: 'EduSphere Learning',
    company_logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=128&q=80',
    description: 'Help us make quality education accessible to millions of students. You will build interactive quiz engines, video delivery systems, and student progress dashboards.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    industry: 'EdTech',
    location: 'Noida, Uttar Pradesh',
    work_type: 'Hybrid',
    level: 'Mid Level',
    min_experience_years: 2,
    salary_range: '₹14L - ₹20L PA',
    responsibilities: [
      'Build responsive web interfaces for video streaming and live student quizzes',
      'Create performant backend services for student attendance and score tracking',
      'Integrate third-party payment gateways and SMS notifications',
      'Optimize web assets for smooth loading on slow mobile network connections'
    ],
    requirements: [
      '2+ years in full stack web development using React and Node.js',
      'Good familiarity with relational databases and RESTful API conventions',
      'Passion for education and improving learning outcomes through technology',
      'Ability to move quickly in an agile, collaborative startup environment'
    ],
    benefits: [
      'Hybrid schedule in Sector 62, Noida',
      'Free lifetime access to EduSphere learning catalog for family',
      'Health and accidental insurance coverage',
      'Frequent company hackathons and sports events'
    ],
    posted_at: '2026-09-12',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 16
  },
  {
    job_id: 'job-119',
    title: 'Lead Security Operations Engineer (SOC)',
    company: 'SecureNet Cyberworks',
    company_logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=128&q=80',
    description: 'Lead 24/7 Security Operations Center monitoring, incident response forensics, and automated threat hunting across critical financial client workloads.',
    skills: ['Cybersecurity', 'SIEM', 'Network Security', 'Vulnerability Assessment', 'Linux', 'Python'],
    industry: 'CyberSecurity',
    location: 'Pune, Maharashtra',
    work_type: 'On-site',
    level: 'Lead',
    min_experience_years: 5,
    salary_range: '₹25L - ₹36L PA',
    responsibilities: [
      'Lead tactical incident response during high-severity security breaches',
      'Develop automated detection playbooks in SIEM and SOAR platforms',
      'Perform root cause forensic analysis on compromised endpoints and cloud assets',
      'Coordinate with CISO and legal teams during incident reporting disclosures'
    ],
    requirements: [
      '5+ years in security operations, threat hunting, or digital forensics',
      'In-depth knowledge of MITRE ATT&CK framework and threat actor tactics',
      'Deep Linux and Windows system forensics and log analysis expertise',
      'Strong leadership presence and clear crisis communication capability'
    ],
    benefits: [
      'Industry-leading compensation with retention bonuses',
      'High-security modern command center facilities in Pune',
      'Executive medical coverage including parents and in-laws',
      'Annual sponsorship for DEF CON / Black Hat attendance'
    ],
    posted_at: '2026-09-11',
    status: 'active',
    recruiter_id: 'rec-001',
    applicant_count: 4
  },
  {
    job_id: 'job-120',
    title: 'Software Development Engineer in Test (SDET - Java)',
    company: 'FinPulse Mobility',
    company_logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=128&q=80',
    description: 'Design robust automated test frameworks for core banking transaction flows in Java. You will test microservice contracts, simulate network partitioning, and build CI gates.',
    skills: ['Java', 'Selenium', 'API Testing', 'Postman', 'Spring Boot', 'SQL', 'Jenkins'],
    industry: 'FinTech',
    location: 'Bengaluru, Karnataka',
    work_type: 'Hybrid',
    level: 'Mid Level',
    min_experience_years: 3,
    salary_range: '₹17L - ₹24L PA',
    responsibilities: [
      'Develop Java-based automation frameworks using TestNG, RestAssured, and Selenium',
      'Automate API contract verification for banking integrations',
      'Implement simulated network degradation and chaos tests on payment services',
      'Collaborate with backend engineers to improve testability and code coverage'
    ],
    requirements: [
      '3+ years experience as SDET building Java-based automation frameworks',
      'Strong understanding of OOP principles, multithreading, and REST architecture',
      'Experience testing distributed microservices and database consistency',
      'Proficiency with Git, Docker, and CI/CD automation'
    ],
    benefits: [
      'Competitive compensation package with performance equity',
      'Hybrid work model (2 days in office in Bengaluru)',
      'Comprehensive healthcare and annual health checkup packages',
      'Continuous technical growth and mentorship opportunities'
    ],
    posted_at: '2026-09-10',
    status: 'active',
    recruiter_id: 'rec-002',
    applicant_count: 8
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    application_id: 'app-001',
    candidate_id: 'cand-001',
    job_id: 'job-101',
    status: 'Interview',
    applied_at: '2026-09-29T10:30:00Z',
    updated_at: '2026-10-01T14:20:00Z',
    notes: 'Technical round scheduled for System Architecture discussion.',
    timeline: [
      { status: 'Applied', date: '2026-09-29', comment: 'Application received via CareerPulse AI matching engine.' },
      { status: 'Under Review', date: '2026-09-30', comment: 'Resume and profile shortlisted by Recruiter Sunita Mehra (Match score 94%).' },
      { status: 'Interview', date: '2026-10-01', comment: 'Technical Round 1 scheduled with Principal Architect.' }
    ]
  },
  {
    application_id: 'app-002',
    candidate_id: 'cand-001',
    job_id: 'job-105',
    status: 'Under Review',
    applied_at: '2026-09-30T11:15:00Z',
    updated_at: '2026-09-30T16:00:00Z',
    notes: 'Reviewing portfolio and design system implementations.',
    timeline: [
      { status: 'Applied', date: '2026-09-30', comment: 'Application submitted with verified GitHub profile.' },
      { status: 'Under Review', date: '2026-09-30', comment: 'Hiring manager reviewing UI examples.' }
    ]
  },
  {
    application_id: 'app-003',
    candidate_id: 'cand-001',
    job_id: 'job-111',
    status: 'Applied',
    applied_at: '2026-10-01T08:00:00Z',
    updated_at: '2026-10-01T08:00:00Z',
    notes: 'Pending initial recruiter review.',
    timeline: [
      { status: 'Applied', date: '2026-10-01', comment: 'Application submitted. Top 5% match score calculated.' }
    ]
  },
  {
    application_id: 'app-004',
    candidate_id: 'cand-002',
    job_id: 'job-102',
    status: 'Offer',
    applied_at: '2026-09-20T09:00:00Z',
    updated_at: '2026-09-30T17:45:00Z',
    notes: 'Offer letter extended. Compensation package under review by candidate.',
    timeline: [
      { status: 'Applied', date: '2026-09-20', comment: 'Application received.' },
      { status: 'Under Review', date: '2026-09-22', comment: 'High match score (96%). Sent to AI Research lead.' },
      { status: 'Interview', date: '2026-09-26', comment: 'Completed ML coding & Transformer architecture panel.' },
      { status: 'Offer', date: '2026-09-30', comment: 'Formal offer extended for Senior ML Engineer role.' }
    ]
  },
  {
    application_id: 'app-005',
    candidate_id: 'cand-003',
    job_id: 'job-103',
    status: 'Interview',
    applied_at: '2026-09-27T12:00:00Z',
    updated_at: '2026-09-29T15:30:00Z',
    notes: 'DevOps live troubleshooting and Terraform lab completed.',
    timeline: [
      { status: 'Applied', date: '2026-09-27', comment: 'Applied via CareerPulse.' },
      { status: 'Under Review', date: '2026-09-28', comment: 'Candidate profile reviewed.' },
      { status: 'Interview', date: '2026-09-29', comment: 'AWS multi-region failover design round scheduled.' }
    ]
  },
  {
    application_id: 'app-006',
    candidate_id: 'cand-004',
    job_id: 'job-104',
    status: 'Under Review',
    applied_at: '2026-09-26T14:00:00Z',
    updated_at: '2026-09-28T10:00:00Z',
    notes: 'Reviewing FinTech product metrics and case study submission.',
    timeline: [
      { status: 'Applied', date: '2026-09-26', comment: 'Applied for Senior Product Manager.' },
      { status: 'Under Review', date: '2026-09-28', comment: 'Product case study assigned to candidate.' }
    ]
  },
  {
    application_id: 'app-007',
    candidate_id: 'cand-007',
    job_id: 'job-106',
    status: 'Interview',
    applied_at: '2026-09-25T11:00:00Z',
    updated_at: '2026-09-29T11:00:00Z',
    notes: 'Kafka event streaming and concurrency architecture discussion.',
    timeline: [
      { status: 'Applied', date: '2026-09-25', comment: 'Application submitted.' },
      { status: 'Under Review', date: '2026-09-26', comment: 'Technical screening passed.' },
      { status: 'Interview', date: '2026-09-29', comment: 'Virtual round with Engineering Manager.' }
    ]
  }
];
