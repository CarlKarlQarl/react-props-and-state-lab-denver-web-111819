import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {
    const { pets, onAdoptPet } = this.props
    return (
      <div className="ui cards">
        {pets.map(pet => {
          return <Pet pet={pet} onAdoptPet={onAdoptPet} key={pet.id}/>
        })}
      </div>
    )
  }
}

export default PetBrowser
