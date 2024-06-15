const ACCEPT_COOKIES_URL = "https://www.nationwide-intermediary.co.uk/calculators/affordability-calculator";
const ACCEPT_COOKIE_BUTTON_SELECTOR = "#onetrust-accept-btn-handler";

describe("Mortgage Affordability Calculator Tests", () => {
  
  beforeEach(() => {
    cy.visit(ACCEPT_COOKIES_URL);
    cy.get(ACCEPT_COOKIE_BUTTON_SELECTOR).click();
    cy.log("Cookies accepted");
  });

  const fillBasicDetails = (data) => {
    cy.log("Filling basic details");
    cy.contains('.Affordability-q0 .Form-label', data.numberOfApplicants).click();
    cy.contains('.Affordability-q10 .Form-label', data.mortgagePurpose).click();
    cy.get("#AffCalc-q20-BorrowingAmount").type(data.loanAmount);
    cy.get("#AffCalc-q30-MortgageTermYears").type(data.mortgageTerm);
    cy.get("#AffCalc-q40-OwnershipType").select(data.ownershipType);

    if (data.ownershipType === "Shared equity") {
      cy.get('#AffCalc-q50-MarketValue').should('be.visible').type(data.marketValue);
    }

    if (data.mortgagePurpose !== "Remortgage existing property") {
      cy.get('.Affordability-q60 .Form-label').contains(data.propertyStatus).click();
      cy.get("#AffCalc-q90-PurchasePrice").type(data.purchasePrice + "{enter}");
    }

    if (data.mortgagePurpose !== "Buy a new property") {
      cy.get('#AffCalc-q120-CurrentEstimatedValue').should('be.visible').type(data.currentEstimatedValue);
    }

    if (data.propertyStatus === "Yes") {
      cy.get("#AffCalc-q70-PropertyTenure").select(data.propertyTenure);
      cy.get("#AffCalc-q80-PropertyType").select(data.propertyType);
    }

    if (data.ownershipType === "Shared equity" || data.ownershipType === "Right to buy") {
      cy.get('#AffCalc-q100-PurchasePrice').should('be.visible').type(data.sharePurchasePrice);
    }

    if (data.ownershipType === "Right to buy") {
      cy.get('#AffCalc-q110-PurchasePrice').should('be.visible').type(data.discPurchasePrice);
    }

    if (data.mortgagePurpose === "Remortgage existing property") {
      cy.contains('.Affordability-q15 .Form-label', data.borrowedFunds).click();
      cy.get('#AffCalc-q25-AmountTransferredFromOtherLender').should('be.visible').type(data.AmountTransferredFromOtherLender);
    }

   .contains('.Affordability-q135 .Form-label', data.propertyInScotland).click();
    cy.get('.Affordability-step--0 > .Affordability-stepFooter > .Affordability-nextStep').click();
  };

  const fillPersonalDetails = (data) => {
    cy.log("Filling personal details");
    cy.get("#AffCalc-q140-Day").type(data.dob.day);
    cy.get("#AffCalc-q140-Month").type(data.dob.month);
    cy.get("#AffCalc-q140-Year").type(data.dob.year + "{enter}");
    cy.get("#AffCalc-q145-PropertyTenure").select(data.individualStatus);
    cy.contains('.Affordability-q150 .Form-label', data.financialDependents).click();
    cy.contains('.Affordability-q170 .Form-label', data.retired).click();

    if (data.financialDependents === "Yes") {
      cy.get('#AffCalc-q160-Age0to5-0').should('be.visible').type(data.numberFinancialDependentsAge0to5);
      cy.get('#AffCalc-q160-Age6to11-1').should('be.visible').type(data.numberFinancialDependentsAge6to11);
      cy.get('#AffCalc-q160-Age12to17-2').should('be.visible').type(data.numberFinancialDependentsAge12to17);
      cy.get('#AffCalc-q160-Age18More-3').should('be.visible').type(data.numberFinancialDependentsAge18More);
    }

    if (data.numberOfApplicants === "2") {
      cy.get("#AffCalc-q190-Day").type(data.dob2.day);
      cy.get("#AffCalc-q190-Month").type(data.dob2.month);
      cy.get("#AffCalc-q190-Year").type(data.dob2.year + "{enter}");
      cy.get('#AffCalc-q195-JointApplicant-CustomerType').select(data.individualStatus2);
      cy.contains('.Affordability-q200 .Form-label', data.financialDependents2).click();
      if (data.financialDependents2 === "Yes") {
        cy.get('#AffCalc-q210-Age0to5-0').should('be.visible').type(data.numberFinancialDependents2Age0to5);
        cy.get('#AffCalc-q210-Age6to11-1').should('be.visible').type(data.numberFinancialDependents2Age6to11);
        cy.get('#AffCalc-q210-Age12to17-2').should('be.visible').type(data.numberFinancialDependents2Age12to17);
        cy.get('#AffCalc-q210-Age18More-3').should('be.visible').type(data.numberFinancialDependents2Age18More);
      }
      cy.contains('.Affordability-q220 .Form-label', data.retired2).click();
      cy.get('#AffCalc-q230-RetirementAge').type(data.retirementAge2);
    }
    cy.get('#AffCalc-q180-RetirementAge').type(data.retirementAge);
    cy.get('.Affordability-step--1 > .Affordability-stepFooter > .Affordability-nextStep').click();
  };

  const fillEmploymentDetails = (data) => {
    cy.log("Filling employment details");
    cy.get("#AffCalc-q240-EmploymentCategory").select(data.employmentStatus);
    if(data.employmentStatus === "Employed") {
      cy.get("#AffCalc-q250-EmploymentType").select(data.contractType);
      cy.get("#AffCalc-q270-JobYears").type(data.jobDuration);
      cy.get("#AffCalc-q320-GrossAnnualIncome").type(data.salary);
      cy.get('#AffCalc-q330-Bonus').type(data.bonus + "{enter}");
      cy.get('#AffCalc-q340-Overtime').type(data.overtime + "{enter}");
      cy.get('#AffCalc-q350-Commission').type(data.commission + "{enter}");
    }
    if(data.employmentStatus === "Self employed (partner)") {
      cy.get("#AffCalc-q280-BusinessYears").type(data.businessDuration);
      cy.get('#AffCalc-q380-LatestPeriodProfitShare').type(data.profitShare);
      cy.get('#AffCalc-q390-PreviousPeriodProfitShare').type(data.profitSharePrev);
    }

    if(data.bonus > 0) {
      cy.get('#AffCalc-q335-BonusFrequency').select(data.bonusFrequency);
    }
    if(data.overtime > 0) {
      cy.get('#AffCalc-q345-OvertimeFrequency').select(data.overtimeFrequency);
    }
    if(data.commission > 0) {
      cy.get('#AffCalc-q355-CommissionFrequency').select(data.commissionFrequency);
    }

    cy.contains('.Affordability-q420 .Form-label', data.secondJob).click();
    if(data.numberOfApplicants === "2") {
      cy.get('#AffCalc-q780-EmploymentCategory').select(data.jobEmploymentStatus2);
      if(data.jobEmploymentStatus2 === "Employed") {
        cy.get('#AffCalc-q790-EmploymentType').select(data.contractType2);
        cy.get("#AffCalc-q810-JobYears").type(data.duration2);
        cy.get("#AffCalc-q860-GrossAnnualIncome").type(data.jobSalary2);
        cy.get('#AffCalc-q870-Bonus').type(data.bonus2);
        if(data.bonus2 > 0) {
          cy.get('#AffCalc-q875-BonusFrequency').select(data.bonus2Frequency);
        }
        cy.get('#AffCalc-q880-Overtime').type(data.overtime2);
        if(data.overtime2 > 0) {
          cy.get('#AffCalc-q885-OvertimeFrequency').select(data.overtime2Frequency);
        }
        cy.get('#AffCalc-q890-Commission').type(data.commission2);
        if(data.commission2 > 0) {
          cy.get('#AffCalc-q895-CommissionFrequency').select(data.commission2Frequency);
        }
      }
      if(data.jobEmploymentStatus2 === "Self employed (partner)") {
        cy.get("#AffCalc-q820-BusinessYears").type(data.businessDuration2);
        cy.get('#AffCalc-q920-LatestPeriodProfitShare').type(data.profitShare2);
        cy.get('#AffCalc-q930-PreviousPeriodProfitShare').type(data.profitShare2Prev);
        cy.contains('.Affordability-q1150 .Form-label', data.otherIncome2).click();
        cy.contains('.Affordability-q960 .Form-label', data.secondJob2).click();
        cy.contains('.Affordability-q970 .Form-label', data.retired2).click();
        cy.get('#AffCalc-q980-RetirementAge').type(data.retirementAge2);
        cy.get('#AffCalc-q1050-RetirementAge').type(data.retirementAge2);
        cy.get('.Affordability-step--3 > .Affordability-stepFooter > .Affordability-nextStep').click();
      }
      cy.get('.Affordability-q1150 .Form-label', data.otherIncome2).click();
    }
    cy.get('.Affordability-q180 .Form-label', data.secondJob).click();
    cy.get('.Affordability-q190 .Form-label', data.retired).click();
    cy.get('#AffCalc-q220-RetirementAge').type(data.retirementAge);
    cy.get('.Affordability-step--2 > .Affordability-stepFooter > .Affordability-nextStep').click();
  };

  const fillFinancialDetails = (data) => {
    cy.log("Filling financial details");
    cy.get('#AffCalc-q430-TotalOtherCommitments').type(data.totalOtherCommitments);
    cy.get('#AffCalc-q440-MonthlyRepayments').type(data.monthlyRepayments);
    cy.get('#AffCalc-q450-TotalCreditCardLimits').type(data.creditCardLimits);
    cy.get('#AffCalc-q460-TotalCreditCardBalances').type(data.creditCardBalances);
    cy.get('#AffCalc-q470-TotalOverdraftLimits').type(data.overdraftLimits);
    cy.get('#AffCalc-q480-TotalOverdraftBalances').type(data.overdraftBalances);
    cy.get('#AffCalc-q490-TotalOtherExpenditure').type(data.totalOtherExpenditure);
    cy.get('#AffCalc-q500-TotalHouseholdExpenditure').type(data.totalHouseholdExpenditure);
    cy.get('#AffCalc-q510-HouseholdIncome').type(data.householdIncome + "{enter}");
  };

  const assertResults = (data) => {
    cy.log("Asserting results");
    cy.get('#AffCalc-q530-TotalHouseholdExpenditure').should('have.text', data.householdExpenditure).contains(data.householdExpenditure);
    cy.get('#AffCalc-q560-MaximumMortgage').should('have.text', data.maximumMortgage);
    cy.get('#AffCalc-q570-LTV').should('have.text', data.ltv);
    cy.get('#AffCalc-q590-MaximumMonthlyRepayment').should('have.text', data.maximumMonthlyRepayment);
    cy.get('#AffCalc-q600-TotalMonthlyIncome').should('have.text', data.monthlyIncome);
    cy.get('#AffCalc-q610-MaximumMortgageTerm').should('have.text', data.maximumMortgageTerm);
    cy.get('#AffCalc-q620-MaximumLoanToIncome').should('have.text', data.maximumLoanToIncome);
    cy.get('#AffCalc-q630-NetDisposableIncome').should('have.text', data.netDisposableIncome);
    cy.get('#AffCalc-q650-TotalOtherExpenditure').should('have.text', data.totalOtherExpenditure);
    cy.get('#AffCalc-q670-TotalExpenditure').should('have.text', data.totalExpenditure);
  };

  it("Should calculate affordability for a single applicant buying a new property", () => {
    const testData = {
      numberOfApplicants: "1",
      mortgagePurpose: "Buy a new property",
      loanAmount: "250000",
      mortgageTerm: "25",
      ownershipType: "Full ownership",
      marketValue: "300000",
      purchasePrice: "250000",
      propertyStatus: "Yes",
      propertyTenure: "Freehold",
      propertyType: "Detached",
      propertyInScotland: "No",
      dob: { day: "01", month: "01", year: "1980" },
      individualStatus: "Owner occupier",
      financialDependents: "No",
      retired: "No",
      retirementAge: "70",
      employmentStatus: "Employed",
      contractType: "Permanent",
      jobDuration: "10",
      salary: "45000",
      bonus: "5000",
      bonusFrequency: "Annually",
      overtime: "2000",
      overtimeFrequency: "Monthly",
      commission: "3000",
      commissionFrequency: "Quarterly",
      secondJob: "No",
      totalOtherCommitments: "500",
      monthlyRepayments: "1500",
      creditCardLimits: "2000",
      creditCardBalances: "500",
      overdraftLimits: "1000",
      overdraftBalances: "200",
      totalOtherExpenditure: "1000",
      totalHouseholdExpenditure: "2000",
      householdIncome: "50000",
      householdExpenditure: "2500",
      maximumMortgage: "250000",
      ltv: "83.33%",
      maximumMonthlyRepayment: "1833.33",
      monthlyIncome: "4166.67",
      maximumMortgageTerm: "25",
      maximumLoanToIncome: "5.00",
      netDisposableIncome: "3166.67",
      totalExpenditure: "3500"
    };

    fillBasicDetails(testData);
    fillPersonalDetails(testData);
    fillEmploymentDetails(testData);
    fillFinancialDetails(testData);
    assertResults(testData);
  });

  it("Should calculate affordability for joint applicants buying a new", () => {
    const testData = {
      numberOfApplicants: "2",
      mortgagePurpose: "Buy a new property",
      loanAmount: "400000",
      mortgageTerm: "30",
      ownershipType: "Full ownership",
      marketValue: "500000",
      purchasePrice: "400000",
      propertyStatus: "Yes",
      propertyTenure: "Leasehold",
      propertyType: "Terraced",
      propertyInScotland: "No",
      dob: { day: "01", month: "01", year: "1980" },
      individualStatus: "Owner occupier",
      financialDependents: "Yes",
      numberFinancialDependentsAge0to5: "1",
      numberFinancialDependentsAge6to11: "2",
      numberFinancialDependentsAge12to17: "0",
      numberFinancialDependentsAge18More: "0",
      retired: "No",
      retirementAge: "70",
      employmentStatus: "Employed",
      contractType: "Permanent",
      jobDuration: "15",
      salary: "60000",
      bonus: "6000",
      bonusFrequency: "Annually",
      overtime: "3000",
      overtimeFrequency: "Monthly",
      commission: "4000",
      commissionFrequency: "Quarterly",
      secondJob: "No",
      dob2: { day: "01", month: "01", year: "1985" },
      individualStatus2: "Owner occupier",
      financialDependents2: "No",
      retired2: "No",
      retirementAge2: "75",
      jobEmploymentStatus2: "Employed",
      contractType2: "Permanent",
      duration2: "15",
      jobSalary2: "55000",
      bonus2: "5500",
      bonus2Frequency: "Annually",
      overtime2: "2500",
      overtime2Frequency: "Monthly",
      commission2: "3500",
      commission2Frequency: "Quarterly",
      secondJob2: "Yes",
      businessDuration2: "2",
      profitShare2: "5500",
      profitShare2Prev: "4500",
      otherIncome2: "No",
      totalOtherCommitments: "600",
      monthlyRepayments: "2000",
      creditCardLimits: "3000",
      creditCardBalances: "800",
      overdraftLimits: "1500",
      overdraftBalances: "300",
      totalOtherExpenditure: "1200",
      totalHouseholdExpenditure: "2500",
      householdIncome: "115000",
      householdExpenditure: "3500",
      maximumMortgage: "400000",
      ltv: "80.00%",
      maximumMonthlyRepayment: "2666.67",
      monthlyIncome: "9583.33",
      maximumMortgageTerm: "30",
      maximumLoanToIncome: "3.48",
      netDisposableIncome: "6083.33",
      totalExpenditure: "6700"
    };

    fillBasicDetails(testData);
    fillPersonalDetails(testData);
    fillEmploymentDetails(testData);
    fillFinancialDetails(testData);
    assertResults(testData);
  });

  it("Should calculate affordability for a single applicant remortgaging existing property", () => {
    const testData = {
      numberOfApplicants: "1",
      mortgagePurpose: "Remortgage existing property",
      loanAmount: "180000",
      mortgageTerm: "20",
      ownershipType: "Full ownership",
      propertyStatus: "Yes",
      borrowedFunds: "No",
      AmountTransferredFromOtherLender: "0",
      propertyInScotland: "No",
      dob: { day: "01", month: "01", year: "1975" },
      individualStatus: "Owner occupier",
      financialDependents: "Yes",
      numberFinancialDependentsAge0to5: "2",
      numberFinancialDependentsAge6to11: "1",
      numberFinancialDependentsAge12to17: "0",
      numberFinancialDependentsAge18More: "1",
      retired: "No",
      retirementAge: "70",
      employmentStatus: "Employed",
      contractType: "Permanent",
      jobDuration: "20",
      salary: "50000",
      bonus: "4000",
      bonusFrequency: "Annually",
      overtime: "1500",
      overtimeFrequency: "Monthly",
      commission: "2500",
      commissionFrequency: "Quarterly",
      secondJob: "Yes",
      totalOtherCommitments: "700",
      monthlyRepayments: "1700",
      creditCardLimits: "2500",
      creditCardBalances: "600",
      overdraftLimits: "1200",
      overdraftBalances: "250",
      totalOtherExpenditure: "1500",
      totalHouseholdExpenditure: "3000",
      householdIncome: "60000",
      householdExpenditure: "2000",
      maximumMortgage: "180000",
      ltv: "80.00%",
      maximumMonthlyRepayment: "1416.67",
      monthlyIncome: "5000",
      maximumMortgageTerm: "20",
      maximumLoanToIncome: "3.60",
      netDisposableIncome: "3500",
      totalExpenditure: "3700"
    };

    fillBasicDetails(testData);
    fillPersonalDetails(testData);
    fillEmploymentDetails(testData);
    fillFinancialDetails(testData);
    assertResults(testData);
  });
});