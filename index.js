const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

	type User {
		Id: ID
		Name: String
		Amount: Float
		Share: Float

	}
	type Query {
		users: [User]
	}

`;

const users = [
	{
		Id: 0,
		Name: "Admin",
		Amount: 0,
		Share: 100,
	},
	{
		Id: 1,
		Name: "Redmer",
		Amount: 0,
		Share: 100,
	}
];

const resolvers = {
	Query: {
		users: () => users,
	},
};

const server = new ApolloServer({ typeDefs, resolvers});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`Server ready at ${url} Query at https://studio.apollographql.com/dev `);
});

