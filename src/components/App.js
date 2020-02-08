import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  componentDidMount = () => {
    this.doTheMockFetch()
  }

  doTheMockFetch = () => {
    this.state.filters.type === "all" 
      ? fetch("/api/pets")
          .then(response => response.json())
          .then(pets => {this.setState({pets})})
          .catch(error => console.log(error))
      : fetch(`/api/pets?type=${this.state.filters.type}`)
          .then(response => response.json())
          .then(pets => {this.setState({pets})})
          .catch(error => console.log(error))
  }

  onChangeType = (newType) => {
    console.log(newType)
    this.setState({
      filters: {
        type: newType
      }
    })
  }

  onFindPetsClick = () => {
    this.doTheMockFetch()
  }

  onAdoptPet = (id) => {
    this.setState({
      pets: this.state.pets.map(pet => {
        return pet.id === id
        ? {...pet, isAdopted: true}
        : pet
      })
    })
  }

  render() {
    console.log("filter", this.state.filters.type)
    console.log("pets", this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
