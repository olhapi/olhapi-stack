const config = {
    locales: ['en', 'es', 'fr'],
    sourceLocale: 'en',
    catalogs: [
        {
            path: '<rootDir>/src/locales/{locale}/messages',
            include: ['src'],
            exclude: ['**/node_modules/**'],
        },
    ],
    format: 'po',
    formatOptions: {
        lineNumbers: false,
    },
    compileNamespace: 'es',
};

export default config;
