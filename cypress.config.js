const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //url to intermediary affordability calculator
    baseUrl: "https://www.nationwide-intermediary.co.uk",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
