import {
    button,
    circle,
    circleContent,
    circleIndex,
    clearButton,
    deleteButton,
    input,
    result
} from "../constants/elements";
import {changingStyle, defaultStyle} from "../constants/styles";


describe('Stack algorithm test', () => {
    beforeEach(() => {
        cy.visit('stack');
    })
    it('button should be disabled if input is empty and active if it is not', () => {
        cy.get(input).as('input');
        cy.get('@input').should('have.value', '');

        cy.get(button).as('addButton');
        cy.get('@addButton').should('be.disabled');

        cy.get('@input').type('2');
        cy.get('@addButton').should('not.be.disabled');

        cy.get('@input').type('{backspace}');
        cy.get('@addButton').should('be.disabled');
    })

    it('adding and deleting elements to stack should work correctly', () => {
        cy.get(input).as('input');
        cy.get('@input').type('1');

        cy.get(button).as('addButton');
        cy.get(deleteButton).as('deleteButton');
        cy.get(clearButton).as('clearButton');

        cy.get('@addButton').click();

        cy.get(circle).eq(0).as('firstCircle');
        cy.get(circleContent).eq(0).as('firstContent');
        cy.get(circleIndex).eq(0).as('firstIndex');

        cy.get('@firstCircle').should('have.text', '1').and('have.css', 'border', changingStyle);
        cy.get('@firstCircle').should('have.text', '1').and('have.css', 'border', defaultStyle);

        cy.get('@firstContent').children().contains('top');
        cy.get('@firstIndex').should('have.text', '0');


        cy.get('@input').type('2');
        cy.get('@addButton').click();

        cy.get(circle).eq(1).as('secondCircle');
        cy.get(circleContent).eq(1).as('secondContent');
        cy.get(circleIndex).eq(1).as('secondIndex');

        cy.get('@secondCircle').should('have.text', '2').and('have.css', 'border', changingStyle);
        cy.get('@secondCircle').should('have.text', '2').and('have.css', 'border', defaultStyle);

        cy.get('@secondContent').children().contains('top');
        cy.get('@secondIndex').should('have.text', '1');


        cy.get('@input').type('3');
        cy.get('@addButton').click();

        cy.get(circle).eq(2).as('thirdCircle');
        cy.get(circleContent).eq(2).as('thirdContent');
        cy.get(circleIndex).eq(2).as('thirdIndex');

        cy.get('@thirdCircle').should('have.text', '3').and('have.css', 'border', changingStyle);
        cy.get('@thirdCircle').should('have.text', '3').and('have.css', 'border', defaultStyle);

        cy.get('@thirdContent').children().contains('top');
        cy.get('@thirdIndex').should('have.text', '2');

        cy.get('@deleteButton').click();

        cy.get('@thirdCircle').should('have.text', '3').and('have.css', 'border', changingStyle);
        cy.get('@thirdCircle').should('not.exist');

        cy.get('@secondContent').children().contains('top');
        cy.get('@secondCircle').should('have.text', '2').and('have.css', 'border', defaultStyle);
        cy.get('@secondIndex').should('have.text', '1');
    })

    it('clearing stack should work correctly', () => {
        cy.get(input).as('input');
        cy.get(button).as('addButton');
        cy.get(clearButton).as('clearButton');

        cy.get('@input').type('1');
        cy.get('@addButton').click();
        cy.wait(100);

        cy.get('@input').type('2');
        cy.get('@addButton').click();
        cy.wait(100);

        cy.get('@input').type('3');
        cy.get('@addButton').click();
        cy.wait(100);

        cy.get('@input').type('4');
        cy.get('@addButton').click();
        cy.wait(100);

        cy.get('@clearButton').click();

        cy.get(result).should('be.empty');
    })

})