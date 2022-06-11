const { GraphQLString, GraphQLInt, GraphQLFloat, GraphQLObjectType, GraphQLList, GraphQLSchema } = require("graphql");
const { Denuncia } = require("../models");
const { DenunciaType } = require("./types");

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

const list = {
    type: new GraphQLList(DenunciaType),
    description:"Listar denuncia",
    args:{
        sort:{type:GraphQLString},
        order:{type:GraphQLString},
        page:{type:GraphQLInt}
    },
    async resolve(parent, args){
        console.log(args);

        const { sort, order, page } = args;
        const perPage = 2;
        let currentPage = page >= 1 ? page : 1;

        const Denuncias = await Denuncia.find({ status: "Active" })
        .skip((currentPage - 1) * perPage)
        .sort([[sort, order]])
        .limit(perPage)
        .exec();
        return  Denuncias;
    },
};

module.exports={
    create,list
}