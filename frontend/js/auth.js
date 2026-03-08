const API_BASE = "http://localhost:5000/api/auth";

async function signupUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Signup successful");
      return true;
    } else {
      alert(data.error || "Signup failed");
      return false;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Signup failed. Please try again.");
    return false;
  }
}

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("userId", data.userId);
      window.location.href = "chat.html";
      return true;
    } else {
      alert(data.error || "Login failed");
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please try again.");
    return false;
  }
}

function logoutUser() {
  localStorage.removeItem("userId");
  window.location.href = "login.html";
}
