const nanoid = require('nanoid')

const createPetModel = db => {
  return {
    findMany(filter) {
      return db.get('pets')
        .filter(
          filter !== undefined && (Symbol.iterator in Object(filter)) ? 
            (pet, index) => {
                for(item of filter){
                  if (item === pet.id) return item
                }
            } : filter
          )
        .value()
    },

    findOne(filter) {
      return db.get('pets')
        .find(filter)
        .value()
    },

    create(pet) {
      const newPet = {id: nanoid(), createdAt: Date.now(), ...pet}

      db.get('pets')
        .push(newPet)
        .write()

      return newPet
    }
  }
}

module.exports = createPetModel
