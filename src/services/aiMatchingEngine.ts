import { Candidate, Job, MatchBreakdown, TfidfTokenWeight } from '../types';

// Standard English stop words + common job posting boilerplates
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as',
  'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t',
  'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having',
  'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its',
  'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on',
  'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t',
  'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s',
  'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d',
  'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very',
  'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when',
  'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves',
  'looking', 'role', 'team', 'opportunity', 'work', 'working', 'responsibilities', 'responsible', 'requirements',
  'experience', 'years', 'join', 'company', 'candidate', 'ideal', 'ability', 'strong', 'good', 'knowledge'
]);

/**
 * Tokenize, lowercase, and filter stopwords
 */
export function tokenizeAndClean(text: string): string[] {
  if (!text) return [];
  // Keep tech terms like c++, c#, .net intact by replacing special chars thoughtfully
  const normalized = text
    .toLowerCase()
    .replace(/c\+\+/g, 'cpp')
    .replace(/c#/g, 'csharp')
    .replace(/\.net/g, 'dotnet')
    .replace(/node\.js/g, 'nodejs')
    .replace(/react\.js/g, 'react')
    .replace(/vue\.js/g, 'vue')
    .replace(/[^a-z0-9\s]/g, ' ');

  const tokens = normalized.split(/\s+/).filter(token => token.length > 1 && !STOP_WORDS.has(token));
  return tokens;
}

/**
 * Calculate Term Frequency (TF) for a document
 */
export function calculateTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  if (tokens.length === 0) return tf;

  const counts = new Map<string, number>();
  for (const token of tokens) {
    counts.set(token, (counts.get(token) || 0) + 1);
  }

  // Normalized TF = count / total_tokens
  for (const [token, count] of counts.entries()) {
    tf.set(token, count / tokens.length);
  }
  return tf;
}

/**
 * Calculate Inverse Document Frequency (IDF) over a corpus of documents
 */
export function calculateIDF(documents: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const totalDocs = documents.length;
  if (totalDocs === 0) return idf;

  const docFreq = new Map<string, number>();

  for (const docTokens of documents) {
    const uniqueTokens = new Set(docTokens);
    for (const token of uniqueTokens) {
      docFreq.set(token, (docFreq.get(token) || 0) + 1);
    }
  }

  // Standard smooth IDF: log((N + 1) / (df + 1)) + 1
  for (const [token, df] of docFreq.entries()) {
    const val = Math.log((totalDocs + 1) / (df + 1)) + 1;
    idf.set(token, val);
  }

  return idf;
}

/**
 * Compute TF-IDF vector as a term -> weight map
 */
export function computeTfidfVector(tokens: string[], idf: Map<string, number>): Map<string, number> {
  const tf = calculateTF(tokens);
  const tfidf = new Map<string, number>();

  let sumSquares = 0;
  for (const [token, tfVal] of tf.entries()) {
    const idfVal = idf.get(token) || 1.0;
    const weight = tfVal * idfVal;
    tfidf.set(token, weight);
    sumSquares += weight * weight;
  }

  // L2 normalize
  const norm = Math.sqrt(sumSquares);
  if (norm > 0) {
    for (const [token, weight] of tfidf.entries()) {
      tfidf.set(token, weight / norm);
    }
  }

  return tfidf;
}

/**
 * Compute Cosine Similarity between two L2-normalized TF-IDF vectors
 */
export function cosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
  let dotProduct = 0;
  // Iterate through smaller vector
  const [smaller, larger] = vecA.size <= vecB.size ? [vecA, vecB] : [vecB, vecA];

  for (const [term, valA] of smaller.entries()) {
    const valB = larger.get(term);
    if (valB !== undefined) {
      dotProduct += valA * valB;
    }
  }

  return Math.min(Math.max(dotProduct, 0), 1);
}

/**
 * Build candidate textual corpus string
 */
