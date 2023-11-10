import {button, circle, circleIndex, input} from "../constants/elements";
import {defaultStyle} from "../constants/styles";

describe('Fibonacci test', () => {
    beforeEach(() => {
        cy.visit('fibonacci');
    })

    it('button test', () => {
        cy.get(input).as('input');
        cy.get('@input').should('have.value', '');

        cy.get(button).as('button');
        cy.get('@button').should('be.disabled');

        cy.get('@input').type('2');
        cy.get('@button').should('not.be.disabled');

        cy.get('@input').type('{backspace}');
        cy.get('@button').should('be.disabled');
    })

    it('sequence test', () => {
        cy.get(input).as('input');
        cy.get(button).as('button');

        cy.get('@input').type('6');
        cy.get('@button').click();

        cy.get(circle).eq(0).as('first');
        cy.get(circleIndex).eq(0).as('firstIndex');
        cy.get('@first', {timeout: 100}).should('have.text', '1').and('have.css', 'border', defaultStyle);
        cy.get('@firstIndex', {timeout: 100}).should('have.text', '0');

        cy.get(circle).eq(1).as('second');
        cy.get(circleIndex).eq(1).as('secondIndex');
        cy.get('@second', {timeout: 100}).should('have.text', '1').and('have.css', 'border', defaultStyle);
        cy.get('@secondIndex', {timeout: 100}).should('have.text', '1');

        cy.get(circle).eq(2).as('third');
        cy.get(circleIndex).eq(2).as('thirdIndex');
        cy.get('@third', {timeout: 100}).should('have.text', '2').and('have.css', 'border', defaultStyle);
        cy.get('@thirdIndex', {timeout: 100}).should('have.text', '2');

        cy.get(circle).eq(3).as('fourth');
        cy.get(circleIndex).eq(3).as('fourthIndex');
        cy.get('@fourth', {timeout: 100}).should('have.text', '3').and('have.css', 'border', defaultStyle);
        cy.get('@fourthIndex', {timeout: 100}).should('have.text', '3');

        cy.get(circle).eq(4).as('fifth');
        cy.get(circleIndex).eq(4).as('fifthIndex');
        cy.get('@fifth', {timeout: 100}).should('have.text', '5').and('have.css', 'border', defaultStyle);
        cy.get('@fifthIndex', {timeout: 100}).should('have.text', '4');

        cy.get(circle).eq(5).as('sixth');
        cy.get(circleIndex).eq(5).as('sixthIndex');
        cy.get('@sixth', {timeout: 100}).should('have.text', '8').and('have.css', 'border', defaultStyle);
        cy.get('@sixthIndex', {timeout: 100}).should('have.text', '5');

        cy.get(circle).eq(6).as('seventh');
        cy.get(circleIndex).eq(6).as('seventhIndex');
        cy.get('@seventh', {timeout: 100}).should('have.text', '13').and('have.css', 'border', defaultStyle);
        cy.get('@seventhIndex', {timeout: 100}).should('have.text', '6');
    })
})