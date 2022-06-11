const { GraphQLSchema, GraphQLObjectType,GraphQLString } = require('graphql');
const { denuncias,listPaginator } = require("./queries");
const { create,list } = require("./mutations");


const RootType = new GraphQLObjectType({
    name:"denuncias",
    descripcion:"listado de denuncias",
    fields:{
        denuncias,listPaginator
    }
});

const MutationType = new GraphQLObjectType({
    name:"MutationType",
    descripction:"Mutación denuncia",
    fields:{
        create
    }
});

const schema = new GraphQLSchema({
    query:RootType,
    mutation: MutationType
}); 

module.exports = schema;
