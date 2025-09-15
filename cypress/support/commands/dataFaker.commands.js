Cypress.Commands.add('generateFixture', () => {
    const faker = require('../faker');

    cy.writeFile('cypress/fixtures/form.data.json', {
        'form':Cypress._.times(2, () => {
            const date = faker.date.birthdate();

            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'long'});
            const year = date.getFullYear();

            const state = faker.helpers.arrayElement(['NCR', 'Uttar Pradesh', 'Haryana', 'Rajasthan']);
            
            let city;

            switch (state) {
                case "NCR":
                    city = faker.helpers.arrayElement(['Delhi', 'Gurgaon', 'Noida']);
                    break;
                case "Uttar Pradesh":
                    city = faker.helpers.arrayElement(['Agra', 'Lucknow', 'Merrut']);
                    break;
                case "Haryana":
                    city = faker.helpers.arrayElement(['Karnal', 'Panipat']);
                    break;
                case "Rajasthan":
                    city = faker.helpers.arrayElement(['Jaipur', 'Jaiselmer']);
                    break;
            }

            return {
                'firstName':`${faker.person.firstName()}`,
                'lastName':`${faker.person.lastName()}`,
                'email':`${faker.internet.email()}`,
                'gender':`${faker.helpers.arrayElement(['Male', 'Female', 'Other'])}`,
                'mobile':`${faker.string.numeric(10)}`,
                'dateOfBirth':day,
                'monthOfBirth':month,
                'yearOfBirth':year,
                'subjects':faker.helpers.arrayElements(['Maths', 'Accounting', 'Arts', 'Social Studies', 'Biology', 'Physics', 'Chemistry']),
                'hobbies':faker.helpers.arrayElements(['Sports', 'Reading', 'Music']),
                'address':`${faker.location.streetAddress(true)}` + ' ' + city + ' ' + state,
                'state':state,
                'city':city,
            }
        })
    })
})