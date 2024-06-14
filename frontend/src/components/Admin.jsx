import React, { useState, useEffect } from "react";
import axios from "axios";
import HotelForm from "./HotelForm";

const Admin = () => {
  const [hotels, setHotels] = useState([]);
  const [createForm, setCreateForm] = useState({
    price: "",
    type: "",
    Capacite: "",
    Name: "",
    Etoile: "",
    Description: "",
    Image: "",
  });
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editHotelId, setEditHotelId] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/hotels/select");
      setHotels(res.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      console.log("9a3ed nekteb")
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hotel_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dw1sxdmac/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const addHotel = async (e) => {
    e.preventDefault();
    let imageUrl = createForm.Image;

    if (file) {
      imageUrl = await uploadImage();
      if (!imageUrl) {
        alert("Error uploading image");
        return;
      }
    }

    const hotelData = { ...createForm, Image: imageUrl };

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3005/api/hotels/update/${editHotelId}`,
          hotelData
        );
        setIsEditing(false);
        setEditHotelId(null);
      } else {
        await axios.post("http://localhost:3005/api/hotels/create", hotelData);
      }
      fetchHotels();
    } catch (error) {
      console.error("Error adding/editing hotel:", error);
    }

    setCreateForm({
      price: "",
      type: "",
      Capacite: "",
      Name: "",
      Etoile: "",
      Description: "",
      Image: "",
    });
    setFile(null);
  };

  const deleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/hotels/delete/${id}`);
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const editHotel = (hotel) => {
    setIsEditing(true);
    setEditHotelId(hotel._id);
    setCreateForm({
      price: hotel.price,
      type: hotel.type,
      Capacite: hotel.Capacite,
      Name: hotel.Name,
      Etoile: hotel.Etoile,
      Description: hotel.Description,
      Image: hotel.Image,
    });
  };

  return (
    <div>
      <HotelForm
        isEditing={isEditing}
        createForm={createForm}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        addHotel={addHotel}
      />

      <div>
        <h3>Hotels List</h3>
        {hotels.map((hotel) => (
          <div key={hotel._id}>
            <h4>{hotel.Name}</h4>
            <p>Price: {hotel.price}</p>
            <p>Type: {hotel.type}</p>
            <p>Capacity: {hotel.Capacite}</p>
            <p>Star Rating: {hotel.Etoile}</p>
            <p>Description: {hotel.Description}</p>
            <img
              src={hotel.Image}
              alt={hotel.Name}
              style={{ maxWidth: "1000px", maxHeight: "1000px" }}
            />
            <button onClick={() => editHotel(hotel)}>Edit</button>
            <button onClick={() => deleteHotel(hotel._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
