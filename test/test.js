const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('=== Test POST and GET client==', () => {

  // Test POST Client
   describe('HTTP POST /personne', () => {
      it('create client should return the result of data', (done) => {
         chai.request('http://localhost:8080')
            .post('/personne')
            // changer les données entrants à chaque test pour eviter les doublants
            .send({
               nom: 'brunoeee',
               prenom: 'marcelinozzzz'
            })
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(200);
               done();
             });
      });
   });

    // Test GET Client
    describe.only('HTTTP GET /personne', () => {
      it('get client should return the result', (done) => {
        chai.request('http://localhost:8080')
          .get('/personne')
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.eql(200);
            res.type.should.eql('application/json');
            console.log(res);
            
            //res.body.should.be.a('object');
            done();
          });
      });
     });

     // Test UPDATE personne
     describe('HTTP UPDATE /personne', () => {
      it('create client should return the result of data', (done) => {
         chai.request('http://localhost:8080')
            .put('/personne/1')
            // changer les données entrants à chaque test pour eviter les doublants
            .send({
               nom: 'laza',
               prenom: 'rousse'
            })
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(200);
               done();
             });
      });
   });

    // Test DELETE personne
    describe('HTTP DELETE /personne', () => {
      it('create client should return the result of data', (done) => {
         chai.request('http://localhost:8080')
            .delete('/personne/1')
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(200);
               done();
             });
      });
   });


   
});
