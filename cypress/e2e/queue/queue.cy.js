import {
    button,
    circle,
    circleContent,
    circleIndex,
    clearButton,
    deleteButton,
    input
} from "../constants/elements";
import {changingStyle, defaultStyle} from "../constants/styles";


describe('Queue test', () => {
    beforeEach(() => {
        cy.visit('queue');
    });

    it('button test', () => {
        cy.get(input).as('input');
        cy.get('@input').should('have.value', '');

        cy.get(button).as('addButton');
        cy.get('@addButton').should('be.disabled');

        cy.get('@input').type('2');
        cy.get('@addButton').should('not.be.disabled');

        cy.get('@input').type('{backspace}');
        cy.get('@addButton').should('be.disabled');
    })

    it('add and delete test', () => {
        cy.get(input).as('input');
        cy.get(button).as('addButton');
        cy.get(deleteButton).as('deleteButton');
        cy.get(clearButton).as('clearButton');


        cy.get('@input').type('1');
        cy.wait(600);
        cy.get('@addButton').click();


        cy.get(circle).eq(0).as('firstCircle');
        cy.get(circleContent).eq(0).as('firstContent');
        cy.get(circleIndex).eq(0).as('firstIndex');

        cy.get('@firstCircle').should('have.text', '1').and('have.css', 'border', changingStyle);
        cy.get('@firstCircle').should('have.text', '1').and('have.css', 'border', defaultStyle);

        cy.get('@firstContent').children().contains('head');
        cy.get('@firstContent').children().contains('tail');
        cy.get('@firstIndex').should('have.text', '0');

        cy.get('@input').type('2');
        cy.wait(600);
        cy.get('@addButton').click();


        cy.get(circle).eq(1).as('secondCircle');
        cy.get(circleContent).eq(1).as('secondContent');
        cy.get(circleIndex).eq(1).as('secondIndex');

        cy.get('@secondCircle').should('have.text', '2').and('have.css', 'border', changingStyle);
        cy.get('@secondCircle').should('have.text', '2').and('have.css', 'border', defaultStyle);

        cy.get('@firstContent').children().contains('head');
        cy.get('@secondContent').children().contains('tail');
        cy.get('@secondIndex').should('have.text', '1');

        cy.get('@input').type('3');
        cy.wait(600);
        cy.get('@addButton').click();


        cy.get(circle).eq(2).as('thirdCircle');
        cy.get(circleContent).eq(2).as('thirdContent');
        cy.get(circleIndex).eq(2).as('thirdIndex');

        cy.get('@thirdCircle').should('have.text', '3').and('have.css', 'border', changingStyle);
        cy.get('@thirdCircle').should('have.text', '3').and('have.css', 'border', defaultStyle);

        cy.get('@firstContent').children().contains('head');
        cy.get('@thirdContent').children().contains('tail');
        cy.get('@thirdIndex').should('have.text', '2');

        cy.get('@deleteButton').click();
        cy.wait(600);

        cy.get('@firstCircle').should('have.text', '1').and('have.css', 'border', changingStyle);
        cy.get('@firstContent').children().contains('head');
        cy.get('@firstCircle').should('have.text', '').and('have.css', 'border', defaultStyle);
        cy.get('@secondContent').children().contains('head');

        cy.get('@deleteButton').click();
        cy.wait(600);

        cy.get('@secondCircle').should('have.text', '2').and('have.css', 'border', changingStyle);
        cy.get('@secondContent').children().contains('head');
        cy.get('@secondCircle').should('have.text', '').and('have.css', 'border', defaultStyle);
        cy.get('@thirdContent').children().contains('head');
        cy.get('@thirdContent').children().contains('tail');
    })

    it('clear test', () => {
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

        cy.get('@input').type('5');
        cy.get('@addButton').click();
        cy.wait(100);

        cy.get('@input').type('6');
        cy.get('@addButton').click();
        cy.wait(100);

        cy.get('@input').type('7');
        cy.get('@addButton').click();
        cy.wait(500);

        cy.get('@clearButton').click();
        cy.wait(500);

        cy.get(circle).should('have.text', '');
    })
})