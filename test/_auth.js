const appRoot = require('app-root-path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(`${appRoot}/server`);
const should = chai.should();

const User = require(`${appRoot}/api/user/model`);

const urlBasePath = server.get('config').urlBasePath;

chai.use(chaiHttp);

//Our parent block
describe('Authentication', () => {
    const newUser = {
        fullName: 'Joe Blow',
        username: 'jblow',
        email: 'joe.blow@testing.com',
        password: '123@123'
    };

    before( done => {
        User.remove({}, err => {
            done();
        });        
    });

    describe('Register ', () => {
        it('Creates a new user.', done => {
            chai.request(server)
                .post(`${urlBasePath}/auth/local/register`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');res.body.should.have.property('token');
                    done();
                });
        });

        it('Fails if duplate user exists.', done => {
            chai.request(server)
                .post(`${urlBasePath}/auth/local/register`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

        it('Fails when required information is missing.', done => {
            delete newUser.password;
            delete newUser.username;

            chai.request(server)
                .post(`${urlBasePath}/auth/local/register`)
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });

    describe('Login ', () => {
        it('Authenticates a user.', done => {
            chai.request(server)
                .post(`${urlBasePath}/auth/local`)
                .send({
                    identity: 'jblow',
                    password: '123@123'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');res.body.should.have.property('token');
                    done();
                });
        });

        it('Denies access when credentials are incorrect.', done => {
            chai.request(server)
                .post(`${urlBasePath}/auth/local`)
                .send({
                    identity: 'jblow',
                    password: 'wrong!'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });    
});