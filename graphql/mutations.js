const { GraphQLString, GraphQLFloat } = require("graphql");
const { Denuncia } = require("../models");

const create = {
    type: GraphQLString,
    description:"registrar denuncia",
    args:{
        title:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        images:{type:GraphQLString},
        altitude:{type:GraphQLFloat},
        latitude:{type:GraphQLFloat},
        longitude:{type:GraphQLFloat},
        speed:{type:GraphQLFloat}

    },
    async resolve(parent, args){
        console.log(args);
        const newDenuncia = await Denuncia.create(args);
        return 'Nueva denuncia ingresada'
    },
};

module.exports={
    create
}