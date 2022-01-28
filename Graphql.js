const { gql } = require('apollo-server');

const typeDefs = gql`

	interface account {
		id: ID!
		amount: Float
		share: Float
	}

	type user implements account {
		id: ID!
		name: String
		amount: Float
		share: Float
	}

	type Query {
		users: [user]
		getUserById(id: ID!) : user
	}

	input addUserToUsers{
		id: ID!
		name: String
		amount: Float
		share: Float
	}

	type Mutation {
		addUser(name: String!) : user 
	}
`;

const resolvers = {
	Query: {
		users: () => users,
		getUserById: (_, {id}) => {
			return users.find( user => user.id == id)
		}
	},
	Mutation: {
		addUser: (_, {name}) => {
			const storeUser = {
				name: input.name,
				amount: 0,
				share: 0
			}
			users.push(storeUser)
			return storeUser
		}
	},
};

module.exports = {typeDefs, resolvers}