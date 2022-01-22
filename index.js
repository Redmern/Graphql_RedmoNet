const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

	type User {
		userId: ID
		userName: String
		userAmount: Float
		userShare: Float

	}
	type Query {
		users: [User]
	}

`;

const users = [
	{
		userId: 0,
		userName: "Admin",
		userAmount: 0,
		userShare: 100,
	},
	{
		userId: 1,
		userName: "Redmer",
		userAmount: 0,
		userShare: 100,
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

