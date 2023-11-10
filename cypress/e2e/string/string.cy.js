import {button, circle, input} from "../constants/elements";
import {changingStyle, defaultStyle, modifiedStyle} from "../constants/styles";


describe('String algorithm test', () => {
    beforeEach(() => {
        cy.visit('recursion');
    })
    it('button should be disabled if input is empty and active if it is not', () => {
        cy.get(input).as('input');
        cy.get('@input').should('have.value', '');

        cy.get(button).as('button');
        cy.get('@button').should('be.disabled');

        cy.get('@input').type('some');
        cy.get('@button').should('not.be.disabled');

        cy.get('@input').type('{backspace}{backspace}{backspace}{backspace}');
        cy.get('@button').should('be.disabled');
    })
    it('reverse of string should work correctly', () => {
        cy.get(input).as('input');
        cy.get(button).as('button');

        cy.get('@input').type('some');
        cy.get('@button').click();

        cy.get(circle).eq(0).as('first');
        cy.get(circle).eq(1).as('second');
        cy.get(circle).eq(2).as('third');
        cy.get(circle).eq(3).as('fourth');

        cy.get('@first', {timeout: 100}).should('have.text', 's').and('have.css', 'border', defaultStyle);
        cy.get('@second', {timeout: 100}).should('have.text', 'o').and('have.css', 'border', defaultStyle);
        cy.get('@third', {timeout: 100}).should('have.text', 'm').and('have.css', 'border', defaultStyle);
        cy.get('@fourth', {timeout: 100}).should('have.text', 'e').and('have.css', 'border', defaultStyle);

        cy.wait(1000);

        cy.get('@first').should('have.text', 'e').and('have.css', 'border', modifiedStyle);
        cy.get('@second').should('have.text', 'o').and('have.css', 'border', changingStyle);
        cy.get('@third').should('have.text', 'm').and('have.css', 'border', changingStyle);
        cy.get('@fourth').should('have.text', 's').and('have.css', 'border', modifiedStyle);

        cy.wait(1000);

        cy.get('@first').should('have.text', 'e').and('have.css', 'border', modifiedStyle);
        cy.get('@second').should('have.text', 'm').and('have.css', 'border', modifiedStyle);
        cy.get('@third').should('have.text', 'o').and('have.css', 'border', modifiedStyle);
        cy.get('@fourth').should('have.text', 's').and('have.css', 'border', modifiedStyle);
    })
})