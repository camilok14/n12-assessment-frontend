// https://docs.cypress.io/api/introduction/api.html

describe('Next challenge assessment', () => {
  let createdRideId;
  let createdRideEndTime;
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('#create-ride-title').contains('Registrar nuevo viaje');
    cy.get('#rides-title').contains('Viajes registrados');
  });
  it('should create ride record', (done) => {
    cy.server();
    cy.route({ method: 'POST', url: '**/rides' }).as('createRide');
    cy.get('#duration-input').clear();
    cy.get('#duration-input').type('500');
    cy.get('#distance-input').clear();
    cy.get('#distance-input').type('4');
    cy.get('#create-ride-button').click();
    cy.wait('@createRide').then(({ response }) => {
      const { body } = response;
      createdRideId = body._id;
      createdRideEndTime = body.endTime;
      done();
    });
  });
  it('should display created ride', () => {
    cy.contains(createdRideId);
  });
  it('should diplay alert with endTime of created ride', () => {
    cy.contains(createdRideId).click();
    cy.contains(createdRideEndTime);
  });
  it('should display de word "Clicked" beside the id of the created ride', () => {
    cy.contains('OK').click();
    cy.contains(`${createdRideId} Clicked`);
  });
});
