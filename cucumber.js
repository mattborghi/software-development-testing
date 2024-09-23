const config = {
    // Folder where our .feature files will live.
    paths: ['bdd/features/**/*.feature'],
    // Where to look for the steps.ts files that will contain the actual testing code.
    require: ['bdd/step_definitions/**/*.ts', 'bdd/support/**/*.ts'],
    // Add typescript support for CucumberJS.
    requireModule: ['ts-node/register'],
    format: [
        'summary',
        'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' },
};

module.exports = {
    default: config
}