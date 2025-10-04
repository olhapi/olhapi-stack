const config = {
    catalogs: [
        {
            exclude: ['**/node_modules/**'], include: ['src'], path: '<rootDir>/src/locales/{locale}/messages',
        },
    ], compileNamespace: 'es', format: 'po', formatOptions: {
        lineNumbers: false,
    }, locales: ['en', 'es', 'fr'], sourceLocale: 'en',
};

export default config;
