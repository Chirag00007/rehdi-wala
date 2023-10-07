function requestGeolocationPermission() {
  if (navigator.permissions) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          getUserLocation();
        } else if (permissionStatus.state === "prompt") {
          // The user hasn't decided yet, you can handle accordingly
        } else {
          console.error("Geolocation permission denied.");
        }
      });
  } else {
    console.error("Geolocation permissions not supported.");
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userId = "USER_ID"; // Replace with the actual user ID
        await updateUserLocation(userId, latitude, longitude);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

async function updateUserLocation(userId, latitude, longitude) {
  try {
    const response = await fetch(`/api/update-location/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude }),
    });

    if (response.ok) {
      console.log("User location updated successfully");
    } else {
      console.error("Failed to update user location:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating user location:", error);
  }
}
