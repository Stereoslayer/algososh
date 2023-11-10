describe('routes test', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('should open main menu page by default', () => {
        cy.contains('МБОУ АЛГОСОШ');
        cy.get('a[href="/recursion"]').should('be.visible');
        cy.get('a[href="/fibonacci"]').should('be.visible');
        cy.get('a[href="/sorting"]').should('be.visible');
        cy.get('a[href="/stack"]').should('be.visible');
        cy.get('a[href="/queue"]').should('be.visible');
        cy.get('a[href="/list"]').should('be.visible');
        cy.contains('Вдохновлено школами, в которых не учили алгоритмам');
    })
    it('should open string page', () => {
        cy.get('a[href="/recursion"]').click();
        cy.contains('Строка');
        cy.get('form').should('be.visible');
    })
    it('should open fibonacci page', () => {
        cy.get('a[href="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
        cy.get('form').should('be.visible');
    })
    it('should open sorting page', () => {
        cy.get('a[href="/sorting"]').click();
        cy.contains('Сортировка массива');
        cy.get('form').should('be.visible');
    })
    it('should open stack page', () => {
        cy.get('a[href="/stack"]').click();
        cy.contains('Стек');
        cy.get('form').should('be.visible');
    })
    it('should open queue page', () => {
        cy.get('a[href="/queue"]').click();
        cy.contains('Очередь');
        cy.get('form').should('be.visible');
    })
    it('should open list page', () => {
        cy.get('a[href="/list"]').click();
        cy.contains('Связный список');
        cy.get('form').should('be.visible');
    })
})