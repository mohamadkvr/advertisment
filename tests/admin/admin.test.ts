import  request from 'supertest';
import {expect} from'chai'
import dotEnv from "dotenv";
dotEnv.config()
import { App } from "../../src/app";

 
describe('login api test', () => {
  const appInstance = App.getInstance(3000,process.env.TEST_DATABASE_URL || "")
  it('empty admin', (done) => {
    request(appInstance.app)
      .post('/api/v1/admin/login')
      .send({ email:"",password:"admin"}) // Set the request payload (body)
      .set('Content-Type', 'application/json') // Set the Content-Type header if needed
      .expect(400) // Set the expected HTTP response status code
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', '"email" is not allowed to be empty');
        done();
      });
  });
  it('empty password', (done) => {
    request(appInstance.app)
      .post('/api/v1/admin/login')
      .send({ email:"admin@gmail.com",password:""}) // Set the request payload (body)
      .set('Content-Type', 'application/json') // Set the Content-Type header if needed
      .expect(400) // Set the expected HTTP response status code
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', '"password" is not allowed to be empty');
        done();
      });
  });  
  it('check email validation', (done) => {
    request(appInstance.app)
      .post('/api/v1/admin/login')
      .send({ email:"admin",password:"admin"}) // Set the request payload (body)
      .set('Content-Type', 'application/json') // Set the Content-Type header if needed
      .expect(400) // Set the expected HTTP response status code
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', '"email" must be a valid email');
        done();
      });
  });
  it('check user exist', (done) => {
    request(appInstance.app)
      .post('/api/v1/admin/login')
      .send({ email:"adminemailnotfound@gmail.com",password:"admin"}) // Set the request payload (body)
      .set('Content-Type', 'application/json') // Set the Content-Type header if needed
      .expect(400) // Set the expected HTTP response status code
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'User not found with the entered email');
        done();
      });
  });
  it('password compare', (done) => {
    request(appInstance.app)
      .post('/api/v1/admin/login')
      .send({ email:"admin@gmail.com",password:"1234"}) // Set the request payload (body)
      .set('Content-Type', 'application/json') // Set the Content-Type header if needed
      .expect(400) // Set the expected HTTP response status code
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'email or password incorrect');
        done();
      });
  });
  it('test for 200 ', (done) => {
    request(appInstance.app)
      .post('/api/v1/admin/login')
      .send({ email:"admin@gmail.com",password:"admin"}) // Set the request payload (body)
      .set('Content-Type', 'application/json') // Set the Content-Type header if needed
      .expect(200) // Set the expected HTTP response status code
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});