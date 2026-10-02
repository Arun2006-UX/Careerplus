import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Layers,
  Cpu,
  Sparkles,
  ArrowRight,
  Database,
  Code,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sliders,
  Play,
  RotateCcw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  tokenizeAndClean,
  getCandidateCorpusText,
  getJobCorpusText,
  calculateJobMatch
} from '../services/aiMatchingEngine';

export const PresentationModePage: React.FC = () => {
  const { candidates, jobs, globalIdf } = useApp();

  const [selectedCandId, setSelectedCandId] = useState<string>(candidates[0].candidate_id);
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0].job_id);

  const selectedCandidate = candidates.find(c => c.candidate_id === selectedCandId) || candidates[0];
  const selectedJob = jobs.find(j => j.job_id === selectedJobId) || jobs[0];

  const matchBreakdown = calculateJobMatch(selectedCandidate, selectedJob, globalIdf);

  const candTokens = tokenizeAndClean(getCandidateCorpusText(selectedCandidate));
  const jobTokens = tokenizeAndClean(getJobCorpusText(selectedJob));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold uppercase tracking-wider border border-purple-400/30">
              <Award className="w-4 h-4 text-purple-300" />
              <span>Academic Demonstration &amp; Evaluation Mode</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              CareerPulse: AI-Driven Job Application Matching System
            </h1>
            <p className="text-sm text-purple-200 max-w-3xl leading-relaxed">
              Based on the authoritative DS Project Report specifications. This console demonstrates the end-to-end data science architecture, NLP TF-IDF vectorization, cosine similarity computation, and multi-factor synthesis.
            </p>
          </div>
        </div>

        {/* 1. ARCHITECTURE WORKFLOW VISUALIZATION (Requirement #23) */}
        <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>System Architecture &amp; NLP Processing Pipeline</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Data flow from raw input parsing to transparent recommendation ranking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 text-xs font-mono">
            {/* Step 1 */}
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-indigo-500/40 space-y-2">
              <span className="text-[10px] font-bold text-indigo-400">STAGE 1</span>
              <div className="font-bold text-white">Candidate Profile</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Resume, skills, past experience, preferred locations, and work formats.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center text-indigo-400">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-purple-500/40 space-y-2">
              <span className="text-[10px] font-bold text-purple-400">STAGE 2</span>
              <div className="font-bold text-white">Job Corpus Dataset</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Curated tech postings with titles, descriptions, and required competencies.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center text-purple-400">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-blue-500/40 space-y-2">
              <span className="text-[10px] font-bold text-blue-400">STAGE 3</span>
              <div className="font-bold text-white">TF-IDF Vectorizer</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Stopword removal, tokenization, TF weight, and smooth IDF normalization.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center text-blue-400">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/40 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400">STAGE 4</span>
              <div className="font-bold text-white">Cosine Synthesis</div>
              <p className="text-[11px] text-slate-400 font-sans">
                Dot product cosine similarity combined with multi-signal weighted scoring.
              </p>
            </div>
          </div>
        </div>

        {/* 2. LIVE INTERACTIVE TF-IDF ALGORITHM INSPECTOR */}
        <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>Live Math Inspector</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Interactive Multi-Signal Math Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Choose any candidate and job opening to inspect vector weights and the mathematical dot product in real time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Overall Match:</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {matchBreakdown.overallScore}%
              </span>
            </div>
          </div>

          {/* Candidate & Job Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Candidate Vector (Doc A):
              </label>
              <select
                value={selectedCandId}
                onChange={e => setSelectedCandId(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-medium focus:ring-2 focus:ring-indigo-500"
              >
                {candidates.map(c => (
                  <option key={c.candidate_id} value={c.candidate_id}>
                    {c.name} — {c.target_role} ({c.location.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Job Specification (Doc B):
              </label>
              <select
                value={selectedJobId}
                onChange={e => setSelectedJobId(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-medium focus:ring-2 focus:ring-indigo-500"
              >
                {jobs.map(j => (
                  <option key={j.job_id} value={j.job_id}>
                    {j.title} — {j.company} ({j.work_type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mathematical Signals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {/* Signal 1: Skills Overlap */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Skills Overlap (35%)</div>
              <div className="text-xl font-black text-emerald-400 font-mono">{matchBreakdown.skillsScore}%</div>
              <div className="text-[10px] text-slate-400">
                {matchBreakdown.skillsMatched.length}/{selectedJob.skills.length} matched
              </div>
            </div>

            {/* Signal 2: Text TF-IDF Cosine */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">TF-IDF NLP (25%)</div>
              <div className="text-xl font-black text-indigo-400 font-mono">{matchBreakdown.textSimilarityScore}%</div>
              <div className="text-[10px] text-slate-400 font-mono">
                cos(&theta;) = {matchBreakdown.tfidfDetails.rawCosineSim}
              </div>
            </div>

            {/* Signal 3: Role Match */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Role Match (15%)</div>
              <div className="text-xl font-black text-purple-400 font-mono">{matchBreakdown.roleScore}%</div>
              <div className="text-[10px] text-slate-400">Target title alignment</div>
            </div>

            {/* Signal 4: Location Match */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Location (10%)</div>
              <div className="text-xl font-black text-blue-400 font-mono">{matchBreakdown.locationScore}%</div>
              <div className="text-[10px] text-slate-400">{selectedJob.work_type === 'Remote' ? 'Remote match' : 'City match'}</div>
            </div>

            {/* Signal 5: Work Type */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Work Type (10%)</div>
              <div className="text-xl font-black text-cyan-400 font-mono">{matchBreakdown.workTypeScore}%</div>
              <div className="text-[10px] text-slate-400">{selectedJob.work_type} format</div>
            </div>

            {/* Signal 6: Experience */}
            <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Experience (5%)</div>
              <div className="text-xl font-black text-amber-400 font-mono">{matchBreakdown.experienceScore}%</div>
              <div className="text-[10px] text-slate-400">{selectedCandidate.total_experience_years} vs {selectedJob.min_experience_years} yrs</div>
            </div>
          </div>

          {/* Deep Vector Token Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
            {/* Candidate TF-IDF Vector */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="text-indigo-400 font-bold flex items-center justify-between">
                <span>Candidate Vector Tokens: &lang;V_cand&rang;</span>
                <span className="text-[10px] text-slate-500 font-sans">{candTokens.length} total tokens</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {matchBreakdown.tfidfDetails.candidateTopTerms.map(t => (
                  <span key={t.term} className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700/60 text-indigo-300 text-[11px]">
                    {t.term}: <strong className="text-white">{t.weight}</strong>
                  </span>
                ))}
              </div>
            </div>

            {/* Job Specification TF-IDF Vector */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="text-purple-400 font-bold flex items-center justify-between">
                <span>Job Spec Vector Tokens: &lang;V_job&rang;</span>
                <span className="text-[10px] text-slate-500 font-sans">{jobTokens.length} total tokens</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {matchBreakdown.tfidfDetails.jobTopTerms.map(t => (
                  <span key={t.term} className="px-2 py-0.5 rounded bg-purple-950 border border-purple-700/60 text-purple-300 text-[11px]">
                    {t.term}: <strong className="text-white">{t.weight}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cosine Dot Product Shared Term Weights */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/60 space-y-2 text-xs font-mono">
            <div className="text-emerald-400 font-bold flex items-center justify-between">
              <span>Cosine Dot Product Intersection: &sum; (w_cand,i &times; w_job,i)</span>
              <span className="text-[11px] text-emerald-300 font-bold">
                Raw Cosine: {matchBreakdown.tfidfDetails.rawCosineSim}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {matchBreakdown.tfidfDetails.sharedTerms.length > 0 ? (
                matchBreakdown.tfidfDetails.sharedTerms.map(t => (
                  <span key={t.term} className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-200 text-[11px]">
                    {t.term}: +{t.weight}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 font-sans">No shared TF-IDF vocabulary stems between selected pair.</span>
              )}
            </div>
          </div>
        </div>

        {/* 3. CURRENT PROTOTYPE vs PROPOSED AI LAYER vs FUTURE ROADMAP (Requirement #22 & #23) */}
        <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
          <div className="border-b border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span>Project Scope &amp; Implementation Reality</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authoritative distinction between working demonstration prototype, proposed AI backend, and future roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Column 1: Current Prototype */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-blue-500/40 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                <span>Current Prototype</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "Frontend demonstration with representative data."
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span>Interactive React 19 + TypeScript + Tailwind UI</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span>Dual Candidate &amp; Recruiter user workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span>Client-side TF-IDF + Cosine similarity algorithm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                  <span>Multi-factor weighted scoring &amp; plain explanation</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Proposed Complete System (AI Layer) */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-indigo-500/40 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-400"></div>
                <span>Proposed AI Layer</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "NLP-based candidate-job matching using TF-IDF and cosine similarity."
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span>Dedicated Python + FastAPI + scikit-learn service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span>Persistent PostgreSQL relational database</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span>Scalable REST API boundary between frontend and ML service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span>Corpus-wide inverse document frequency scaling</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Future Roadmap */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-purple-500/40 space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
                <span>Future Roadmap</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                "Semantic embeddings, resume parsing, learning-to-rank, personalization and production deployment."
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                  <span>Dense transformer embeddings (Sentence-BERT)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                  <span>OCR &amp; NLP NER resume extraction microservice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                  <span>Learning-to-Rank (LTR) with clickstream feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                  <span>Collaborative filtering based on candidate interactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
