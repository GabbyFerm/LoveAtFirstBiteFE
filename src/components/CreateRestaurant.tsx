import React from 'react'

function CreateRestaurant = (event) => {
    event.preventDefault();

let restaurantObject = {
    name: newRestaurantName,
    address; newAddress
};
axios.post("url", restaurantObject)

  return (
    <div>
    <h3>CreateRestaurant</h3>
    <form>
    <input>RestaurantName</input>
    <input>Address</input>
    <button>Add restaurant</button>
    </form>
    </div>
  )
}

export default CreateRestaurant