/**
 * This code defines a set of tests for the Mortgage Affordability Calculator on the Nationwide Intermediary website.
 * The tests cover various scenarios, and also includes accepting cookies, filling out the form with different data, and verifying the expected results.
 */
import scenarios from "../fixtures/scenarios.json";
const ACCEPT_COOKIES_URL =
  "https://www.nationwide-intermediary.co.uk/calculators/affordability-calculator";
const ACCEPT_COOKIE_BUTTON_SELECTOR = "#onetrust-accept-btn-handler";

describe("Mortgage Affordability Calculator Tests", () => {
  //Visit the Nationwide Affordability Calculator page and click the "Accept" button on the cookie banner.
  const acceptCookies = () => {
    cy.visit(ACCEPT_COOKIES_URL);
    cy.get(ACCEPT_COOKIE_BUTTON_SELECTOR).click();
  };

  // Check if an element is visible on the page, and if so, type the provided value into the element.
  const typeIfVisible = (selector, value) => {
    cy.get(selector).then(($el) => {
      if ($el.is(":visible")) {
        cy.get(selector).type(value);
      }
    });
  };

  //Click an element if it is visible on the page.
  const clickIfVisible = (selector, value) => {
    cy.get(selector).then(($el) => {
      if ($el.is(":visible")) {
        cy.get(selector).contains(value).click();
      }
    });
  };

  //Selects a value in a dropdown if the dropdown is visible on the page.
  const selectIfVisible = (selectorHeader, selector, valueSelect) => {
    cy.get(selectorHeader).then(($el) => {
      if ($el.is(":visible")) {
        cy.get(selector).select(valueSelect);
      }
    });
  };

  //Fill out and submit the Mortgage Affordability Calculator form with the provided data, 
  //and verify the expected result.
  const fillAndSubmitForm = (data, expectedResult) => {

    // Fill out form sections:

    // 1. Mortgage Details
    cy.contains(
      ".Affordability-q0 .Form-label",
      data.numberOfApplicants
    ).click();
    cy.contains(".Affordability-q10 .Form-label", data.mortgagePurpose).click();
    clickIfVisible(".Affordability-q15 .Form-label", data.borrowedFunds);
    cy.get("#AffCalc-q20-BorrowingAmount").type(data.loanAmount);
    typeIfVisible("#AffCalc-q22-BorrowingAmount", data.extraLoanAmount);
    typeIfVisible(
      "#AffCalc-q25-AmountTransferredFromOtherLender",
      data.AmountTransferredFromOtherLender
    );
    cy.get("#AffCalc-q30-MortgageTermYears").type(data.mortgageTerm);
    cy.get("#AffCalc-q40-OwnershipType").select(data.ownershipType);
    clickIfVisible(".Affordability-q42 .Form-label", data.borrowMoreTermMatchesExisting);
    typeIfVisible("#AffCalc-q44-ExistingMortgageTermYears", data.existingMortgageTermYears);
    typeIfVisible("#AffCalc-q46-ExistingMortgageBalance", data.existingMortgageBalance);
    typeIfVisible("#AffCalc-q48-ExistingInterestOnlyMortgageBalance", data.existingInterestOnlyMortgageBalance);
    typeIfVisible("#AffCalc-q50-MarketValue", data.marketValue);
    clickIfVisible(".Affordability-q60 .Form-label", data.propertyStatus);
    selectIfVisible(
      "#AffCalc-q70-Question",
      "#AffCalc-q70-PropertyTenure",
      data.propertyTenure
    );
    selectIfVisible(
      "#AffCalc-q80-Question",
      "#AffCalc-q80-PropertyType",
      data.propertyType
    );
    typeIfVisible("#AffCalc-q90-PurchasePrice", data.purchasePrice);
    typeIfVisible("#AffCalc-q100-PurchasePrice", data.sharePurchasePrice);
    typeIfVisible("#AffCalc-q110-PurchasePrice", data.discPurchasePrice);
    typeIfVisible(
      "#AffCalc-q120-CurrentEstimatedValue",
      data.currentEstimatedValue
    );
    typeIfVisible("#AffCalc-q130-CurrentEstimatedValueShare", data.currentEstimatedValueShare);
    clickIfVisible(".Affordability-q135 .Form-label", data.propertyInScotland);

    //Click to next page
    cy.get(
      ".Affordability-step--0 > .Affordability-stepFooter > .Affordability-nextStep"
    ).click();

    //2. Client details
    cy.get("#AffCalc-q140-Day").type(data.dob.day);
    cy.get("#AffCalc-q140-Month").type(data.dob.month);
    cy.get("#AffCalc-q140-Year").type(data.dob.year + "{enter}");
    selectIfVisible(
      "#AffCalc-q145-Question",
      "#AffCalc-q145-PropertyTenure",
      data.individualStatus
    );

    clickIfVisible(".Affordability-q150 .Form-label", data.financialDependents);
    clickIfVisible(".Affordability-q170 .Form-label", data.retired);

    typeIfVisible(
      "#AffCalc-q160-Age0to5-0",
      data.numberFinancialDependentsAge0to5
    );
    typeIfVisible(
      "#AffCalc-q160-Age6to11-1",
      data.numberFinancialDependentsAge6to11
    );
    typeIfVisible(
      "#AffCalc-q160-Age12to17-2",
      data.numberFinancialDependentsAge12to17
    );
    typeIfVisible(
      "#AffCalc-q160-Age18More-3",
      data.numberFinancialDependentsAge18More
    );
    
    typeIfVisible("#AffCalc-q180-RetirementAge", data.retirementAge);
    typeIfVisible("#AffCalc-q190-Day", data.dob2.day);
    typeIfVisible("#AffCalc-q190-Month", data.dob2.month);
    typeIfVisible("#AffCalc-q190-Year", data.dob2.year + "{enter}");
    selectIfVisible(
      "#AffCalc-q195-Question",
      "#AffCalc-q195-JointApplicant-CustomerType",
      data.individualStatus2
    );
    
    clickIfVisible(
      ".Affordability-q200 .Form-label",
      data.financialDependents2
    );
    typeIfVisible(
      "#AffCalc-q210-Age0to5-0",
      data.numberFinancialDependents2Age0to5
    );
    typeIfVisible(
      "#AffCalc-q210-Age6to11-1",
      data.numberFinancialDependents2Age6to11
    );
    typeIfVisible(
      "#AffCalc-q210-Age12to17-2",
      data.numberFinancialDependents2Age12to17
    );
    typeIfVisible(
      "#AffCalc-q210-Age18More-3",
      data.numberFinancialDependents2Age18More
    );
    clickIfVisible(".Affordability-q220 .Form-label", data.retired2);
    typeIfVisible("#AffCalc-q230-RetirementAge", data.retirementAge2);

    //Click to next page
    cy.get(
      ".Affordability-step--1 > .Affordability-stepFooter > .Affordability-nextStep"
    ).click();

    //3. Client income details
    cy.get("#AffCalc-q240-EmploymentCategory").select(data.employmentStatus);
    selectIfVisible(
      "#AffCalc-q250-Question",
      "#AffCalc-q250-EmploymentType",
      data.contractType
    );
    selectIfVisible(
      "#AffCalc-q260-Question",
      "#AffCalc-q260-TreatedAsEmployedForTax",
      data.treatedAsEmployedForTax
    );
    typeIfVisible("#AffCalc-q270-JobYears", data.jobDuration);
    typeIfVisible("#AffCalc-q280-BusinessYears", data.businessDuration);
    typeIfVisible("#AffCalc-q290-RegularYears", data.regularWorkDuration);
    typeIfVisible("#AffCalc-q300-ContractYears", data.contractDuration);
    typeIfVisible("#AffCalc-q310-ContractYears", data.remainingContractDuration);
    typeIfVisible("#AffCalc-q320-GrossAnnualIncome", data.salary);
    typeIfVisible("#AffCalc-q330-Bonus", data.bonus);
    typeIfVisible("#AffCalc-q340-Overtime", data.overtime);
    typeIfVisible("#AffCalc-q350-Commission", data.commission);
    typeIfVisible("#AffCalc-q360-LatestPeriodProfit", data.latestPeriodProfit);
    typeIfVisible("#AffCalc-q370-PreviousPeriodProfit", data.previousPeriodProfit);
    typeIfVisible("#AffCalc-q380-LatestPeriodProfitShare", data.profitShare);
    typeIfVisible(
      "#AffCalc-q390-PreviousPeriodProfitShare",
      data.profitSharePrev
    );
    typeIfVisible(
      "#AffCalc-q400-LatestPeriodSalary",
      data.latestPeriodSalary
    );
    typeIfVisible("#AffCalc-q410-PreviousPeriodSalary", data.previousPeriodSalary);
    clickIfVisible(".Affordability-q420 .Form-label", data.secondJob);
    selectIfVisible(
      "#AffCalc-q335-Question",
      "#AffCalc-q335-BonusFrequency",
      data.bonusFrequency
    );
    selectIfVisible(
      "#AffCalc-q430-Question",
      "#AffCalc-q430-EmploymentCategory",
      data.secondJobEmploymentStatus
    );
    selectIfVisible(
      "#AffCalc-q440-Question",
      "#AffCalc-q440-EmploymentType",
      data.secondJobContractType
    );
    clickIfVisible(".Affordability-q450 .Form-label", data.secondJobTreatedAsEmployedForTax);
    typeIfVisible("#AffCalc-q460-JobYears", data.secondJobDuration);
    typeIfVisible("#AffCalc-q470-BusinessYears", data.secondJobBusinessDuration);
    typeIfVisible("#AffCalc-q480-RegularYears", data.secondJobRegularWorkDuration);
    typeIfVisible("#AffCalc-q490-ContractYears", data.secondJobContractDuration);
    typeIfVisible("#AffCalc-q500-ContractYears", data.secondJobRemainingContractDuration);
    typeIfVisible("#AffCalc-q510-GrossAnnualIncome", data.secondJobSalary);
    typeIfVisible("#AffCalc-q520-Bonus", data.secondJobBonus);
    selectIfVisible(
      "#AffCalc-q525-Question",
      "#AffCalc-q525-BonusFrequency",
      data.secondJobBonusFrequency
    );
    selectIfVisible(
      "#AffCalc-q345-Question",
      "#AffCalc-q345-OvertimeFrequency",
      data.overtimeFrequency
    );
    selectIfVisible(
      "#AffCalc-q355-Question",
      "#AffCalc-q355-CommissionFrequency",
      data.commissionFrequency
    );
    typeIfVisible("#AffCalc-q530-Overtime", data.secondJobOvertime);
    selectIfVisible(
      "#AffCalc-q535-Question",
      "#AffCalc-q535-OvertimeFrequency",
      data.secondJobOvertimeFrequency
    );
    typeIfVisible("#AffCalc-q540-Commission", data.secondJobCommission);
    selectIfVisible(
      "#AffCalc-q545-Question",
      "#AffCalc-q545-CommissionFrequency",
      data.secondJobCommissionFrequency
    );
    typeIfVisible("#AffCalc-q550-LatestPeriodProfit", data.secondJobLatestPeriodProfit);
    typeIfVisible("#AffCalc-q560-PreviousPeriodProfit", data.secondJobPreviousPeriodProfit);
    typeIfVisible("#AffCalc-q570-LatestPeriodProfitShare", data.secondJobProfitShare);
    typeIfVisible(
      "#AffCalc-q580-PreviousPeriodProfitShare",
      data.secondJobProfitSharePrev
    );
    typeIfVisible(
      "#AffCalc-q590-LatestPeriodSalary",
      data.secondJobLatestPeriodSalary
    );
    typeIfVisible("#AffCalc-q600-PreviousPeriodSalary", data.secondJobPreviousPeriodSalary);
    clickIfVisible(".Affordability-q610 .Form-label", data.otherIncome);
    typeIfVisible("#AffCalc-q620-MonthlyInvestmentIncome", data.monthlyInvestmentIncome);
    typeIfVisible("#AffCalc-q630-MortgageFreeMonthlyRentalIncome", data.mortgageFreeMonthlyRentalIncome);
    typeIfVisible("#AffCalc-q640-MonthlyStateDisabilityBenefit", data.monthlyStateDisabilityBenefit);
    typeIfVisible("#AffCalc-q650-MonthlyUniversalCreditsTaxCredits", data.monthlyUniversalCreditsTaxCredits);
    typeIfVisible("#AffCalc-q660-MonthlyChildBenefit", data.monthlyChildBenefit);
    typeIfVisible("#AffCalc-q670-MonthlyMaintenanceIncome", data.monthlyMaintenanceIncome);
    typeIfVisible("#AffCalc-q680-MonthlyPensionIncome", data.monthlyPensionIncome);
    typeIfVisible("#AffCalc-q700-AnnualInvestmentIncome", data.annualInvestmentIncome);
    typeIfVisible("#AffCalc-q710-AnnualMortgageFreeRentalIncome", data.annualMortgageFreeRentalIncome);
    typeIfVisible("#AffCalc-q720-AnnualStateDisabilityBenefit", data.annualStateDisabilityBenefit);
    typeIfVisible("#AffCalc-q730-AnnualUniversalCredit", data.annualUniversalCredit);
    typeIfVisible("#AffCalc-q740-AnnualChildBenefit", data.annualChildBenefit);
    typeIfVisible("#AffCalc-q750-AnnualMaintenanceIncome", data.annualMaintenanceIncome);
    typeIfVisible("#AffCalc-q760-AnnualPensionIncome", data.annualPensionIncome);
    selectIfVisible(
      "#AffCalc-q780-Question",
      "#AffCalc-q780-EmploymentCategory",
      data.jobEmploymentStatus2
    );
    selectIfVisible(
      "#AffCalc-q790-Question",
      "#AffCalc-q790-EmploymentType",
      data.contractType2
    );
    selectIfVisible(
      "#AffCalc-q1680-Question",
      "#AffCalc-q1680-EmploymentCategoryRetired",
      data.employmentCategoryRetired
    );
    clickIfVisible(".Affordability-q800 .Form-label", data.TreatedAsEmployedForTax2);
    typeIfVisible("#AffCalc-q810-JobYears", data.duration2);
    typeIfVisible("#AffCalc-q820-BusinessYears", data.businessDuration2);
    typeIfVisible("#AffCalc-q830-RegularYears", data.regularWorkDuration2);
    typeIfVisible("#AffCalc-q840-ContractYears", data.contractDuration2);
    typeIfVisible("#AffCalc-q850-ContractYears", data.remainingContractDuration2);
    typeIfVisible("#AffCalc-q860-GrossAnnualIncome", data.jobSalary2);
    typeIfVisible("#AffCalc-q870-Bonus", data.bonus2);
    selectIfVisible(
      "#AffCalc-q875-Question",
      "#AffCalc-q875-BonusFrequency",
      data.bonusFrequency2
    );
    typeIfVisible("#AffCalc-q880-Overtime", data.overtime2);
    selectIfVisible(
      "#AffCalc-q885-Question",
      "#AffCalc-q885-OvertimeFrequency",
      data.overtimeFrequency2
    );
    typeIfVisible("#AffCalc-q890-Commission", data.commission2);
    selectIfVisible(
      "#AffCalc-q895-Question",
      "#AffCalc-q895-CommissionFrequency",
      data.commissionFrequency2
    );
    
    typeIfVisible("#AffCalc-q900-LatestPeriodProfit", data.latestPeriodProfit2);
    typeIfVisible("#AffCalc-q910-PreviousPeriodProfit", data.previousPeriodProfit2);
    typeIfVisible("#AffCalc-q920-LatestPeriodProfitShare", data.profitShare2);
    typeIfVisible(
      "#AffCalc-q930-PreviousPeriodProfitShare",
      data.profitSharePrev2
    );
    typeIfVisible(
      "#AffCalc-q940-LatestPeriodSalary",
      data.latestPeriodSalary2
    );
    typeIfVisible("#AffCalc-q950-PreviousPeriodSalary", data.previousPeriodSalary2);
    clickIfVisible(".Affordability-q960 .Form-label", data.secondJob2);

    clickIfVisible(".Affordability-q1150 .Form-label", data.otherIncome2);

    //Click to next page
    cy.get(
      ".Affordability-step--2 > .Affordability-stepFooter > .Affordability-nextStep"
    ).click();

    //4. Client outgoings
    typeIfVisible(
      "#AffCalc-q1320-TotalCreditCardBalances",
      data.creditCardDebt
    );
    typeIfVisible("#AffCalc-q1360-MonthlyStudentLoan", data.studentLoan);
    typeIfVisible("#AffCalc-q1370-MonthlyTravelCosts", data.travelCosts);
    typeIfVisible(
      "#AffCalc-q1380-MonthlyOtherExpenditure",
      data.otherMonthlyCosts
    );
    clickIfVisible(".Affordability-q1540 .Form-label", data.otherMortgage);
    clickIfVisible(".Affordability-q1590 .Form-label", data.otherMortgage2);
    typeIfVisible("#AffCalc-q1620-CouncilTax", data.councilTax);
    typeIfVisible("#AffCalc-q1630-BuildingInsurance", data.buildingsInsurance);

    //Click to next page
    cy.get(
      ".Affordability-step--3 > .Affordability-stepFooter > .Affordability-nextStep"
    ).click();

    // Submit the form and verify the expected result
    if (expectedResult === "willing to lend") {
      cy.get(
        ".Affordability-mainResult > .Affordability-callout--green > p"
      ).should(
        "contain",
        "Based on your inputs, we may be able to lend your client(s) the following"
      );
    } else if (expectedResult === "not willing to lend") {
      cy.get(
        ".Affordability-mainResult > .Affordability-callout--red > p"
      ).should(
        "contain",
        "Based on your inputs, we are unable to lend your client(s) any money"
      );
    } else {
      throw new Error(`Unsupported expectedResult: ${expectedResult}`);
    }
  };

  beforeEach(() => {
    acceptCookies();
  });

/**
 * Run a set of scenarios defined in the scenarios.json file.
 * Each scenario has properties for applicant/property details and expected outcomes.
 * The `fillAndSubmitForm` function is used to test each scenario.
 */
  scenarios.forEach(({ scenario, data, expectedResult }) => {
    it(`should calculate affordability for ${scenario}`, () => {
      fillAndSubmitForm(data, expectedResult);
    });
  });
});
