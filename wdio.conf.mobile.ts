import type { Options } from '@wdio/types'
import * as path from 'path';
import fsPkg from 'fs-extra'
const { removeSync } = fsPkg
import pkg from 'multiple-cucumber-html-reporter'
const { generate } = pkg

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },

    port: 4724,
    specs: [
        './features/mobileFeatures/**/*.feature'
    ],
    exclude: [
    ],
    maxInstances: 1,
    capabilities: [{
        // capabilities for local Appium web tests on an Android Emulator
        "platformName": "Android",
        "appium:platformVersion": "13",
        "appium:deviceName": "Pixel 7 Pro API VD",
        "appium:app": path.join(process.cwd(), "./android_apk/dmgMedia.apk"),
        "appium:automationName": "UIAutomator2"
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'cucumber',
    reporters: [
        'spec',
        ['cucumberjs-json',
            {
                jsonFolder: `${process.cwd()}/report-mobile`,
                language: 'en',
                reportFilePerRetry: 'true'
            }
        ]
    ],

    cucumberOpts: {
        require: ['./step-definitions/mobileSteps/steps.ts'],
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
        await removeSync(`${process.cwd()}/report-mobile`);
    },

    onComplete: async function () {
        await generate({
            jsonDir: `${process.cwd()}/report-mobile`,
            reportPath: `${process.cwd()}/report-mobile/cucumber-html-report`,
        });
    },

}
