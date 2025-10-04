import { StrictMode, lazy, Suspense, memo } from 'react';
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
    getParentRoute: () => rootRoute,
    id: 'public',
    component: PublicLayout,
});

const securedLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: 'secured',
    component: SecuredLayout,
});

const indexRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/',
    beforeLoad: async () => {
        throw redirect({
            to: '/login',
        });
    },
});

const loginRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/login',
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Login />
        </Suspense>
    ),
});

const dashboardRoute = createRoute({
    getParentRoute: () => securedLayoutRoute,
    path: '/dashboard',
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Dashboard />
        </Suspense>
    ),
});

const welcomeRoute = createRoute({
    getParentRoute: () => securedLayoutRoute,
    path: '/welcome',
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Welcome />
        </Suspense>
    ),
});

const accountRoute = createRoute({
    getParentRoute: () => securedLayoutRoute,
    path: '/account',
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Account />
        </Suspense>
    ),
});

const billingRoute = createRoute({
    getParentRoute: () => securedLayoutRoute,
    path: '/billing',
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Billing />
        </Suspense>
    ),
});

const pricingRoute = createRoute({
    getParentRoute: () => securedLayoutRoute,
    path: '/pricing',
    component: () => (
        <Suspense fallback={loadingFallback}>
            <Pricing />
        </Suspense>
    ),
});

const errorRoute = createRoute({
    getParentRoute: () => publicLayoutRoute,
    path: '/error',
    component: () => (
        <Suspense fallback={loadingFallback}>
            <ErrorPage />
        </Suspense>
    ),
});

const routeTree = rootRoute.addChildren([
    publicLayoutRoute.addChildren([indexRoute, loginRoute, errorRoute]),
    securedLayoutRoute.addChildren([dashboardRoute, welcomeRoute, accountRoute, billingRoute, pricingRoute]),
]);

const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
        <Suspense fallback={loadingFallback}>
            <NotFound />
        </Suspense>
    ),
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
