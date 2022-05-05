/* eslint-disable no-undef */
class pageNavigation {
    static navigateToPayees() {
        cy.get('.js-main-menu-button-text').click();
        cy.get('a[href*="/client/payees"]').contains('Payees').click();
        cy.get('.Payees').should('exist').and('be.visible');
        cy.get('.CustomPage-heading').should('contain.text', 'Payees');
    }

    static navigateToPayment() {
        cy.get('.js-main-menu-button-text').click();
        cy.get('.js-main-menu-paytransfer').click();
        cy.get('.ReactModal__Content').should('be.visible');
    }
}

export default pageNavigation;
