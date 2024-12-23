module.exports = {
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "./test-results",
                outputName: "jest-junit.xml",
            }
        ]
    ]
};
