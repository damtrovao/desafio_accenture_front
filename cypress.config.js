const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  defaultCommandTimeout: Number(process.env.DEFAULT_COMMAND_TIMEOUT) || 10000,
  pageLoadTimeout: Number(process.env.PAGE_LOAD_TIMEOUT) || 20000,
});
