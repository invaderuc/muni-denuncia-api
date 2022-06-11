const { GraphQLList } = require("graphql");
const { Denuncia } = require("../models");
const { DenunciaType } = require("./types");

const denuncias = {
    type: new GraphQLList(DenunciaType),
    async resolve(){
        const denuncias = await Denuncia.find();
        console.log(denuncias);

        return denuncias;
    }
}

module.exports = { denuncias }