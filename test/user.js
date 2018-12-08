const appRoot = require('app-root-path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(`${appRoot}/server`);
const should = chai.should();

const User = require(`${appRoot}/api/user/model`);
const utils = require(`${appRoot}/lib/utils`);

const urlBasePath = server.get('config').urlBasePath;

chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
    const payload = {
        fullName: 'Fake User',
        username: 'testusername',
        email: 'test@test.com',
        role: 'authenticated'
    };

    const newUser = {
        fullName: 'Joe Blow',
        username: 'jblow',
        email: 'joe.blow@testing.com',
        password: '123@123'
    };

    var token = '';
    var existingUserId = null;

    before(done => {
        utils.createToken(server.get('config').secret, payload)
                .then(resp => {
                    token = resp;
                });

        User.remove({}, err => {
            done();
        });
    });

    describe('POST', () => {
        it('Fails when missing required properties.', done => {
            chai.request(server)
                .post(`${urlBasePath}/users`)
                .set('Authorization', token)
                .send({
                    fullName: 'Joe Blow',
                    username: 'jblow',
                    email: 'joe.blow@testing.com'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('Creates a new user.', done => {
            chai.request(server)
                .post(`${urlBasePath}/users`)
                .set('Authorization', token)
                .send({
                    fullName: 'Joe Blow',
                    username: 'jblow',
                    email: 'joe.blow@testing.com',
                    password: '123@123'
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('fullName');
                    res.body.should.have.property('username');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('role');

                    existingUserId = res.body._id;

                    done();
                });
        });
    });

    describe('GET all users', () => {
        it('Returns a list of all the users.', done => {
            chai.request(server)
                .get(`${urlBasePath}/users`)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('GET specific user', () => {
        it('Returns correct user information.', done => {
            chai.request(server)
                .get(`${urlBasePath}/users/${existingUserId}`)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('_id');
                    res.body.should.have.property('fullName');
                    res.body.should.have.property('username');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('role');
                    res.body._id.should.eql(existingUserId);
                    res.body.fullName.should.eql(newUser.fullName);
                    res.body.username.should.eql(newUser.username);
                    res.body.email.should.eql(newUser.email);
                    done();
                });
        });
    });     

    describe('PUT', () => {
        it('Changes the information.', done => {
            chai.request(server)
                .put(`${urlBasePath}/users/${existingUserId}`)
                .set('Authorization', token)
                .send({fullName: 'New Name'})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('fullName');
                    res.body.fullName.should.eql('New Name');
                    done();
                });
        });
    });

    describe('DELETE', () => {
        it('Removes the record.', done => {
            chai.request(server)
                .delete(`${urlBasePath}/users/${existingUserId}`)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.eql({});
                    done();
                });
        });
        
        it('Fails when the ID doesnt exist.', done => {
            chai.request(server)
                .delete(`${urlBasePath}/users/${existingUserId}`)
                .set('Authorization', token)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });
});