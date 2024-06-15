const ACCEPT_COOKIES_URL = "https://www.nationwide-intermediary.co.uk/calculators/affordability-calculator";
const ACCEPT_COOKIE_BUTTON_SELECTOR = "#onetrust-accept-btn-handler";

describe("Mortgage Affordability Calculator Tests", () => {
  const acceptCookies = () => {
    cy.visit(ACCEPT_COOKIES_URL);
    cy.get(ACCEPT_COOKIE_BUTTON_SELECTOR).click();
    };

  const typeIfVisible = (selector, value) => {
    cy.get(selector).then(($el) => {
      if ($el.is(':visible')) {
        cy.get(selector).type(value);
      }
    });
  };

  const clickIfVisible = (selector, value) => {
    cy.get(selector).then(($el) => {
      if ($el.is(':visible')) {
        cy.get(selector).contains(value).click();
      }
    });
  };

  const selectIfVisible = (selectorHeader, selector, valueSelect) => {
    cy.get(selectorHeader).then(($el) => {
      if ($el.is(':visible')) {
        cy.get(selector).select(valueSelect);
      }
    });
  };

  const fillAndSubmitForm = (data, expectedResult) => {
    cy.contains('.Affordability-q0 .Form-label', data.numberOfApplicants).click();
    cy.contains('.Affordability-q10 .Form-label', data.mortgagePurpose).click();
    cy.get("#AffCalc-q20-BorrowingAmount").type(data.loanAmount);
    cy.get("#AffCalc-q30-MortgageTermYears").type(data.mortgageTerm);
    cy.get("#AffCalc-q40-OwnershipType").select(data.ownershipType);

    typeIfVisible('#AffCalc-q50-MarketValue', data.marketValue);
    clickIfVisible('.Affordability-q60 .Form-label', data.propertyStatus);
    typeIfVisible("#AffCalc-q90-PurchasePrice", data.purchasePrice);
    typeIfVisible('#AffCalc-q120-CurrentEstimatedValue', data.currentEstimatedValue);
    selectIfVisible('#AffCalc-q70-Question',"#AffCalc-q70-PropertyTenure", data.propertyTenure);
    selectIfVisible('#AffCalc-q80-Question',"#AffCalc-q80-PropertyType", data.propertyType);
    typeIfVisible('#AffCalc-q100-PurchasePrice', data.sharePurchasePrice);
    typeIfVisible('#AffCalc-q110-PurchasePrice', data.discPurchasePrice);
    clickIfVisible('.Affordability-q15 .Form-label', data.borrowedFunds);
    typeIfVisible('#AffCalc-q25-AmountTransferredFromOtherLender', data.AmountTransferredFromOtherLender);
    clickIfVisible('.Affordability-q135 .Form-label', data.propertyInScotland);

    cy.get('.Affordability-step--0 > .Affordability-stepFooter > .Affordability-nextStep').click();

    cy.get("#AffCalc-q140-Day").type(data.dob.day);
    cy.get("#AffCalc-q140-Month").type(data.dob.month);
    cy.get("#AffCalc-q140-Year").type(data.dob.year + "{enter}");
    selectIfVisible('#AffCalc-q145-Question',"#AffCalc-q145-PropertyTenure", data.individualStatus);

    clickIfVisible('.Affordability-q150 .Form-label', data.financialDependents);
    clickIfVisible('.Affordability-q170 .Form-label', data.retired);
    typeIfVisible('#AffCalc-q160-Age0to5-0', data.numberFinancialDependentsAge0to5);
    typeIfVisible('#AffCalc-q160-Age6to11-1', data.numberFinancialDependentsAge6to11);
    typeIfVisible('#AffCalc-q160-Age12to17-2', data.numberFinancialDependentsAge12to17);
    typeIfVisible('#AffCalc-q160-Age18More-3', data.numberFinancialDependentsAge18More);
    typeIfVisible("#AffCalc-q190-Day", data.dob2.day);
    typeIfVisible("#AffCalc-q190-Month", data.dob2.month);
    typeIfVisible("#AffCalc-q190-Year", data.dob2.year + "{enter}");
    selectIfVisible('#AffCalc-q195-Question','#AffCalc-q195-JointApplicant-CustomerType', data.individualStatus2);
    clickIfVisible('.Affordability-q200 .Form-label', data.financialDependents2);
    typeIfVisible('#AffCalc-q210-Age0to5-0', data.numberFinancialDependents2Age0to5);
    typeIfVisible('#AffCalc-q210-Age6to11-1', data.numberFinancialDependents2Age6to11);
    typeIfVisible('#AffCalc-q210-Age12to17-2', data.numberFinancialDependents2Age12to17);
    typeIfVisible('#AffCalc-q210-Age18More-3', data.numberFinancialDependents2Age18More);
    clickIfVisible('.Affordability-q220 .Form-label', data.retired2);
    typeIfVisible('#AffCalc-q230-RetirementAge', data.retirementAge2);
    typeIfVisible('#AffCalc-q180-RetirementAge', data.retirementAge);

    cy.get('.Affordability-step--1 > .Affordability-stepFooter > .Affordability-nextStep').click();

    cy.get("#AffCalc-q240-EmploymentCategory").select(data.employmentStatus)
    selectIfVisible("#AffCalc-q250-Question","#AffCalc-q250-EmploymentType", data.contractType);
    typeIfVisible("#AffCalc-q270-JobYears", data.jobDuration);
    typeIfVisible("#AffCalc-q320-GrossAnnualIncome", data.salary);
    typeIfVisible('#AffCalc-q330-Bonus', data.bonus);
    typeIfVisible('#AffCalc-q340-Overtime', data.overtime);
    typeIfVisible('#AffCalc-q350-Commission', data.commission);
    typeIfVisible("#AffCalc-q280-BusinessYears", data.businessDuration);
    typeIfVisible('#AffCalc-q380-LatestPeriodProfitShare', data.profitShare);
    typeIfVisible('#AffCalc-q390-PreviousPeriodProfitShare', data.profitSharePrev);
    selectIfVisible('#AffCalc-q335-Question','#AffCalc-q335-BonusFrequency', data.bonusFrequency);
    selectIfVisible('#AffCalc-q345-Question','#AffCalc-q345-OvertimeFrequency', data.overtimeFrequency);
    selectIfVisible('#AffCalc-q355-Question','#AffCalc-q355-CommissionFrequency', data.commissionFrequency);
    clickIfVisible('.Affordability-q420 .Form-label', data.secondJob);
    selectIfVisible('#AffCalc-q780-Question','#AffCalc-q780-EmploymentCategory', data.jobEmploymentStatus2);
    selectIfVisible('#AffCalc-q790-Question','#AffCalc-q790-EmploymentType', data.contractType2);
    typeIfVisible("#AffCalc-q810-JobYears", data.duration2);
    typeIfVisible("#AffCalc-q860-GrossAnnualIncome", data.jobSalary2);
    typeIfVisible('#AffCalc-q870-Bonus', data.bonus2);
    selectIfVisible('#AffCalc-q875-Question','#AffCalc-q875-BonusFrequency', data.bonus2Frequency);
    typeIfVisible('#AffCalc-q880-Overtime', data.overtime2);
    selectIfVisible('#AffCalc-q885-Question','#AffCalc-q885-OvertimeFrequency', data.overtime2Frequency);
    typeIfVisible('#AffCalc-q890-Commission', data.commission2);
    selectIfVisible('#AffCalc-q895-Question','#AffCalc-q895-CommissionFrequency', data.commission2Frequency);
    typeIfVisible("#AffCalc-q820-BusinessYears", data.businessDuration2);
    typeIfVisible('#AffCalc-q920-LatestPeriodProfitShare', data.profitShare2);
    typeIfVisible('#AffCalc-q930-PreviousPeriodProfitShare', data.profitShare2Prev);
    clickIfVisible('.Affordability-q1150 .Form-label', data.otherIncome2);
    clickIfVisible('.Affordability-q960 .Form-label', data.secondJob2);
    clickIfVisible('.Affordability-q610 .Form-label', data.otherIncome);

    cy.get('.Affordability-step--2 > .Affordability-stepFooter > .Affordability-nextStep').click();

    typeIfVisible("#AffCalc-q1320-TotalCreditCardBalances", data.creditCardDebt);
    typeIfVisible("#AffCalc-q1360-MonthlyStudentLoan", data.studentLoan);
    typeIfVisible("#AffCalc-q1370-MonthlyTravelCosts", data.travelCosts);
    typeIfVisible("#AffCalc-q1380-MonthlyOtherExpenditure", data.otherMonthlyCosts);
    clickIfVisible('.Affordability-q1540 .Form-label', data.otherMortgage);
    clickIfVisible('.Affordability-q1590 .Form-label', data.otherMortgage2);
    typeIfVisible("#AffCalc-q1620-CouncilTax", data.councilTax);
    typeIfVisible("#AffCalc-q1630-BuildingInsurance", data.buildingsInsurance);

    cy.get('.Affordability-step--3 > .Affordability-stepFooter > .Affordability-nextStep').click();

    if (expectedResult === "able") {
      cy.get(".Affordability-mainResult > .Affordability-callout--green > p").should(
        "contain",
        "Based on your inputs, we may be able to lend your client(s) the following"
      );
    } else if (expectedResult === "unable") {
      cy.get(".Affordability-mainResult > .Affordability-callout--red > p").should(
        "contain",
        "Based on your inputs, we are unable to lend your client(s) any money"
      );
    } else {
      throw new Error(`Unsupported expectedResult: ${expectedResult}`);
    }
  }


  beforeEach(() => {
    acceptCookies();
    });

    it("should calculate affordability for each scenario", () => {
      cy.fixture('scenarios').then((scenarios) => {
        scenarios.forEach(({ scenario, data, expectedResult }) => {
          it(`should calculate affordability for ${scenario}`, () => {
            fillAndSubmitForm(data, expectedResult);
          });
        });
      });
    });
  });
