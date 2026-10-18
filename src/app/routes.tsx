import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { StaffLayout } from '../pages/staff/StaffLayout';

// Public Pages (Lazy Loaded for Lighthouse performance budget)
const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('../pages/About').then(m => ({ default: m.About })));
const Solutions = lazy(() => import('../pages/Solutions').then(m => ({ default: m.Solutions })));
const VerticalSolution = lazy(() => import('../pages/VerticalSolution').then(m => ({ default: m.VerticalSolution })));
const Brands = lazy(() => import('../pages/Brands').then(m => ({ default: m.Brands })));
const BrandLanding = lazy(() => import('../pages/BrandLanding').then(m => ({ default: m.BrandLanding })));
const ProtocolGrid = lazy(() => import('../pages/ProtocolGrid').then(m => ({ default: m.ProtocolGrid })));
const ProductDetail = lazy(() => import('../pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const Resources = lazy(() => import('../pages/Resources').then(m => ({ default: m.Resources })));
const ResourceDashboard = lazy(() => import('../pages/ResourceDashboard').then(m => ({ default: m.ResourceDashboard })));
const Contact = lazy(() => import('../pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('../pages/NotFound').then(m => ({ default: m.NotFound })));

// Staff Pages
const StaffOverview = lazy(() => import('../pages/staff/StaffOverview').then(m => ({ default: m.StaffOverview })));
const ImportWizard = lazy(() => import('../pages/staff/ImportWizard').then(m => ({ default: m.ImportWizard })));
const StaffProducts = lazy(() => import('../pages/staff/StaffProducts').then(m => ({ default: m.StaffProducts })));
const StaffAssets = lazy(() => import('../pages/staff/StaffAssets').then(m => ({ default: m.StaffAssets })));
const StaffAnalytics = lazy(() => import('../pages/staff/StaffAnalytics').then(m => ({ default: m.StaffAnalytics })));

// Minimal Fallback Spinner
const PageFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Suspense fallback={<PageFallback />}><Home /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageFallback />}><About /></Suspense> },
      { path: 'solutions', element: <Suspense fallback={<PageFallback />}><Solutions /></Suspense> },
      { path: 'solutions/:vertical', element: <Suspense fallback={<PageFallback />}><VerticalSolution /></Suspense> },
      { path: 'brands', element: <Suspense fallback={<PageFallback />}><Brands /></Suspense> },
      { path: 'brands/:brand', element: <Suspense fallback={<PageFallback />}><BrandLanding /></Suspense> },
      { path: 'brands/:brand/:protocol', element: <Suspense fallback={<PageFallback />}><ProtocolGrid /></Suspense> },
      { path: 'brands/:brand/:protocol/:mpn', element: <Suspense fallback={<PageFallback />}><ProductDetail /></Suspense> },
      { path: 'resources', element: <Suspense fallback={<PageFallback />}><Resources /></Suspense> },
      { path: 'resources/:audience', element: <Suspense fallback={<PageFallback />}><ResourceDashboard /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageFallback />}><Contact /></Suspense> },
      { path: '*', element: <Suspense fallback={<PageFallback />}><NotFound /></Suspense> }
    ]
  },
  {
    path: '/staff',
    element: <StaffLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageFallback />}><StaffOverview /></Suspense> },
      { path: 'import', element: <Suspense fallback={<PageFallback />}><ImportWizard /></Suspense> },
      { path: 'products', element: <Suspense fallback={<PageFallback />}><StaffProducts /></Suspense> },
      { path: 'assets', element: <Suspense fallback={<PageFallback />}><StaffAssets /></Suspense> },
      { path: 'analytics', element: <Suspense fallback={<PageFallback />}><StaffAnalytics /></Suspense> }
    ]
  }
]);
