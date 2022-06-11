const { GraphQLList } = require("graphql");
const { Denuncia } = require("../models");
const { DenunciaType } = require("./types");

const denuncias = {
    type: new GraphQLList(DenunciaType),
    async resolve(){
        const denuncias = await Denuncia.find();

        var result = {  
            info: {count:denuncias.count()},  
            results : denuncias
        };

        return result;
    }
}

module.exports = { denuncias }