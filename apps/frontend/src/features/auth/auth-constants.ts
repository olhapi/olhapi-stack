export const CLIENT_ORIGIN = import.meta.env.VITE_CLIENT_ORIGIN || 'http://localhost:3000';

export const AUTH_CALLBACKS = {
    default: `${CLIENT_ORIGIN}/dashboard`,
    newUser: `${CLIENT_ORIGIN}/welcome`,
    error: `${CLIENT_ORIGIN}/error`,
};
