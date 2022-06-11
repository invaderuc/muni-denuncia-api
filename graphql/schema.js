const { GraphQLSchema, GraphQLObjectType,GraphQLString } = require('graphql');
const { denuncias } = require("./queries");
const { create,list } = require("./mutations");


const RootType = new GraphQLObjectType({
    name:"denuncias",
    descripcion:"listado de denuncias",
    fields:{
        denuncias
    }
});

const MutationType = new GraphQLObjectType({
    name:"MutationType",
    descripction:"Mutación denuncia",
    fields:{
        create,list
    }
});

const schema = new GraphQLSchema({
    query:RootType,
    mutation: MutationType
}); 

module.exports = schema;
