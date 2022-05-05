/* eslint-disable no-undef */
class newPayment {
    static newPaymentFromAccount(accountName) {
        cy.get('[data-testid="from-account-chooser"]').click();
        cy.get('[data-monitoring-label="Transfer Form Search"]').click().type(accountName);
        cy.get('[data-monitoring-label="Transfer Form Account Card"]').click();
    }

    static newPaymentToAccount(accountName) {
        cy.get('[data-testid="to-account-chooser"]').click();
        cy.get('[data-monitoring-label="Transfer Form Search"]').click().type(accountName);
        cy.get('[data-monitoring-label="Transfer Form Account Card"]').click();
    }

    static newPaymentTransferAmount(amount) {
        cy.get('[data-monitoring-label="Transfer Form Amount"]').click().type(amount);
        cy.get('[data-monitoring-label="Transfer Form Submit"]').click();
        cy.get('.message').should('have.text', 'Transfer successful');
    }

    static validateAccountBalance(accountName, balance) {
        cy.get('.account').contains(accountName).click();        
        cy.get('.transactions-panel').should('be.visible');
        cy.get('.Banve').contains(balance);
        cy.get('.js-close-modal-button').click();
    }
}

export default newPayment;
