const db = require("./firebaseService");
const admin = require("firebase-admin");

/**
 * User Service for YojanaSathi
 * Handles all Firestore operations related to user profiles.
 */

/**
 * Saves or overwrites a user profile in Firestore.
 * @param {string} userId - The unique identifier for the user.
 * @param {Object} userData - The profile data to save.
 * @returns {Promise<Object>} The saved user data.
 */
async function saveUserProfile(userId, userData) {
  try {
    const userRef = db.collection("users").doc(userId);
    
    const profileData = {
      ...userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userRef.set(profileData, { merge: true });
    console.log(`User profile saved for ID: ${userId}`);
    return profileData;
  } catch (error) {
    console.error(`Error saving user profile for ${userId}:`, error.message);
    throw error;
  }
}

/**
 * Fetches a user profile from Firestore by userId.
 * @param {string} userId - The unique identifier for the user.
 * @returns {Promise<Object|null>} The user data or null if not found.
 */
async function getUserProfile(userId) {
  try {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      console.log(`No user profile found for ID: ${userId}`);
      return null;
    }

    return doc.data();
  } catch (error) {
    console.error(`Error fetching user profile for ${userId}:`, error.message);
    throw error;
  }
}

/**
 * Updates specific fields of a user profile in Firestore.
 * @param {string} userId - The unique identifier for the user.
 * @param {Object} userData - The fields to update.
 * @returns {Promise<Object>} The updated data.
 */
async function updateUserProfile(userId, userData) {
  try {
    const userRef = db.collection("users").doc(userId);
    
    const updateData = {
      ...userData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userRef.update(updateData);
    console.log(`User profile updated for ID: ${userId}`);
    return updateData;
  } catch (error) {
    console.error(`Error updating user profile for ${userId}:`, error.message);
    throw error;
  }
}

module.exports = {
  saveUserProfile,
  getUserProfile,
  updateUserProfile,
};
