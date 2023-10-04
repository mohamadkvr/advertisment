import  request from 'supertest';
import {expect, util} from'chai'
import dotEnv from "dotenv";
dotEnv.config()
import { App } from "../../src/app";
import { Utils } from '../../src/services/v1/helper/utils';
let Util = Utils.getInstance()
 
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

describe('admin api test for authentication', async() => {
  const appInstance = App.getInstance(3000,process.env.TEST_DATABASE_URL || "")
  const authenticationCategoryApis = [
    {
      api:"/api/v1/admin/category/create",
      method:"post"
    },
    {
      api:"/api/v1/admin/category/update/:id",
      method:"patch"
    },
    {
      api:"/api/v1/admin/category/getOne/:id",
      method:"get"
    },
    {
      api:"/api/v1/admin/category/getSome",
      method:"get"
    },
    {
      api:"/api/v1/admin/category/delete",
      method:"delete"
    },
  ]
  authenticationCategoryApis.forEach((info:{api:string,method:string}) => {
    it('send empty token', (done) => {
      const supertestRequest = info.method === "post"? request(appInstance.app).post(info.api)
      : info.method === "post" ? request(appInstance.app).put(info.api): info.method === "delete" ?
      request(appInstance.app).delete(info.api) : info.method === 'patch' ?  request(appInstance.app).patch(info.api) : request(appInstance.app).get(info.api)
      supertestRequest
        .send({}) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', '')
        .set('Cookie', 'x_api_key=')
        .expect(401) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('msg', "Unauthorized");
          done();
        });
    });
    it('Token has not been sent', (done) => {
      const supertestRequest = info.method === "post"? request(appInstance.app).post(info.api)
      : info.method === "post" ? request(appInstance.app).put(info.api): info.method === "delete" ?
      request(appInstance.app).delete(info.api) : info.method === 'patch' ?  request(appInstance.app).patch(info.api) : request(appInstance.app).get(info.api)
      supertestRequest
        .send({}) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .expect(401) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('msg', "Unauthorized");
          done();
        });
    });
    it('invalid token in header', (done) => {
      const supertestRequest = info.method === "post"? request(appInstance.app).post(info.api)
      : info.method === "post" ? request(appInstance.app).put(info.api): info.method === "delete" ?
      request(appInstance.app).delete(info.api) : info.method === 'patch' ?  request(appInstance.app).patch(info.api) : request(appInstance.app).get(info.api)
      supertestRequest
        .send({}) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', 'invalidtoken')
        .expect(401) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('msg', "Unauthorized");
          done();
        });
    });
    it('invalid token in cookie', (done) => {
      const supertestRequest = info.method === "post"? request(appInstance.app).post(info.api)
      : info.method === "post" ? request(appInstance.app).put(info.api): info.method === "delete" ?
      request(appInstance.app).delete(info.api) : info.method === 'patch' ?  request(appInstance.app).patch(info.api) : request(appInstance.app).get(info.api)
      supertestRequest
        .send({}) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('Cookie', 'x_api_key=invalidtoken')
        .expect(401) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('msg', "Unauthorized");
          done();
        });
    });
    it('invalid data in token',  (done) => {
      // Mock an expired JWT token
      const Util = Utils.getInstance()
      const expirationTimeInSeconds = 1200; // Set a short expiration time (1 second)
      const InvalidToken = Util.generateToken({_id:"651d510628d3a2e9002a9952"},process.env.SECRET_KEY || "", {
        expiresIn: expirationTimeInSeconds,
      })
      const supertestRequest = info.method === "post"? request(appInstance.app).post(info.api)
    : info.method === "post" ? request(appInstance.app).put(info.api): info.method === "delete" ?
    request(appInstance.app).delete(info.api) : info.method === 'patch' ?  request(appInstance.app).patch(info.api) : request(appInstance.app).get(info.api)
      // Wait for the token to expire
      supertestRequest
        .send({}) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', InvalidToken)
        .expect(401) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('msg', "Unauthorized");
          done();
        });
    })
  });
});


