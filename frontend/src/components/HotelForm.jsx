import React from "react";

const HotelForm = ({
  isEditing,
  createForm,
  handleChange,
  handleFileChange,
  addHotel,
}) => {
  return (
    <div>
      <div>
        <h2>{isEditing ? "Edit Hotel" : "Add Hotel"}</h2>
        <form onSubmit={addHotel}>
          <div>
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={createForm.price}
              onChange={handleChange}
              required
            />
            <label>Price</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Type"
              name="type"
              value={createForm.type}
              onChange={handleChange}
              required
            />
            <label>Type</label>
          </div>
          <div>
            <input
              type="number"
              placeholder="Capacity"
              name="Capacite"
              value={createForm.Capacite}
              onChange={handleChange}
              required
            />
            <label>Capacity</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="Name"
              value={createForm.Name}
              onChange={handleChange}
              required
            />
            <label>Name</label>
          </div>
          <div>
            <input
              type="number"
              placeholder="Star Rating"
              name="Etoile"
              value={createForm.Etoile}
              onChange={handleChange}
              required
            />
            <label>Star Rating</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              name="Description"
              value={createForm.Description}
              onChange={handleChange}
              required
            />
            <label>Description</label>
          </div>
      
          <div>
            <input type="file" onChange={handleFileChange} />
            <label>Upload Image</label>
          </div>
          <button type="submit">{isEditing ? "Update" : "Add Hotel"}</button>
        </form>
      </div>
    </div>
  );
};

export default HotelForm;
