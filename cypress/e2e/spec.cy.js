const ACCEPT_COOKIES_URL = "https://www.nationwide-intermediary.co.uk/calculators/affordability-calculator";
const ACCEPT_COOKIE_BUTTON_SELECTOR = "#onetrust-accept-btn-handler";

describe("Mortgage Affordability Calculator Tests", () => {
  const acceptCookies = () => {
    cy.visit(ACCEPT_COOKIES_URL);
    cy.get(ACCEPT_COOKIE_BUTTON_SELECTOR).click();
  };

  const fillAndSubmitForm = (data, expectedResult) => {
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

    cy.contains('.Affordability-q135 .Form-label', data.propertyInScotland).click();
    cy.get('.Affordability-step--0 > .Affordability-stepFooter > .Affordability-nextStep').click();
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

// Click on the retirement status based on data

  

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

    cy.get("#AffCalc-q240-EmploymentCategory").select(data.employmentStatus);
    if(data.employmentStatus === "Employed") {
      cy.get("#AffCalc-q250-EmploymentType").select(data.contractType);
      cy.get("#AffCalc-q270-JobYears").type(data.jobDuration);
      cy.get("#AffCalc-q320-GrossAnnualIncome").type(data.salary);
      cy.get('#AffCalc-q330-Bonus').type(data.bonus + "{enter}");
      cy.get('#AffCalc-q340-Overtime').type(data.overtime + "{enter}");
      cy.get('#AffCalc-q350-Commission').type(data.commission+ "{enter}");
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
      if(data.jobEmploymentStatus2==="Employed") {
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
      }
    
    }
    cy.contains('.Affordability-q610 .Form-label', data.otherIncome).click();

    cy.get('.Affordability-step--2 > .Affordability-stepFooter > .Affordability-nextStep').click();

    cy.get("#AffCalc-q1320-TotalCreditCardBalances").type(data.creditCardDebt);
    cy.get("#AffCalc-q1360-MonthlyStudentLoan").type(data.studentLoan);
    cy.get("#AffCalc-q1370-MonthlyTravelCosts").type(data.travelCosts);
    cy.get("#AffCalc-q1380-MonthlyOtherExpenditure").type(data.otherMonthlyCosts);

    cy.contains('.Affordability-q1540 .Form-label', data.otherMortgage).click();
    if (data.numberOfApplicants==="2") {
      cy.contains('.Affordability-q1590 .Form-label', data.otherMortgage2).click();
    }

    if (data.propertyStatus === "Yes") {
      cy.get("#AffCalc-q1620-CouncilTax").type(data.councilTax);
      cy.get("#AffCalc-q1630-BuildingInsurance").type(data.buildingsInsurance);
    }
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
  };

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
        propertyTenure: "Leasehold",
        propertyType: "Flat",
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
        propertyStatus: "Yes",
        propertyTenure: "Leasehold",
        propertyType: "Flat",
        propertyInScotland: "Yes",
        purchasePrice: "400000",
        dob: { day: "12", month: "07", year: "1983" },
        individualStatus: "Existing Nationwide borrower",
        financialDependents: "Yes",
        numberFinancialDependentsAge0to5: "0",
        numberFinancialDependentsAge6to11: "1",
        numberFinancialDependentsAge12to17: "1",
        numberFinancialDependentsAge18More: "0",
        retired: "No",
        retirementAge: "68",
        employmentStatus: "Self employed (director)",
        businessDuration: "15",
        profitShare: "75000",
        profitSharePrev: "80000",
        contractType: "Contractor",
        jobDuration: "5",
        salary: "55000",
        bonus: "0",
        overtime: "0",
        commission: "0",
        secondJob: "Yes",
        jobEmploymentStatus2: "Employed",
        contractType2: "Permanent",
        duration2: "4",
        jobSalary2: "40000",
        bonus2: "2000",
        bonus2Frequency: "Annually",
        commission2: "1500",
        commission2Frequency: "Annually",
        overtime2: "1000",
        overtime2Frequency: "Annually",
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
        overtimeFrequency: "Annually",
        commission: "4000",
        commissionFrequency: "Annually",
        secondJob: "Yes",
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
        propertyType: "Flat",
        propertyInScotland: "No",
        purchasePrice: "300000",
        dob: { day: "20", month: "01", year: "1990" },
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
