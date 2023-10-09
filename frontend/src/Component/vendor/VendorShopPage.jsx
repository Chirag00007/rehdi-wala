import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorShopPage = () => {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch shop details for the logged-in vendor
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get("API_ENDPOINT_TO_FETCH_SHOP_DATA");
        setShopData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl mb-4">Your Shop Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        shopData && (
          <div>
            <h3>Shop Name: {shopData.shopName}</h3>
            <p>Category: {shopData.Category}</p>
            <p>Products: {shopData.products.join(", ")}</p>
            <p>Location Type: {shopData.location.type}</p>
            <p>Active: {shopData.active ? "Yes" : "No"}</p>
          </div>
        )
      )}
    </div>
  );
};

export default VendorShopPage;
