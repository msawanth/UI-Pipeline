/* eslint-disable no-undef */

class newPayee {
    static addAccountNumber(box_type) {
        if (box_type == 'Bank') {
            for(let i = 0; i < 2; i++) {
                cy.get('#apm-bank').click().type(Math.floor(Math.random() * 10));
            }
        }
        if (box_type == 'Branch') {
            for(let i = 0; i < 4; i++) {
                cy.get('#apm-branch').click().type(Math.floor(Math.random() * 10));
            }
        }
        if (box_type == 'Account') {
            for(let i = 0; i < 7; i++) {
                cy.get('#apm-account').click().type(Math.floor(Math.random() * 10));
            }
        }
        if (box_type == 'Suffix') {
            for(let i = 0; i < 3; i++) {
                cy.get('#apm-suffix').click().type('0');
            }
        }       
    }

    static addNewPayee(payeeName) {
        cy.get('button').contains('Add').click();
        cy.get('.js-modal-inner').should('be.visible');
        cy.get('#ComboboxInput-apm-name').click().type(payeeName);
        cy.get('a[href*="#-99"]').contains(payeeName).click();
    }

    static saveAndVerifyNewPayee(payeeName) {
        cy.get('.js-submit').click();
        cy.get('.message').should('have.text', 'Payee added');
        cy.get('.SearchBox-1-1-4').click().type(payeeName);
        cy.get('.List').as('returnedList');
        cy.get('@returnedList').find('.Avatar-title').contains(payeeName);
    }

    static validateErrorMessageOnEmptyName(payeeName) {
        cy.get('button').contains('Add').click();
        cy.get('.js-submit').click();
        cy.get('.js-tooltip-text').should('have.text', 'Payee Name is a required field. Please complete to continue.').and('be.visible');
        cy.get('#ComboboxInput-apm-name').click().type(payeeName);
        cy.get('a[href*="#-99"]').contains(payeeName).click();
    }

    static validateErrorMessageOnEmptyAccount() {
        cy.get('.js-submit').click();
        cy.get('.js-tooltip-text').should('have.text', 'Bank Code is a required field. Please complete to continue.').and('be.visible');
        newPayee.addAccountNumber('Bank');
        newPayee.addAccountNumber('Branch');
        newPayee.addAccountNumber('Account');
        newPayee.addAccountNumber('Suffix');
    }

    static validateErrorMessageDisappear() {
        cy.get('.js-tooltip-text').should('not.be.visible');
    }
}

export default newPayee;
