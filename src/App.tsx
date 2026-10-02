/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

import { LandingPage } from './views/LandingPage';
import { CandidateDashboard } from './views/CandidateDashboard';
import { JobSearchPage } from './views/JobSearchPage';
import { RecommendedJobsPage } from './views/RecommendedJobsPage';
import { JobDetailsPage } from './views/JobDetailsPage';
import { ApplicationTrackingPage } from './views/ApplicationTrackingPage';
import { CandidateProfilePage } from './views/CandidateProfilePage';
import { RecruiterDashboard } from './views/RecruiterDashboard';
import { RecruiterJobsPage } from './views/RecruiterJobsPage';
import { RecruiterApplicantsPage } from './views/RecruiterApplicantsPage';
import { RecruiterAnalyticsPage } from './views/RecruiterAnalyticsPage';
import { PresentationModePage } from './views/PresentationModePage';
import { PrivacyPage } from './views/PrivacyPage';

const AppContent: React.FC = () => {
  const { activeTab, userRole } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage />;
      case 'candidate-dashboard':
        return <CandidateDashboard />;
      case 'jobs':
        return <JobSearchPage />;
      case 'recommended':
        return <RecommendedJobsPage />;
      case 'job-details':
        return <JobDetailsPage />;
      case 'applications':
        return <ApplicationTrackingPage />;
      case 'profile':
        return <CandidateProfilePage />;
      case 'recruiter-dashboard':
        return <RecruiterDashboard />;
      case 'recruiter-jobs':
      case 'recruiter-post':
        return <RecruiterJobsPage />;
      case 'recruiter-applicants':
        return <RecruiterApplicantsPage />;
      case 'recruiter-analytics':
        return <RecruiterAnalyticsPage />;
      case 'presentation':
        return <PresentationModePage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return userRole === 'recruiter' ? <RecruiterDashboard /> : userRole === 'candidate' ? <CandidateDashboard /> : <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderActiveView()}
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
