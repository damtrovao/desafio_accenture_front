Cypress.Commands.add('generateFixture', () => {
    const faker = require('../faker');

    cy.writeFile('cypress/fixtures/form.data.json', {
        'form':Cypress._.times(2, () => {
            return {
                'firstName':`${faker.person.firstName()}`,
                'lastName':`${faker.person.lastName()}`,
                'email':`${faker.internet.email()}`,
                'gender':`${faker.helpers.arrayElement(['Male', 'Female', 'Other'])}`,
                'mobile':`${faker.phone.number()}`,
                'dateOfBirth':`${faker.date.birthdate()}`,
                'subjects':`${faker.person.lastName()}`,
                'hobbies':`${faker.person.lastName()}`,
                'picture':`${faker.person.lastName()}`,
                'address':`${faker.person.lastName()}`,
                'state':`${faker.person.lastName()}`,
                'city':`${faker.person.lastName()}`,
            }
        })
    })
})