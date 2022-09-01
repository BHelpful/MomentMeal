const StyleDictionary = require('style-dictionary');

const jsFlatFormat = {
  name: 'javascript/flat',
  formatter: ({ properties }) => {
    return `module.exports = ${JSON.stringify(properties, null, 2)}`;
  },
};

StyleDictionary.registerFormat(jsFlatFormat);

StyleDictionary.registerFileHeader({
  name: 'myCustomHeader',
  fileHeader: (defaultMessage) => {
    // defaultMessage are the 2 lines above that appear in the default file header
    // you can use this to add a message before or after the default message 👇

    // the fileHeader function should return an array of strings
    // which will be formatted in the proper comment style for a given format
    return [...defaultMessage, `hello?`, `is it me you're looking for?`];
  },
});

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'libs/mealtime-ui-components/src/lib/tokens/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
    javascript: {
      transformGroup: 'js',
      buildPath: 'libs/mealtime-ui-components/src/lib/tokens/',
      files: [
        {
          destination: '_tokens.js',
          format: 'javascript/flat', // es6 --> flat
        },
      ],
    },
  },
};
