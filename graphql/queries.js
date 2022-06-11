const { Denuncia } = require("../models");
const { DenunciaType } = require("./types");
const { GraphQLString, GraphQLInt,GraphQLList} = require("graphql");


const denuncias = {
    type: new GraphQLList(DenunciaType),
    async resolve(){
        const denuncias = await Denuncia.find();
        return denuncias;
    }
}

const listPaginator = {
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
module.exports = { denuncias,listPaginator }