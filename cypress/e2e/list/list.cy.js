import {
    addByIndexButton,
    addHeadButton,
    addTailButton, changingCircle,
    circle, circleColoured,
    circleContent,
    circleIndex, circleSmall, deleteByIndexButton, deleteHeadButton, deleteTailButton,
    input,
    inputIndex
} from "../constants/elements";
import {changingStyle, defaultStyle, modifiedStyle} from "../constants/styles";


describe('Linked list algorithm test', () => {
    beforeEach(() => {
        cy.visit('list');
    })

    it('buttons should be disabled if input is empty and active if it is not', () => {
        cy.get(input).as('inputValue');
        cy.get(inputIndex).as('inputIndex');
        cy.get(addHeadButton).as('addHeadButton');
        cy.get(addTailButton).as('addTailButton');
        cy.get(deleteHeadButton).as('deleteHeadButton');
        cy.get(deleteTailButton).as('deleteTailButton');
        cy.get(addByIndexButton).as('addByIndexButton');
        cy.get(deleteByIndexButton).as('deleteByIndexButton');

        cy.get('@inputValue').should('have.value', '');
        cy.get('@inputIndex').should('have.value', '');

        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@deleteHeadButton').should('not.be.disabled');
        cy.get('@deleteTailButton').should('not.be.disabled');
        cy.get('@addByIndexButton').should('be.disabled');
        cy.get('@deleteByIndexButton').should('be.disabled');

        cy.get('@inputValue').type('2');

        cy.get('@addHeadButton').should('not.be.disabled');
        cy.get('@addTailButton').should('not.be.disabled');
        cy.get('@deleteHeadButton').should('not.be.disabled');
        cy.get('@deleteTailButton').should('not.be.disabled');
        cy.get('@addByIndexButton').should('be.disabled');
        cy.get('@deleteByIndexButton').should('be.disabled');


        cy.get('@addHeadButton').click();
        cy.wait(200);
        cy.get('@inputValue').type('{backspace}');

        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@deleteHeadButton').should('not.be.disabled');
        cy.get('@deleteTailButton').should('not.be.disabled');
        cy.get('@addByIndexButton').should('be.disabled');
        cy.get('@deleteByIndexButton').should('be.disabled');

        cy.get('@inputIndex').type('2');

        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@deleteHeadButton').should('not.be.disabled');
        cy.get('@deleteTailButton').should('not.be.disabled');
        cy.get('@addByIndexButton').should('be.disabled');
        cy.get('@deleteByIndexButton').should('not.be.disabled');

        cy.get('@inputValue').type('2');

        cy.get('@addHeadButton').should('not.be.disabled');
        cy.get('@addTailButton').should('not.be.disabled');
        cy.get('@deleteHeadButton').should('not.be.disabled');
        cy.get('@deleteTailButton').should('not.be.disabled');
        cy.get('@addByIndexButton').should('not.be.disabled');
        cy.get('@deleteByIndexButton').should('not.be.disabled');
    })

    it('default list should rendered correctly', () => {
        cy.get(circle).its('length').should('be.greaterThan', 1).and('be.lessThan', 7);
        cy.get(circleContent).first().children().contains('head');
        cy.get(circleContent).last().children().contains('tail');
        cy.get(circle).each(($el, idx) => {
            cy.wrap($el).should("have.css", "border", defaultStyle).and("not.to.be.empty").siblings(circleIndex).should("have.text", idx);
        });
    })

    it('adding element to head should be correct', () => {
        cy.get(input).type('2');
        cy.get(addHeadButton).click();

        cy.get(changingCircle).should('have.text', '2').and('have.css', 'border', changingStyle);
        cy.wait(100);
        cy.get(circle).first().should('have.text', '2').and('have.css', 'border', modifiedStyle);
        cy.wait(100);
        cy.get(circle).first().should('have.text', '2').and('have.css', 'border', defaultStyle);
        cy.get(circleContent).first().children().contains('head');
    })

    it('adding element to tail should be correct', () => {
        cy.get(input).type('2');
        cy.get(addTailButton).click();

        cy.get(changingCircle).should('have.text', '2').and('have.css', 'border', changingStyle);
        cy.wait(100);
        cy.get(circle).last().should('have.text', '2').and('have.css', 'border', modifiedStyle);
        cy.wait(100);
        cy.get(circle).last().should('have.text', '2').and('have.css', 'border', defaultStyle);
        cy.get(circleContent).last().children().contains('tail');
    })

    it('deleting element from head should be correct', () => {
        cy.get(circle).each(($el, idx) => {
            if ([0].includes(idx)) {
                const circleValue = $el[0].textContent;
                cy.get(deleteHeadButton).click();
                cy.get(circle).first().should('have.text', '');
                cy.get(changingCircle).should('have.text', circleValue).and('have.css', 'border', changingStyle);
            }
        })
        cy.get(changingCircle).should('not.exist');
    })

    it('deleting element from tail should be correct', () => {
        cy.get(circle).each(($el, idx, $arr) => {
            if ([$arr.length - 1].includes(idx)) {
                const circleValue = $arr[$arr.length - 1].textContent;
                cy.get(deleteTailButton).click();
                cy.get(circle).last().prev().should('have.text', '');
                cy.get(changingCircle).should('have.text', circleValue).and('have.css', 'border', changingStyle);
            }
        })
        cy.get(changingCircle).should('not.exist');
    })

    it('adding element by index should be correct', () => {
        cy.get(input).type('2');
        cy.get(inputIndex).type('1');

        cy.get(addByIndexButton).click();
        cy.get(changingCircle).should('have.text', '2').and('have.css', 'border', changingStyle);
        cy.get(circleColoured).eq(0).should('have.css', 'border', changingStyle);
        cy.get(circleSmall).should('have.text', '2').and('have.css', 'border', changingStyle);
        cy.get(changingCircle).should('not.exist');
        cy.get(circle).eq(1).should('have.css', 'border', modifiedStyle).and('have.text', '2');
        cy.get(circle).eq(0).should('have.css', 'border', defaultStyle);
        cy.get(circleContent).eq(0).children().contains('head');
        cy.get(circle).eq(1).should('have.css', 'border', defaultStyle);
    })

    it('deleting element by index should be correct', () => {
        cy.get(inputIndex).type('1');

        cy.get(deleteByIndexButton).click();
        cy.get(circle).first().should('have.css', 'border', changingStyle);
        cy.get(circle).eq(1).should('have.css', 'border', changingStyle);
        cy.get(circle).each(($el, idx, $arr) => {
            if ([1].includes(idx)) {
                const circleValue = $arr[1].textContent;
                const circleValueNext = $arr[2].textContent;
                cy.get(circleSmall).should('have.text', circleValue).and('have.css', 'border', changingStyle);
                cy.get(circle).eq(1).should('have.text', '').and('have.css', 'border', defaultStyle);
                cy.get(circleSmall).should('not.exist');
                cy.get(circle).eq(0).should('have.css', 'border', defaultStyle);
                cy.get(circle).eq(1).should('have.text', circleValueNext).and('have.css', 'border', defaultStyle);
            }
        })
    })

})