export function getCandidateCorpusText(candidate: Candidate): string {
  const parts = [
    candidate.target_role,
    candidate.career_objective,
    candidate.skills.join(' '),
    candidate.preferences.desired_roles.join(' '),
    candidate.preferences.industries.join(' '),
    candidate.experience.map(e => `${e.title} at ${e.company}. ${e.description}`).join(' '),
    candidate.education.map(e => `${e.degree} in ${e.field} from ${e.institution}`).join(' ')
  ];
  return parts.filter(Boolean).join(' ');
}

/**
 * Build job textual corpus string
 */
export function getJobCorpusText(job: Job): string {
  const parts = [
    job.title,
    job.industry,
    job.skills.join(' '),
    job.description,
    job.responsibilities.join(' '),
    job.requirements.join(' ')
  ];
  return parts.filter(Boolean).join(' ');
}

/**
 * Multi-factor matching engine combining:
 * 1. TF-IDF + Cosine Similarity (Text NLP)
 * 2. Skills Overlap (Direct key competencies)
 * 3. Role Compatibility
 * 4. Location Match
 * 5. Work Type Match
 * 6. Experience Match
 */
export function calculateJobMatch(candidate: Candidate, job: Job, globalIdf?: Map<string, number>): MatchBreakdown {
  // 1. Text NLP Match via TF-IDF & Cosine Similarity
  const candidateText = getCandidateCorpusText(candidate);
  const jobText = getJobCorpusText(job);

  const candidateTokens = tokenizeAndClean(candidateText);
  const jobTokens = tokenizeAndClean(jobText);

  // If no global IDF is provided, compute on the two-doc miniature corpus or fallback
  const idf = globalIdf || calculateIDF([candidateTokens, jobTokens]);

  const candVector = computeTfidfVector(candidateTokens, idf);
  const jobVector = computeTfidfVector(jobTokens, idf);

  const rawCosine = cosineSimilarity(candVector, jobVector);
  // Scale raw cosine (which typically falls between 0.15 and 0.85 in short texts) to 0-100
  const textSimilarityScore = Math.min(100, Math.round(Math.min(rawCosine * 140, 100)));

  // 2. Skills Overlap Match
  const candidateSkillsLower = new Set(candidate.skills.map(s => s.toLowerCase().trim()));
  const jobSkillsLower = job.skills.map(s => s.toLowerCase().trim());

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of job.skills) {
    const sLower = skill.toLowerCase().trim();
    if (candidateSkillsLower.has(sLower)) {
      matchedSkills.push(skill);
    } else {
      // Check partial match (e.g. "React.js" matches "React")
      const partial = Array.from(candidateSkillsLower).some(candS =>
        candS.includes(sLower) || sLower.includes(candS)
      );
      if (partial) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }
  }

  const skillsScore = job.skills.length > 0
    ? Math.round((matchedSkills.length / job.skills.length) * 100)
    : 70;

  // 3. Role Compatibility Match
  const targetRoles = [candidate.target_role, ...(candidate.preferences.desired_roles || [])]
    .map(r => r.toLowerCase().trim());
  const jobTitleLower = job.title.toLowerCase();

  let roleScore = 50;
  if (targetRoles.some(r => jobTitleLower.includes(r) || r.includes(jobTitleLower))) {
    roleScore = 95;
  } else {
    // Check keyword overlap in titles
    const titleWords = tokenizeAndClean(job.title);
    const targetWords = tokenizeAndClean(targetRoles.join(' '));
    const overlap = titleWords.filter(w => targetWords.includes(w));
    if (overlap.length >= 2) {
      roleScore = 85;
    } else if (overlap.length === 1) {
      roleScore = 70;
    }
  }

  // 4. Location Match
  let locationScore = 60;
  const candLocs = [candidate.location, ...(candidate.preferences.preferred_locations || [])]
    .map(l => l.toLowerCase().trim());
  const jobLocLower = job.location.toLowerCase();

  if (job.work_type === 'Remote' || candLocs.includes('remote') || candLocs.includes('anywhere')) {
    locationScore = 100;
  } else if (candLocs.some(loc => jobLocLower.includes(loc) || loc.includes(jobLocLower))) {
    locationScore = 95;
  } else if (job.work_type === 'Hybrid') {
    locationScore = 75;
  } else {
    locationScore = 40;
  }

  // 5. Work Type Match
  let workTypeScore = 70;
  const prefWorkTypes = candidate.preferences.work_types || [];
  if (prefWorkTypes.length === 0 || prefWorkTypes.includes(job.work_type)) {
    workTypeScore = 100;
  } else if (job.work_type === 'Hybrid' && prefWorkTypes.includes('Remote')) {
    workTypeScore = 80;
  } else {
    workTypeScore = 45;
  }

  // 6. Experience Match
  const candYears = candidate.total_experience_years || 0;
  const reqYears = job.min_experience_years || 0;
  let experienceScore = 75;

  if (candYears >= reqYears) {
    if (candYears <= reqYears + 4) {
      experienceScore = 100;
    } else {
      experienceScore = 85; // slightly overqualified
    }
  } else {
    const gap = reqYears - candYears;
    if (gap <= 1) {
      experienceScore = 80;
    } else if (gap <= 2) {
      experienceScore = 60;
    } else {
      experienceScore = 35;
    }
  }

  // Combined Multi-Signal Synthesis:
  // Weights: Skills (35%), Text NLP (25%), Role (15%), Location (10%), Work Type (10%), Experience (5%)
  const weightedTotal =
    skillsScore * 0.35 +
    textSimilarityScore * 0.25 +
    roleScore * 0.15 +
    locationScore * 0.10 +
    workTypeScore * 0.10 +
    experienceScore * 0.05;

  const overallScore = Math.min(99, Math.max(35, Math.round(weightedTotal)));

  // Generate plain-language, non-technical explanation
  let strengthAdjective = 'Moderate';
  if (overallScore >= 88) strengthAdjective = 'Strong';
  else if (overallScore >= 75) strengthAdjective = 'Solid';
  else if (overallScore >= 60) strengthAdjective = 'Promising';

  const matchedSkillsPreview = matchedSkills.slice(0, 3).join(', ');
  const workTypeNote = (job.work_type === 'Remote' || prefWorkTypes.includes(job.work_type))
    ? ` and your preferred ${job.work_type.toLowerCase()} work type`
    : '';

  const explanation = matchedSkills.length > 0
    ? `${strengthAdjective} match based on ${matchedSkillsPreview}${matchedSkills.length > 3 ? ` and ${matchedSkills.length - 3} other skills` : ''}${workTypeNote}.`
    : `${strengthAdjective} match aligned with your experience profile in ${candidate.target_role}.`;

  // Prepare TF-IDF math breakdown for jury / presentation mode
  const candidateTopTerms: TfidfTokenWeight[] = Array.from(candVector.entries())
    .map(([term, weight]) => ({ term, weight: Number(weight.toFixed(4)) }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 8);

  const jobTopTerms: TfidfTokenWeight[] = Array.from(jobVector.entries())
    .map(([term, weight]) => ({ term, weight: Number(weight.toFixed(4)) }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 8);

  const sharedTerms: TfidfTokenWeight[] = [];
  for (const [term, candWeight] of candVector.entries()) {
    const jobWeight = jobVector.get(term);
    if (jobWeight !== undefined) {
      sharedTerms.push({
        term,
        weight: Number((candWeight * jobWeight).toFixed(4))
      });
    }
  }
  sharedTerms.sort((a, b) => b.weight - a.weight);

  return {
    overallScore,
    skillsScore,
    skillsMatched: matchedSkills,
    skillsMissing: missingSkills,
    roleScore,
    locationScore,
    workTypeScore,
    experienceScore,
    textSimilarityScore,
    explanation,
    tfidfDetails: {
      candidateTopTerms,
      jobTopTerms,
      sharedTerms: sharedTerms.slice(0, 8),
      rawCosineSim: Number(rawCosine.toFixed(4))
    }
  };
}
