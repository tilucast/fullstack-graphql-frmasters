/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

 const shoes = [
  {brand: "NIKE", size: 12, sport: "soccer", user: "jBWMVGjm50l6LGwepDoty"},
  {brand: "QUENIS", size: 12, hasGrip: true, user: "jBWMVGjm50l6LGwepDoty"}
]

module.exports = {

  Query: { 
    user(_, {input}, {models}){
      return models.User.findOne(input)
    },
    pets(_, {input}, {models}){
      return models.Pet.findMany(input)
    },
    shoes(_, {input}){
      return shoes
    },
    pet(_, {input}, {models}){
      return models.Pet.findOne(input)
    }
  },

  Mutation: {
    newShoe(_, {input}) {
      return input
    },
    newPet(_, {input}, {models}) {
      return models.Pet.create(input)
    }
  },

  User: {
    shoes(user){
      return shoes
    },
    pets(user, __, {models}){
      return models.Pet.findMany(user.pets)
    }
  },

  Pet: {
    user(pet, __, {models}){
      return models.User.findOne({id: pet.user})
    }
  },

  Shoes: {
    __resolveType(shoes){
      return shoes.sport ? 'Sneaker' : 'Boot'
    }
  },
  Sneaker: {
    user(shoes, __, {models}){
      return models.User.findOne({id: shoes.user})
    }
  },
  Boot: {
    user(shoes, __, {models}){
      return models.User.findOne({id: shoes.user})
    }
  }

  /* Footwear: {
    __resolveType(shoes){
      return shoes.sport ? 'Sneaker' : 'Boot'
    },
  } */

  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },

  // User: {
    
  // }

}
