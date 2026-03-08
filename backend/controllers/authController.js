const { createUser, getUserByEmail } = require("../services/firebaseAuthService");
const { saveUserProfile, getUserProfile } = require("../services/userService");

/**
 * Get User Profile - Fetches profile from Firestore
 */
async function getProfile(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, error: "UserId is required" });
    }

    const profile = await getUserProfile(userId);
    if (!profile) {
      return res.status(404).json({ success: false, error: "Profile not found" });
    }

    return res.json({
      success: true,
      profile: profile
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Signup Controller - Handles new user registration
 * 1. Creates user in Firebase Authentication
 * 2. Saves user profile in Firestore
 */
async function signupUser(req, res) {
  try {
    const {
      email,
      password,
      name,
      age,
      gender,
      state,
      district,
      occupation,
      annualIncome,
      category
    } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      console.log("Signup failed: Missing required fields");
      return res.status(400).json({
        success: false,
        error: "Required fields missing"
      });
    }

    // Create user in Firebase Auth
    console.log(`Creating Firebase Auth record for: ${email}`);
    const userRecord = await createUser(email, password);
    const userId = userRecord.uid;

    // Save profile in Firestore
    console.log(`Saving Firestore profile for user: ${userId}`);
    await saveUserProfile(userId, {
      email,
      name,
      age,
      gender,
      state,
      district,
      occupation,
      annualIncome,
      category
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: userId
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Login Controller - Handles user login
 * Fetches user record from Firebase Auth by email
 */
async function loginUser(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required"
      });
    }

    console.log(`Attempting login for: ${email}`);
    const user = await getUserByEmail(email);

    if (!user) {
      console.log(`Login failed: User not found - ${email}`);
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    console.log(`Login successful for: ${email} (UID: ${user.uid})`);
    return res.json({
      success: true,
      message: "Login successful",
      userId: user.uid
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  signupUser,
  loginUser,
  getProfile
};
