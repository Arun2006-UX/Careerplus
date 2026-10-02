import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';
import {
  Bell,
  CheckCircle2,
  Calendar,
  Users,
  Clock,
  Sparkles,
  FileText,
  X,
  Check,
  ExternalLink,
  ChevronRight,
  Inbox
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const {
    userRole,
    userNotifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotification,
    setActiveTab,
    openJobDetails
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredList = userNotifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const formatRelativeTime = (timestamp: string) => {
    try {
      const now = new Date();
      const past = new Date(timestamp);
      const diffMs = now.getTime() - past.getTime();
      const diffMins = Math.round(diffMs / (1000 * 60));
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 2) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return 'Recently';
    }
  };

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);

    // Route to appropriate view
    if (notif.related_application_id) {
      if (userRole === 'candidate') {
        setActiveTab('applications');
      } else if (userRole === 'recruiter') {
        setActiveTab('recruiter-applicants');
      }
    } else if (notif.type === 'new_applicant') {
      setActiveTab('recruiter-applicants');
    } else if (notif.related_job_id) {
      openJobDetails(notif.related_job_id);
    }
    setIsOpen(false);
  };

  const getNotifIcon = (type: AppNotification['type'], status?: string) => {
    if (status === 'Interview' || type === 'interview_scheduled') {
      return (
        <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4" />
        </div>
      );
    }
    if (status === 'Offer' || type === 'offer_extended') {
      return (
        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      );
    }
    if (type === 'new_applicant') {
      return (
        <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4" />
        </div>
      );
    }
    if (status === 'Under Review') {
      return (
        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4" />
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs animate-pulse">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Notifications
              </h3>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                  {unreadNotificationsCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadNotificationsCount > 0 && (
                <button
                  type="button"
                  onClick={markAllNotificationsAsRead}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Mark all read
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 pt-2.5 pb-2 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({userNotifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                filter === 'unread'
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Unread ({unreadNotificationsCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredList.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Inbox className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Application status updates and applicant alerts will appear here in real-time.
                </p>
              </div>
            ) : (
              filteredList.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group relative ${
                    !notif.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                  }`}
                >
                  {getNotifIcon(notif.type, notif.status_badge)}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                        {formatRelativeTime(notif.timestamp)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>

                    <div className="flex items-center gap-2 pt-0.5">
                      {notif.status_badge && (
                        <span
                          className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                            notif.status_badge === 'Interview'
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                              : notif.status_badge === 'Offer'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : notif.status_badge === 'Under Review'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                              : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          }`}
                        >
                          {notif.status_badge}
                        </span>
                      )}

                      <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-0.5">
                        <span>View details</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Unread indicator dot & dismiss */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                    )}
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        clearNotification(notif.id);
                      }}
                      className="text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                      title="Dismiss"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-slate-50/80 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>Real-time status synchronizer active</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
