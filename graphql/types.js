const { GraphQLObjectType,GraphQLString,GraphQLFloat,GraphQLID } = require("graphql");

const DenunciaType = new GraphQLObjectType({
    name:"DenunciaType",
    description:"Type denuncia",
    fields:{
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        images:{type:GraphQLString},
        altitude:{type:GraphQLFloat},
        latitude:{type:GraphQLFloat},
        longitude:{type:GraphQLFloat},
        speed:{type:GraphQLFloat}
    }
});

module.exports = {
    DenunciaType
}
