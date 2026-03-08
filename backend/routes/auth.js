const express = require("express");
const { signupUser, loginUser, getProfile } = require("../controllers/authController");

/**
 * Authentication Router for YojanaSathi
 * Defines API endpoints for user registration and login.
 */
const router = express.Router();

/**
 * POST /api/auth/signup
 * Handles new user registration (Firebase Auth + Firestore Profile).
 */
router.post("/signup", signupUser);

/**
 * POST /api/auth/login
 * Handles user login verification by email.
 */
router.post("/login", loginUser);

/**
 * GET /api/auth/profile/:userId
 * Fetches user profile from Firestore.
 */
router.get("/profile/:userId", getProfile);

module.exports = router;
