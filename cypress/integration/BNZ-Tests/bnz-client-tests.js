/* eslint-disable no-undef */
import { generateSlug } from "random-word-slugs";
import gridFunctions from "../../support/pageObjects/gridFunctions";
import newPayee from "../../support/pageObjects/newPayee";
import newPayment from "../../support/pageObjects/newPayment";
import pageNavigation from "../../support/pageObjects/pageNavigation";


describe('BNZ Client Functional Tests', () => {
    beforeEach(() => {
        // cy.visit(Cypress.env('baseURL'));
        cy.visit(Cypress.env('baseURL'), {
            headers: {
                "Accept-Encoding": "gzip, deflate"
            }
        });
        cy.get('.button').should('be.visible').click();
        cy.get('#YouMoney').should('exist').and('be.visible');
    });

    const payee = generateSlug(1);

    it ('Verify you can navigate to Payees page using the navigation menu', () => {
        pageNavigation.navigateToPayees();
    });

    it ('Verify you can add new payee in the Payees page', () => {
        pageNavigation.navigateToPayees();
        newPayee.addNewPayee(payee);
        newPayee.addAccountNumber('Bank');
        newPayee.addAccountNumber('Branch');
        newPayee.addAccountNumber('Account');
        newPayee.addAccountNumber('Suffix');
        newPayee.saveAndVerifyNewPayee(payee);
    });

    it ('Verify payee name is a required field', () => {
        pageNavigation.navigateToPayees();
        newPayee.validateErrorMessageOnEmptyName(payee);
        newPayee.validateErrorMessageOnEmptyAccount();
        newPayee.validateErrorMessageDisappear();
    });

    it ('Verify that payees can be sorted by name', () => {
        pageNavigation.navigateToPayees();
        gridFunctions.sortAsec();
        gridFunctions.validateSort();
        gridFunctions.sortDesc();
        gridFunctions.validateSort();
    });

    it ('Navigate to Payments page', () => {
        pageNavigation.navigateToPayment();
        newPayment.newPaymentFromAccount('Everyday');
        newPayment.newPaymentToAccount('Bills');
        newPayment.newPaymentTransferAmount('500');
        newPayment.validateAccountBalance('Bills', '920.00');
        newPayment.validateAccountBalance('Everyday', '2,000.00');
    });
});