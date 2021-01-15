const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`

  """ union Footwear = Sneaker | Boot """

  enum ShoeType {
    JORDAN
    ADIDDAS
    NIKE
    QUENIS
  }

  type User {
      id: ID!
      username: String!
      shoes: [Shoes]!
      pets: [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    user: User
  }

  interface Shoes {
    brand: ShoeType
    size: Int!
    user: User!
  }

  type Sneaker implements Shoes {
    brand: ShoeType
    size: Int!
    user: User!
    sport: String!
  }

  type Boot implements Shoes {
    brand: ShoeType
    size: Int!
    user: User!
    hasGrip: Boolean!
  }



  input PetInput {
    id: ID
    type: String
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  input NewPetInput {
    name: String!
    type: String!
  }

  input UserInput {
    id: ID!
  }

  type Query {
      user(input: UserInput): User
      pets(input: PetInput): [Pet]!
      shoes(input: ShoesInput): [Shoes]!
      pet(input: PetInput): Pet
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoes!
    newPet(input: NewPetInput!): Pet!
  }

`;

module.exports = typeDefs
