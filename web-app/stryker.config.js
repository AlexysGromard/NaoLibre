module.exports =  {
        mutate: [
                'src/model/ModelAvis.mjs'
        ],
        testRunner: 'mocha',
        reporters: ['progress', 'clear-text', 'html'],
        coverageAnalysis: 'perTest',
};
