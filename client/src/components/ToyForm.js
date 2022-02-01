import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

async function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      ...formData,
      likes: 0,
    };

    const response = await fetch("/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
    const data = await response.json()
    if(response.ok){
      onAddToy(data)
      setFormData({
        name: "",
        image: "",
      })
      setErrors([]);
    }
    else {
      setErrors(data.errors)
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
        {errors.length > 0 ?
        errors.map((error)=> {
         return <li>{error}</li>
        }) :
        null}
      </form>
    </div>
  );
}

export default ToyForm;
