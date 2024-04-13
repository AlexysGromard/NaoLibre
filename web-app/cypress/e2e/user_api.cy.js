/**
 * This test checks if the website can be accessed
 */
describe('Connexion to website', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
}),

/**
 * register an account
 * This test checks if an account can be registered with the website
 */
describe('register an account', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#account-btn').click()
    cy.get('a').contains('Sign Up').click()
    cy.get('input[id="email"]').type("hello@cypress.io")
    cy.get('input[id="password"]').type('password123')
    cy.get('input[id="PasswordConfirmation"]').type('password123')
    cy.get('input[id="name"]').type('Cypress name')
    cy.get('input[type="submit"]').click()
  })
})

/**
 * Delete an account
 * This test checks if an account can be deleted with the website
 */
describe('Delete an account', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#account-btn').click()
    cy.get('input[id="email"]').type("hello@cypress.io")
    cy.get('input[id="password"]').type('password123')
    cy.get('input[type="submit"]').click()
    cy.get('#account-btn').click()
    cy.get('a').contains('Delete account').click()
    cy.get('#account-btn').click()
    cy.get('input[id="email"]').type("hello@cypress.io")
    cy.get('input[id="password"]').type('password123')
    cy.get('input[type="submit"]').click()
    cy.contains('User space').should('not.exist')
  })
})