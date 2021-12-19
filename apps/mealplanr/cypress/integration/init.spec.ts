describe('Cypress', () => {
	it('is working', () => {
		expect(true).to.equal(true);
	});

	it('opens the app', () => {
		cy.visit('http://localhost:3000');
	});
});

export {};
