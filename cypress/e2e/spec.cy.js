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

  const scenarios = [
    {
      scenario: "Scenario 1 - Eligible",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Remortgage existing property",
        loanAmount: "100000",
        mortgageTerm: "25",
        borrowedFunds: "Yes",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Detached house",
        propertyInScotland: "No",
        purchasePrice: "150000",
        currentEstimatedValue: "150000",
        AmountTransferredFromOtherLender: "20000",
        dob: { day: "01", month: "01", year: "1985" },
        individualStatus: "First time buyer",
        financialDependents: "No",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        dob2: { day: "", month: "", year: "" },
        jobDuration: "5",
        salary: "80000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        otherIncome: "Yes",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "500",
        studentLoan: "1000",
        travelCosts: "100",
        otherMonthlyCosts: "200",
        councilTax: "1500",
        buildingsInsurance: "200",
      },
      expectedResult: "able",
    },
    {
      scenario: "Scenario 2 - Not Eligible",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "500000",
        mortgageTerm: "25",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Detached house",
        propertyInScotland: "No",
        purchasePrice: "250000",
        dob: { day: "01", month: "01", year: "1995" },
        dob2: { day: "", month: "", year: "" },
        individualStatus: "First time buyer",
        financialDependents: "No",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "1",
        salary: "30000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "1000",
        studentLoan: "2000",
        travelCosts: "100",
        otherMonthlyCosts: "200",
        councilTax: "1500",
        buildingsInsurance: "200",
      },
      expectedResult: "unable",
    },
    {
      scenario: "Scenario 3 - Eligible",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "150000",
        mortgageTerm: "20",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Semi-detached house",
        propertyInScotland: "No",
        purchasePrice: "200000",
        dob: { day: "15", month: "05", year: "1980" },
        dob2: { day: "", month: "", year: "" },
        individualStatus: "Existing Nationwide borrower",
        financialDependents: "No",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "10",
        salary: "60000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "500",
        studentLoan: "0",
        travelCosts: "150",
        otherMonthlyCosts: "300",
        councilTax: "1800",
        buildingsInsurance: "250",
      },
      expectedResult: "able",
    },
    {
      scenario: "Scenario 4 - Not Eligible",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "400000",
        mortgageTerm: "25",
        ownershipType: "Standard",
        propertyStatus: "No",
        propertyTenure: "",
        propertyType: "Purpose-built flat/maisonette",
        propertyInScotland: "Yes",
        purchasePrice: "400000",
        dob: { day: "20", month: "10", year: "1990" },
        individualStatus: "First time buyer",
        financialDependents: "Yes",
        numberFinancialDependentsAge0to5: "1",
        numberFinancialDependentsAge6to11: "1",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "67",
        employmentStatus: "Self employed (partner)",
        profitShare: "40000",
        profitSharePrev: "45000",
        contractType: "Contractor",
        jobDuration: "3",
        businessDuration: "10",
        salary: "40000",
        bonus: "0",
        bonusFrequency: "0",
        overtime: "0",
        overtimeFrequency: "0",
        commission: "0",
        commissionFrequency: "0",
        secondJob: "No",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "2000",
        studentLoan: "3000",
        travelCosts: "200",
        otherMonthlyCosts: "400",
        councilTax: "1500",
        buildingsInsurance: "300",
        dob2: { day: "01", month: "01", year: "1985" },
        individualStatus2: "First time buyer",
        financialDependents2: "No",
        numberFinancialDependents2Age0to5: "0",
        numberFinancialDependents2Age6to11: "0",
        numberFinancialDependents2Age12to17: "0",
        numberFinancialDependents2Age18More: "0",
        retired2: "No",
        retirementAge2: "65"
      },
      expectedResult: "unable",
    },
    {
      scenario: "Scenario 5 - Eligible",
      data: {
        numberOfApplicants: "2",
        mortgagePurpose: "Buy a new property",
        loanAmount: "250000",
        mortgageTerm: "30",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Terraced house",
        propertyInScotland: "No",
        purchasePrice: "300000",
        dob: { day: "15", month: "08", year: "1985" },
        individualStatus: "Existing Nationwide borrower",
        financialDependents: "Yes",
        numberFinancialDependentsAge0to5: "1",
        numberFinancialDependentsAge6to11: "1",
        numberFinancialDependentsAge12to17: "1",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "6",
        salary: "50000",
        bonus: "5000",
        bonusFrequency: "Annually",
        overtime: "2000",
        overtimeFrequency: "Annually",
        commission: "3000",
        commissionFrequency: "Annually",
        secondJob: "No",
        bonus2: "1000",
        bonus2Frequency: "Annually",
        commission2: "1000",
        commission2Frequency: "Annually",
        overtime2: "1000",
        overtime2Frequency: "Annually",
        contractType2: "Permanent",
        duration2: "3",
        jobEmploymentStatus2: "Self employed (partner)",
        jobSalary2: "40000",
        secondJob2: "No",
        otherIncome2: "No",
        businessDuration2: "10",
        profitShare2: "40000",
        profitShare2Prev: "45000",
        otherIncome: "Yes",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "1000",
        studentLoan: "500",
        travelCosts: "200",
        otherMonthlyCosts: "300",
        councilTax: "1800",
        buildingsInsurance: "250",
        dob2: { day: "01", month: "01", year: "1985" },
        individualStatus2: "First time buyer",
        financialDependents2: "No",
        numberFinancialDependents2Age0to5: "0",
        numberFinancialDependents2Age6to11: "0",
        numberFinancialDependents2Age12to17: "0",
        numberFinancialDependents2Age18More: "0",
        retired2: "No",
        retirementAge2: "65"
      },
      expectedResult: "able",
    },
    {
      scenario: "Scenario 6 - Not Eligible due to insufficient income",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "300000",
        mortgageTerm: "30",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Semi-detached house",
        propertyInScotland: "No",
        purchasePrice: "350000",
        dob: { day: "10", month: "05", year: "1980" },
        individualStatus: "Existing Nationwide borrower",
        financialDependents: "Yes",
        numberFinancialDependentsAge0to5: "1",
        numberFinancialDependentsAge6to11: "1",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "10",
        salary: "40000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "2000",
        studentLoan: "3000",
        travelCosts: "200",
        otherMonthlyCosts: "400",
        councilTax: "1500",
        buildingsInsurance: "300",
        dob2:{day: "01", month: "01", year: "1985"},
        individualStatus2: "First time buyer",
        financialDependents2: "No",
        retired2: "No",
        retirementAge2: "65",
      },
      expectedResult: "unable",
    },
    {
      scenario: "Scenario 7 - Not Eligible with Complex Employment Status",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "350000",
        mortgageTerm: "25",
        ownershipType: "Shared equity",
        marketValue: "350000",
        propertyStatus: "Yes",
        propertyTenure: "Leasehold",
        propertyType: "Purpose-built flat/maisonette",
        propertyInScotland: "Yes",
        purchasePrice: "400000",
        dob: { day: "12", month: "07", year: "1983" },
        dob2: { day: "", month: "", year: "" },
        individualStatus: "Existing Nationwide borrower",
        financialDependents: "Yes",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "1",
        numberFinancialDependentsAge12to17: "1",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "68",
        employmentStatus: "Self employed (partner)",
        businessDuration: "15",
        profitShare: "75000",
        profitSharePrev: "80000",
        contractType: "Contractor",
        jobDuration: "5",
        salary: "55000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        jobEmploymentStatus2: "Employed",
        contractType2: "Permanent",
        duration2: "4",
        jobSalary2: "40000",
        bonus2: "2000",
        bonus2Frequency: "Annually",
        commission2: "1500",
        commission2Frequency: "Annually",
        overtime2: "1000",
        secondJob2: "No",
        overtime2Frequency: "Annually",
        sharePurchasePrice: "50000",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "1500",
        studentLoan: "2500",
        travelCosts: "300",
        otherMonthlyCosts: "400",
        councilTax: "2000",
        buildingsInsurance: "300",
      },
      expectedResult: "unable",
    },
    {
      scenario: "Scenario 8 - Eligible with Multiple Income Sources",
      data: {
        numberOfApplicants: "2",
        mortgagePurpose: "Buy a new property",
        loanAmount: "300000",
        mortgageTerm: "30",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Terraced house",
        propertyInScotland: "No",
        purchasePrice: "350000",
        dob: { day: "05", month: "11", year: "1980" },
        individualStatus: "First time buyer",
        individualStatus2: "Existing Nationwide borrower",
        financialDependents: "No",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "10",
        salary: "70000",
        bonus: "6000",
        bonusFrequency: "Annually",
        overtime: "3000",
        dob2: { day: "05", month: "11", year: "1980" },
        overtimeFrequency: "Annually",
        commission: "4000",
        commissionFrequency: "Annually",
        secondJob: "No",
        jobEmploymentStatus2: "Self employed (partner)",
        contractType2: "Contractor",
        businessDuration2: "8",
        profitShare2: "50000",
        profitShare2Prev: "55000",
        jobSalary2: "45000",
        bonus2: "3000",
        bonus2Frequency: "Annually",
        commission2: "2500",
        commission2Frequency: "Annually",
        overtime2: "1500",
        overtime2Frequency: "Annually",
        financialDependents2: "No",
        otherIncome2: "No",
        numberFinancialDependents2Age0to5: "0",
        numberFinancialDependents2Age6to11: "0",
        numberFinancialDependents2Age12to17: "0",
        numberFinancialDependents2Age18More: "0",
        retired2: "No",
        retirementAge2: "65",
        secondJob2: "No",
        otherIncome: "Yes",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "1000",
        studentLoan: "800",
        travelCosts: "200",
        otherMonthlyCosts: "350",
        councilTax: "1600",
        buildingsInsurance: "200",
      },
      expectedResult: "able",
    },
    {
      scenario: "Scenario 9 - Not Eligible with High Debt and Low Income",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "200000",
        mortgageTerm: "20",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Detached house",
        propertyInScotland: "No",
        purchasePrice: "250000",
        dob: { day: "15", month: "07", year: "1992" },
        dob2: { day: "", month: "", year: "" },
        individualStatus: "First time buyer",
        financialDependents: "No",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "5",
        salary: "35000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "5000",
        studentLoan: "3000",
        travelCosts: "150",
        otherMonthlyCosts: "200",
        councilTax: "1500",
        buildingsInsurance: "200",
      },
      expectedResult: "unable",
    },
    {
      scenario: "Scenario 10 - Eligible with Additional Sources of Income",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Remortgage existing property",
        loanAmount: "150000",
        mortgageTerm: "25",
        borrowedFunds: "Yes",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Detached house",
        propertyInScotland: "No",
        purchasePrice: "200000",
        currentEstimatedValue: "200000",
        AmountTransferredFromOtherLender: "25000",
        dob: { day: "25", month: "09", year: "1980" },
        dob2: { day: "", month: "", year: "" },
        individualStatus: "Existing Nationwide borrower",
        financialDependents: "No",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "10",
        salary: "55000",
        bonus: "5000",
        bonusFrequency: "Annually",
        overtime: "2000",
        overtimeFrequency: "Annually",
        commission: "3000",
        commissionFrequency: "Annually",
        secondJob: "No",
        otherIncome: "Yes",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "800",
        studentLoan: "1200",
        travelCosts: "150",
        otherMonthlyCosts: "250",
        councilTax: "1600",
        buildingsInsurance: "180",
      },
      expectedResult: "able",
    },
    {
      scenario: "Scenario 11 - Eligible with High Income and Low Expenses",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "300000",
        mortgageTerm: "30",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Freehold",
        propertyType: "Detached house",
        propertyInScotland: "No",
        purchasePrice: "350000",
        dob: { day: "10", month: "06", year: "1985" },
        dob2: { day: "", month: "", year: "" },
        individualStatus: "First time buyer",
        financialDependents: "No",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "15",
        salary: "80000",
        bonus: "10000",
        bonusFrequency: "Annually",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "0",
        studentLoan: "0",
        travelCosts: "0",
        otherMonthlyCosts: "0",
        councilTax: "1500",
        buildingsInsurance: "200",
      },
      expectedResult: "able",
    },
    {
      scenario: "Scenario 12 - Not Eligible with Insufficient Income",
      data: {
        numberOfApplicants: "1",
        mortgagePurpose: "Buy a new property",
        loanAmount: "250000",
        mortgageTerm: "25",
        ownershipType: "Standard",
        propertyStatus: "Yes",
        propertyTenure: "Leasehold",
        propertyType: "Purpose-built flat/maisonette",
        propertyInScotland: "No",
        purchasePrice: "300000",
        dob: { day: "20", month: "01", year: "1990" },
        dob2: { day: "", month: "", year: "" },
        individualStatus: "First time buyer",
        financialDependents: "Yes",
        numberFinancialDependentsAge0to5: "1",
        numberFinancialDependentsAge6to11: "0",
        numberFinancialDependentsAge12to17: "0",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "65",
        employmentStatus: "Employed",
        contractType: "Permanent",
        jobDuration: "8",
        salary: "40000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "No",
        otherIncome: "No",
        otherMortgage: "No",
        otherMortgage2: "No",
        creditCardDebt: "500",
        studentLoan: "800",
        travelCosts: "100",
        otherMonthlyCosts: "200",
        councilTax: "1200",
        buildingsInsurance: "150",
      },
      expectedResult: "unable",
    }
  ];

  beforeEach(() => {
    acceptCookies();
    });

  scenarios.forEach(({ scenario, data, expectedResult }) => {
    it(`should calculate affordability for ${scenario}`, () => {
      fillAndSubmitForm(data, expectedResult);
    });
  });
});
