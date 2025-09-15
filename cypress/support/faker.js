const { base, pt_BR, en, Faker } = require('@faker-js/faker');

const faker = new Faker({
    locale: [pt_BR, en, base],
});

module.exports = faker;