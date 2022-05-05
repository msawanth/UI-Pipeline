/* eslint-disable no-undef */

class gridFunctions {
    static sortAsec() {
        cy.get('.js-payee-name-column').as('columnSort');
        cy.get('@columnSort').then((list) => {
            // eslint-disable-next-line no-empty
            if (list.find('.IconChevronDownSolid').length > 0) {
                cy.log('List is already sorted in ascending order');
            } else {
                cy.get('@columnSort').click();
            }
        });
    }

    static sortDesc() {
        cy.get('.js-payee-name-column').as('columnSort');
        cy.get('@columnSort').then((list) => {
            // eslint-disable-next-line no-empty
            if (list.find('.IconChevronUpSolid').length > 0) {
                cy.log('List is already sorted in descending order');
            } else {
                cy.get('@columnSort').click();
            }
        });
    }

    static validateSort() {
        cy.get('.List').then(items => {
            const unsortedItems = items.map((index, html) => Cypress.$(html).text()).get();
            const sortedItems = unsortedItems.slice().sort();
            expect(unsortedItems, 'Items are sorted').to.deep.equal(sortedItems);
        });      
    }
}

export default gridFunctions;
