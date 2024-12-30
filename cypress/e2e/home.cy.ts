/// <reference types="cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the homepage', () => {
    cy.url().should('include', 'localhost:3001')
  })

  it('should have proper meta tags', () => {
    cy.get('head title').should('exist')
    cy.get('head meta[name="description"]').should('exist')
  })
})
