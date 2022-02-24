import { lazy } from 'react';

export const DashboardScreen = lazy(() => import('components/dashboard/Dashboard'));

// Campaign
export const LeadScreen = lazy(() => import('components/campaign/lead/index'));
