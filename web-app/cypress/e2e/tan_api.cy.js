/**
 * This test checks if the website can be accessed
 */
describe('Connexion to website', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

/**
 * This test checks if the search bar can be used
 */
describe('search an existing stop', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#search-btn').click()
    cy.get('input').type('Commerce')
    cy.get('div').contains('Commerce').click()
    cy.get('#favorites').children().first().click()

    // Check if page contains "minute left"
    cy.contains('Minutes left')
  })
})