const { ApolloServer, gql } = require('apollo-server');

const userAccounts = require('./userAccounts');

let userIDCount = 1

const typeDefs = gql`

	interface Node{
		id: ID!
	}

	interface Account {
		amount: Float
		share: Float
	}

	type UserAccount implements Account & Node{
		id: ID!
		name: String
		amount: Float
		share: Float
	}

	type Query {
		userAccounts: [UserAccount]
		userAccountById(id: ID!): UserAccount
		adminAccount: UserAccount
	}

	type Mutation {
		addUserAccount( name: String!): UserAccount 
	}

	type Mutation {
		addFundsToUserAccount(id: ID!, amount: Float!): UserAccount
	}

`
;

const resolvers = {

	Query: {

		userAccounts: async () => {
			return await userAccounts.filter( UserAccount => UserAccount.id != "0")
		},

		userAccountById: async (_, {id}) => {

			return await userAccounts.find( UserAccount => UserAccount.id == id)
		},

		adminAccount: async (_, {id}) => {

			return await userAccounts.find( UserAccount => UserAccount.id == "0")
		}
		
	},

	Mutation: {
		
		addUserAccount: async (_, {name}) => {

			userIDCount++

			const newUserAccount = {
				id: userIDCount,
				name: name,
				amount: 0,
				share: 0
			}
			
		
			await userAccounts.push(newUserAccount)

			return newUserAccount
		},

		addFundsToUserAccount: async (_, {id, amount}) => {

			const userAccount = await  userAccounts.find( UserAccount => UserAccount.id == id)
			const adminAccount = await  userAccounts.find( UserAccount => UserAccount.id == "0")

			userAccount.amount += amount;
			adminAccount.amount += amount;
			
			userAccounts.forEach(userAccount => {
				if (userAccount.id != "0") {
					newShare = (userAccount.amount / adminAccount.amount) * 100
					console.log(newShare);
					userAccount.share = newShare
				}
			});

			// return userAccounts
		}
	},
};


const server = new ApolloServer({ typeDefs, resolvers});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`Server ready at ${url} Query at https://studio.apollographql.com/dev `);
});

































