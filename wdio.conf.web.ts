import type { Options } from '@wdio/types'
import fsPkg from 'fs-extra'
const { removeSync } = fsPkg;
import pkg from 'multiple-cucumber-html-reporter'
const { generate } = pkg;

export const config: Options.Testrunner = {

    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        './features/webFeatures/**/*.feature'
    ],
    exclude: [
    ],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    reporters: [
        'spec',
        ['cucumberjs-json',
            {
                jsonFolder: `${process.cwd()}/report-web`,
                language: 'en',
                reportFilePerRetry: 'true'
            }
        ]
    ],

    cucumberOpts: {
        require: ['./step-definitions/webSteps/steps.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 600000,
        ignoreUndefinedDefinitions: false
    },

    onPrepare: async function () {
        await removeSync(`${process.cwd()}/report-web`);
    },

    onComplete: async function () {
        await generate({
            jsonDir: `${process.cwd()}/report-web`,
            reportPath: `${process.cwd()}/report-web/cucumber-html-report`,
        });
    },
}
