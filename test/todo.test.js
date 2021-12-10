
const chai = require('chai');
const chaiHttp = require('chai-http');
// import server from '../src/bin/index';
const server = require('../src/bin/index');

// style assertion
chai.should();
chai.use(chaiHttp);

describe('Todo Api', ()=>{
    // Test route GET
    describe('GET-ROUTE api/todo/view-all', ()=>{
        it(' Récupération de l\'enregistrement avec succès !', (done)=>{
            chai.request(server)
                .get('/api/todo/view-all')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.a('array');
                    // res.body.length.should.be.eq(3)
                    done();
                })
        })
    })
    // Test route GET by ID
    // Test route POST
    // Test route PUT
    // Test route DELETE 
});
