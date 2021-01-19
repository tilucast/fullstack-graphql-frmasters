import React from 'react'

const PetBox = ({pet}) => {
  console.log(pet);

  return (
    <div className="pet">
      <figure>
        <img src={pet.img} alt=""/>
      </figure>
      <div className="pet-name">{pet.name}</div>
      <div className="pet-type">{pet.type}</div>
      <div className="pet-type">{pet.vaccinated ? 'vaccinated' : 'not-vacicnated'}</div>
    </div>
  )
}

export default PetBox
