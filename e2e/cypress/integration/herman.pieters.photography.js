import fixtures from '../fixtures/herman.pieters.photography.json';

describe('user goes to google', () => {  
  const searchIndex = fixtures.q ? Math.floor(Math.random() * fixtures.q.length) : null;
  const searchQuery =  fixtures.q ? fixtures.q[searchIndex] : null;
  const searchPortal = 'https://www.google.com';
  const leftNavLinks = fixtures.leftNav.filter(() => Math.random() > 0.4);

  it('searches for web page', () => {
    // Open google search, enter a key phrase and hit search
    cy.visit(searchPortal)    
    cy.get('input[name="q"]').type(searchQuery);
    cy.get('input[name="btnK"]').click({ multiple: true, force: true}).as('googleSearch');

    // Click on the first link and navigate to the website
    cy.get('a[href="https://hermanpietersphotography.com/"]').click({ multiple: true, force: true });
    
    // On the website, click on the images to view them (and then close)
    cy.get('a.mfp-image').click({ multiple: true, force: true });
    cy.wait(1000);
    cy.get('button.mfp-close').click({ multiple: true, force: true });
    
    // Open some more links from the left nav
    leftNavLinks.forEach(linkText => {
      
      it('Should load the side nav link for: ' + linkText, () => {
        cy.get('a.menu-link').contains(linkText).click({ multiple: true, force: true });
        cy.wait(500);
      });

    });    
  })
  
});