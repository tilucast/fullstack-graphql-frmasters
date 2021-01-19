import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import {ApolloLink} from 'apollo-link'
import {setContext} from 'apollo-link-context'

const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet{
    vaccinated: Boolean
  }
`

const resolvers = {
  User: {
    age(user, args, context, info) {
      return 25
    }
  },
  Pet: {
    vaccinated(pet){
      return pet.img.length > 100 ? true : false
    }
  }
}

const http =  new HttpLink({uri: 'http://localhost:4000'})

const delay = setContext(request => {
  return new Promise((succ, fail) => [
    setTimeout(() => {
      succ()
    }, 800)
  ])
})

const link = ApolloLink.from([delay, http])
const cache = new InMemoryCache()
const client = new ApolloClient({
    link, cache, resolvers, typeDefs
})

export default client
