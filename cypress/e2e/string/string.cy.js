import {button, circle, input} from "../constants/elements";


describe('String page test', () => {
    beforeEach(() => {
        cy.visit('recursion');
    })
    it('button test', () => {
        cy.get(input).as('input');
        cy.get('@input').should('have.value', '');

        cy.get(button).as('button');
        cy.get('@button').should('be.disabled');

        cy.get('@input').type('some');
        cy.get('@button').should('not.be.disabled');

        cy.get('@input').type('{backspace}{backspace}{backspace}{backspace}');
        cy.get('@button').should('be.disabled');
    })
    it('reverse string test', () => {
        cy.get(input).as('input');
        cy.get(button).as('button');

        cy.get('@input').type('some');
        cy.get('@button').click();

        cy.get(circle).first().as('first');
        cy.get(circle).eq(1).as('second');
        cy.get(circle).eq(2).as('third');
        cy.get(circle).eq(3).as('fourth');

        cy.get('@first', {timeout: 100}).should('have.text', 's').and('contains', /circle_default/);
        cy.get('@second', {timeout: 100}).should('have.text', 'o').and('contains', /circle_default/);
        cy.get('@third', {timeout: 100}).should('have.text', 'm').and('contains', /circle_default/);
        cy.get('@fourth', {timeout: 100}).should('have.text', 'e').and('contains', /circle_default/);

        cy.wait(1000);

        cy.get('@first').should('have.text', 'e').and('contains', /circle_changing/);
        cy.get('@second').should('have.text', 'o').and('contains', /circle_default/);
        cy.get('@third').should('have.text', 'm').and('contains', /circle_default/);
        cy.get('@fourth').should('have.text', 's').and('contains', /circle_changing/);

        cy.wait(1000);

        cy.get('@first').should('have.text', 'e').and('contains', /circle_modified/);
        cy.get('@second').should('have.text', 'm').and('contains', /circle_changing/);
        cy.get('@third').should('have.text', 'o').and('contains', /circle_changing/);
        cy.get('@fourth').should('have.text', 's').and('contains', /circle_modified/);

        cy.wait(1000);

        cy.get('@first').should('have.text', 'e').and('contains', /circle_modified/);
        cy.get('@second').should('have.text', 'm').and('contains', /circle_modified/);
        cy.get('@third').should('have.text', 'o').and('contains', /circle_modified/);
        cy.get('@fourth').should('have.text', 's').and('contains', /circle_modified/);
    })
})