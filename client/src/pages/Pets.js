import React, {useEffect, useState} from 'react'
import gql from 'graphql-tag'
import PetsList from '../components/PetsList'
import NewPet from '../components/NewPet'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loader from '../components/Loader'

/* 
  age client => user{
      id
      age @client
    }
*/

const PETS_FIELDS = gql`
  fragment PetsFields on Pet{
    name
    id
    type
    img
    vaccinated @client
  }
`

const PETS_QUERY = gql`
  query petsQuery{
      pets{
        ...PetsFields
      }
  }
  ${PETS_FIELDS}
`

const CREATE_A_PET = gql`
  mutation createAPet($input: NewPetInput!){
    newPet(input: $input){
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`

export default function Pets () {
  const [modal, setModal] = useState(false)
  const {data, loading, error} = useQuery(PETS_QUERY)

  const [createAPet, createdPet] = useMutation(CREATE_A_PET, {
    update(cache, {data: {newPet}}){
      const {pets} = cache.readQuery({query: PETS_QUERY})
      cache.writeQuery({
        query: PETS_QUERY,
        data: {pets: [newPet, ...pets]}
      })
    }
  })
  
  const onSubmit = input => {
    setModal(false)
    createAPet({
      variables: {input},
      optimisticResponse: {
        __typename: "Mutation",
        newPet: {
          __typename: "Pet",
          id: "placeholderstringherecuh",
          type: input.type,
          name: input.name,
          img: input.img
        }
      }
    })
  }

  if(loading){
    return <Loader />
  }

  if(error || createdPet.error){
    return <p>{error || createdPet.error}</p>
  }
  
  if (modal) {
    return <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)}/>
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
          <PetsList pets={data.pets}/>
      </section>
    </div>
  )
}
