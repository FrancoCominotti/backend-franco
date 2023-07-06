import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import UserMongooseRepository from "../data/repositories/mongoose/userMongooseRepository.js";


describe("Testing User Mongoose Repository", () => {
    before(function () {
        db.init("mongodb+srv://francopisapia405:uPTbiSDQYTlKc3wm@codercluster.xlmgp1b.mongodb.net/?retryWrites=true&w=majority");
        this.userRepository = new UserMongooseRepository();
    });
    after(function () {
        db.drop();
        db.close();
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });

    it('El repositorio debe devolver un arreglo', function () {

        return this.userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
            {

                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });


    it('The repository should be able to create a user', function (done) {
    
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: 12345678
        };
    
        this.userRepository.create(user)
            .then(result => {
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
                done(); // Call done() to indicate the test has completed
            })
            .catch(error => done(error)); // Pass any errors to done()
    });

    it('The repository should be able to update a user', function () {
        const updatedData = {
            firstName: 'Updated First Name',
            lastName: 'Updated Last Name',
        };

        return this.userRepository
            .updateOne('6494b72470838cf325bed1d4', updatedData)
            .then(result => {
                expect(result.firstName).to.be.equals(updatedData.firstName);
                expect(result.lastName).to.be.equals(updatedData.lastName);
            });
    });

    it('The repository should be able to delete a user', function () {
        const userId = '649f4a5ce3523c8b9aa8770d';

        return this.userRepository
            .deleteOne(userId)
            .then(result => {
                expect(result.acknowledged).to.be.equals(true);
            });
    });

    it('The repository should be able to get a user by ID', function () {
        const userId = '649f47a8f2e8ce8149ab8e9e'

        return this.userRepository
            .getOne(userId)
            .then(result => {
                console.log(result.id); // Imprimir el objeto completo
                expect(result).to.be.an('object');
                expect(result.firstName).to.be.equals('Nolan');
                expect(result.id).to.be.equals(userId);
            });
    });

})