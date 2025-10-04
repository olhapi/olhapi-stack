import { StrictMode, Suspense, lazy, memo } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router';

import './styles.css';
import reportWebVitals from './reportWebVitals.ts';

import { RootLayout } from './layouts/root-layout';
import { PublicLayout } from './layouts/public-layout';
import { SecuredLayout } from './layouts/secured-layout';
import { LoadingFallback } from './components/ui/loading-fallback';

// Memoized loading fallback to avoid recreating JSX
const MemoizedLoadingFallback = memo(LoadingFallback);
const loadingFallback = <MemoizedLoadingFallback />;

// Lazy load all page components for better code splitting
const Login = lazy(() => import('./pages/login').then((m) => ({ default: m.Login })));
const Dashboard = lazy(() => import('./pages/dashboard').then((m) => ({ default: m.Dashboard })));
const Welcome = lazy(() => import('./pages/welcome').then((m) => ({ default: m.Welcome })));
const ErrorPage = lazy(() => import('./pages/error').then((m) => ({ default: m.ErrorPage })));
const Account = lazy(() => import('./pages/account').then((m) => ({ default: m.Account })));
const Billing = lazy(() => import('./pages/billing').then((m) => ({ default: m.Billing })));
const Pricing = lazy(() => import('./pages/pricing').then((m) => ({ default: m.Pricing })));
const NotFound = lazy(() => import('./pages/not-found').then((m) => ({ default: m.NotFound })));

const rootRoute = createRootRoute({
    component: () => <RootLayout />,
});

const publicLayoutRoute = createRoute({
    component: PublicLayout, getParentRoute: () => rootRoute, id: 'public',
});

const securedLayoutRoute = createRoute({
    component: SecuredLayout, getParentRoute: () => rootRoute, id: 'secured',
});

const indexRoute = createRoute({
    beforeLoad: async () => {
        throw redirect({
            to: '/login',
        });
    }, getParentRoute: () => publicLayoutRoute, path: '/',
});

const loginRoute = createRoute({
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Login />
        </Suspense>
    ), getParentRoute: () => publicLayoutRoute, path: '/login',
});

const dashboardRoute = createRoute({
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Dashboard />
        </Suspense>
    ), getParentRoute: () => securedLayoutRoute, path: '/dashboard',
});

const welcomeRoute = createRoute({
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Welcome />
        </Suspense>
    ), getParentRoute: () => securedLayoutRoute, path: '/welcome',
});

const accountRoute = createRoute({
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Account />
        </Suspense>
    ), getParentRoute: () => securedLayoutRoute, path: '/account',
});

const billingRoute = createRoute({
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Billing />
        </Suspense>
    ), getParentRoute: () => securedLayoutRoute, path: '/billing',
});

const pricingRoute = createRoute({
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Pricing />
        </Suspense>
    ), getParentRoute: () => securedLayoutRoute, path: '/pricing',
});

const errorRoute = createRoute({
    component: () => (
        <Suspense fallback={loadingFallback}>
            <ErrorPage />
        </Suspense>
    ), getParentRoute: () => publicLayoutRoute, path: '/error',
});

const routeTree = rootRoute.addChildren([
    publicLayoutRoute.addChildren([indexRoute, loginRoute, errorRoute]),
    securedLayoutRoute.addChildren([dashboardRoute, welcomeRoute, accountRoute, billingRoute, pricingRoute]),
]);

const router = createRouter({
    context: {}, defaultNotFoundComponent: () => (
        <Suspense fallback={loadingFallback}>
            <NotFound />
        </Suspense>
    ), defaultPreload: 'intent', defaultPreloadStaleTime: 0, defaultStructuralSharing: true, routeTree, scrollRestoration: true,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
