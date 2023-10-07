import React, { useState, useEffect } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // Retrieve user's location when the component mounts
    getLocation();
  }, []); // Empty dependency array to run this effect only once on mount

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log("Location obtained:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Handle registration submission here, including location data
    const registrationData = {
      name,
      email,
      password,
      latitude,
      longitude,
   };
   console.log(latitude , longitude)
const { data } = await axios.post(
  "http://localhost:5000/api/user/register",
  registrationData
);

    console.log("Registration data:", registrationData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <input type="hidden" id="latitude" value={latitude} />
        <input type="hidden" id="longitude" value={longitude} />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
