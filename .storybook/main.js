const Solid = require('vite-plugin-solid');

module.exports = {
  core: {
    builder: 'storybook-builder-vite',
  },

  framework: '@storybook/html',

  stories: ['../stories/**/*.stories.tsx'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-a11y',
    // '@storybook/addon-storysource',
    // 'storybook-dark-mode',
  ],

  async viteFinal(config, { configType }) {
    config.plugins.unshift(Solid({ hot: false }));

    return config;
  },
};
