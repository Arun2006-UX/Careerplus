import React from 'react';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Cpu
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ethical AI &amp; Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy, Security &amp; Bias Governance
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            CareerPulse was engineered with strict adherence to ethical recruitment standards, algorithmic fairness, and candidate privacy protection.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Exclusion of Sensitive Personal Attributes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Recommendation signals strictly prohibit the inclusion of race, gender, age, marital status, nationality, religion, or personal disability indicators. Matching models are blind to non-job-related attributes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Permitted Matching Signals</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our TF-IDF vectorizer and scoring weights rely exclusively on:
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>Technical and domain skills</li>
              <li>Relevant years of professional experience</li>
              <li>Target job title and career objective</li>
              <li>Geographic location and preferred work format</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Role-Based Access Control (RBAC)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Candidate personal contact information (email, phone, address) is protected behind authorization boundaries, accessible only to recruiters of positions to which the candidate has actively applied.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Auditable Status History</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every status transition across the recruitment pipeline (Applied &rarr; Under Review &rarr; Interview &rarr; Offer &rarr; Rejected) is recorded with immutable timestamps and recruiter commentary for complete transparency.
            </p>
          </div>
        </div>

        {/* Explainability Pledge */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Transparent &amp; Explainable Recommendations</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            In compliance with contemporary AI governance frameworks and the Digital Personal Data Protection (DPDP) Act, CareerPulse guarantees that no automated rejection or recommendation occurs as an unexplainable "black box". Candidates have the right to inspect exactly which skills and parameters influenced their compatibility score.
          </p>
        </div>
      </div>
    </div>
  );
};