describe('category api test', async() => {
       let token = ''
       const appInstance = App.getInstance(3000,process.env.TEST_DATABASE_URL || "")
       before((done) => {
        request(appInstance.app)
        .post('/api/v1/admin/login')
        .send({ email:"admin@gmail.com",password:"admin"}) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .expect(200) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.data.token
          done();
        });
       })
      it('create category title test', (done) => {
        request(appInstance.app)
          .post('/api/v1/admin/category/create')
          .send({title:"this test for title",description:"this a test for description"}) // Set the request payload (body)
          .set('Content-Type', 'application/json') // Set the Content-Type header if needed
          .set('x-api-key', token)
          .expect(400) // Set the expected HTTP response status code
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('create category slug test', (done) => {
        request(appInstance.app)
          .post('/api/v1/admin/category/create')
          .send({slug:"thisisslug",description:"this a test for description"}) // Set the request payload (body)
          .set('Content-Type', 'application/json') // Set the Content-Type header if needed
          .set('x-api-key', token)
          .expect(400) // Set the expected HTTP response status code
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('unique test for title and slug', (done) => {
        request(appInstance.app)
          .post('/api/v1/admin/category/create')
          .send({slug:"l8mlnsrepy",description:"this a test for description",title:"EJvRAA2nGo"}) // Set the request payload (body)
          .set('Content-Type', 'application/json') // Set the Content-Type header if needed
          .set('x-api-key', token)
          .expect(400) // Set the expected HTTP response status code
          .end((err, res) => {
            if (err) return done(err);
                expect(res.body).to.have.property('msg', "از قبل کتگوری با این تایتل  یا اسلاگ موجود است.");
                done();
          });
      });
      it('test for parentid is an  id exist in db', (done) => {
        request(appInstance.app)
          .post('/api/v1/admin/category/create')
          .send({slug: Util.generateRandomString(10),description:"this a test for description",title:Util.generateRandomString(10), parentId:"65186be31f46f9bec5eea4fd"}) // Set the request payload (body)
          .set('Content-Type', 'application/json') // Set the Content-Type header if needed
          .set('x-api-key', token)
          .expect(404) // Set the expected HTTP response status code
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
      it('test for parentid is a valid id for category', (done) => {
        request(appInstance.app)
          .post('/api/v1/admin/category/create')
          .send({slug: Util.generateRandomString(10),description:"this a test for description",title:Util.generateRandomString(10), parentId:"651d51164a67e231"}) // Set the request payload (body)
          .set('Content-Type', 'application/json') // Set the Content-Type header if needed
          .set('x-api-key', token)
          .expect(400) // Set the expected HTTP response status code
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });

      let category:any = {}
      let categoies:any = []
      before((done) => {
        // for (let i = 1 ;i < 3; i++){
        //   request(appInstance.app)
        //   .post('/api/v1/admin/category/create')
        //   .send({slug: Util.generateRandomString(10),description:"this a test for description",title:Util.generateRandomString(10)}) // Set the request payload (body)
        //   .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        //   .set('x-api-key', token)
        //   .expect(201) // Set the expected HTTP response status code
        //   .end((err, res) => {
        //     if (err) return done(err);
        //     done();
        //   });
        // } 

        request(appInstance.app)
        .get('/api/v1/admin/category/getSome')
        .set('x-api-key', token)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .expect(200) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          categoies = res.body.data.docs
          category = res.body.data.docs[0]
          done();
        });
       })
       it('valid id check', (done) => {
        request(appInstance.app)
        .patch('/api/v1/admin/category/update/65186be31f46f9bec5eea4fd')
        .send(categoies[1]) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', token)
        .expect(404) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
      })
      it('check parentId exist', (done) => {
        console.log(category)
        request(appInstance.app)
        .patch('/api/v1/admin/category/update/' + category.id)
        .send({title:category.data.title,slug:category.data.slug,parentId:'65186be31f46f9bec5eea4fd'}) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', token)
        .expect(404) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          done();
       });
      })  
      it('update category check title and slug exist', (done) => {
        request(appInstance.app)
        .patch('/api/v1/admin/category/update/' + category.id)
        .send(categoies[1].data) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', token)
        .expect(400) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          done();
       });
      })
      it('check id params exist in getone', (done) => {
        request(appInstance.app)
        .get('/api/v1/admin/category/getOne/65186be31f46f9bec5eea4fd')
        .send() // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', token)
        .expect(404) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          done();
       });
      })
      it('check ids in delete', (done) => {
        request(appInstance.app)
        .delete('/api/v1/admin/category/delete')
        .send() // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', token)
        .expect(400) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          done();
       });
      })
      it('check each id in ids', (done) => {
        request(appInstance.app)
        .delete('/api/v1/admin/category/delete')
        .send(["65186be31f46f9bec5eea4fd"]) // Set the request payload (body)
        .set('Content-Type', 'application/json') // Set the Content-Type header if needed
        .set('x-api-key', token)
        .expect(400) // Set the expected HTTP response status code
        .end((err, res) => {
          if (err) return done(err);
          done();
       });
      })
});

