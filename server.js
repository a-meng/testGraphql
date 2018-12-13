var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fs=require('fs')

var mysql=require('mysql');
var pool   = mysql.createPool({
    host: '10.10.121.122',
    port: 3306,
    user: 'rt_basic',
    password: 'rt_basic',
    database: 'livod_rt',
    connectionLimit : 10,
  });
  
 

var root = { 
    user(){
        console.info(arguments)
        return {
            id:'1',
            name:'zm'
        }
    } 
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema:buildSchema(
    fs.readFileSync('./user.graphql',{encoding:'utf8'})
  ) ,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));