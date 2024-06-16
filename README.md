# Mortgage Affordability Calculator Tests

This repository contains Cypress tests for the Mortgage Affordability Calculator on the Nationwide Intermediary website. The tests cover various scenarios, including single and joint applicants, different mortgage purposes (e.g., buying a new property, remortgaging), and different property ownership types.

## Prerequisites

Before running the tests, ensure that you have the following installed:

- Node.js (version 12 or later)
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running the following command:

   ```sh
   npm install
   ```

## Running the Tests

To run the tests, use the following command:

```sh
npx cypress open
```

This will open the Cypress Test Runner. From there, you can click on the `mortgageCalculator.cy.js` file to run the tests.

Alternatively, you can run the tests in headless mode (without the Cypress Test Runner GUI) using the following command:

```sh
npx cypress run
```

## Test Structure

The `mortgageCalculator.cy.js` file contains the tests for the Mortgage Affordability Calculator. The tests are organized into a single `describe` block, with individual test cases defined using the `it` function.

The `scenarios.json` file contains an array of test scenarios, each with properties for applicant/property details and expected outcomes. The tests are dynamically generated based on the scenarios defined in this file.

## Test Utilities

The `mortgageCalculator.cy.js` file includes several utility functions to simplify the test code:

- `acceptCookies()`: Visits the Affordability Calculator page and accepts the cookie banner.
- `typeIfVisible(selector, value)`: Types the provided value into an input field if it is visible on the page.
- `clickIfVisible(selector, value)`: Clicks an element if it is visible on the page and contains the provided value.
- `selectIfVisible(selectorHeader, selector, valueSelect)`: Selects a value in a dropdown if the dropdown is visible on the page.
- `fillAndSubmitForm(data, expectedResult)`: Fills out the Mortgage Affordability Calculator form with the provided data and verifies the expected result.

## Adding or Modifying Test Scenarios

To add or modify test scenarios, edit the `scenarios.json` file. Each scenario should have the following properties:

- `scenario`: A descriptive name for the test scenario.
- `data`: An object containing the input data for the form fields.
- `expectedResult`: The expected outcome of the test, either "willing to lend" or "not willing to lend".

After modifying the `scenarios.json` file, save the changes, and the tests will automatically pick up the new or updated scenarios.

### Recommendations:
1. **Check Code Snippets**: Ensure that the example code snippets and commands provided are correctly formatted and functional.
2. **Clarify File Paths**: Explicitly mention the relative paths for `mortgageCalculator.cy.js` and `scenarios.json` to avoid any confusion.

