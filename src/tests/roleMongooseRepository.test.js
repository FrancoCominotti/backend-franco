import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import RoleMongooseRepository from "../data/repositories/mongoose/roleMongooseRepository.js";


describe("Testing Role Mongoose Repository", () => {
    before(function () {
        db.init("mongodb+srv://francopisapia405:uPTbiSDQYTlKc3wm@codercluster.xlmgp1b.mongodb.net/?retryWrites=true&w=majority");
        this.roleRepository = new RoleMongooseRepository();
    });
    after(function () {
        db.drop();
        //db.close();
    });
    beforeEach(function () {
        this.timeout(5000);
    });
    it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });

    // it('El repositorio debe devolver un arreglo', function () {

    //     return this.roleRepository
    //         .paginate({ limit: 5, page: 1 })
    //         .then(result =>
    //         {

    //             expect(Array.isArray(result.role)).to.be.equals(true);
    //             expect(result.pagination.limit).to.be.equals(5);
    //         }
    //     );
    // });


    //*****ESTE ANDA ******/

    // it('The repository should be able to create a role', function (done) {
    
    //     const role = {
    //         name: 'algo',
    //         permissions: ['a','b'],
    //     };
    
    //     this.roleRepository.create(role)
    //         .then(result => {
    //             expect(result.name).to.be.equals(role.name);
    //             done(); 
    //         })
    //         .catch(error => done(error)); // Pass any errors to done()
    // });






    it('The repository should be able to update a role', function () {
        const updatedData = {
            name: 'Role actualizado',
            permissions: ['c','d'],
        };

        return this.roleRepository
            .updateOne('649f51c53ba582dabb591ed2', updatedData)
            .then(result => {
                expect(result.name).to.be.equals(updatedData.name);
                expect(JSON.stringify(result.permissions)).to.be.equals(JSON.stringify(updatedData.permissions));
            });
    });

    // it('The repository should be able to delete a role', function () {
    //     const userId = '64a0604abebb7f7582591620';

    //     return this.roleRepository
    //         .deleteOne(userId)
    //         .then(result => {
    //             expect(result.acknowledged).to.be.equals(true);
    //         });
    // });

    it('The repository should be able to get a role by ID', function () {
        const roleId = '649f51c53ba582dabb591ed2'

        return this.roleRepository
            .getOne(roleId)
            .then(result => {
                expect(result).to.be.an('object');
                //expect(result.id).to.be.equals(roleId);
            });
    });

})