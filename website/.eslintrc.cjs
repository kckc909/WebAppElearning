module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        // Architecture enforcement (WARN level until Phase 9)
        'no-restricted-imports': [
            'warn',
            {
                patterns: [
                    {
                        group: ['**/DEPRECATED_mock_temp/**'],
                        message: '⚠️ DEPRECATED: Use data/repositories/ instead'
                    },
                    {
                        group: ['**/mockData'],
                        message: '⚠️ DEPRECATED: Use data/repositories/ instead'
                    }
                ]
            }
        ]
    },
}
