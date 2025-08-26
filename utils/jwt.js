const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Create token
const createToken = (user) => {
  const token = jwt.sign(
    { sub: user._id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

// Generate refresh token
const generateRefreshToken = () => {
  const refreshToken = crypto.randomBytes(64).toString("hex");
  return refreshToken;
};

// Save refresh token (hash)
// Save refresh token (hash)
async function saveRefreshToken(userId, token, userAgent) {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari

  const newToken = new RefreshToken({
    user: userId,
    tokenHash,
    userAgent,
    expiresAt,
  });

  await newToken.save();
}

module.exports = {
  createToken,
  generateRefreshToken,
  saveRefreshToken,
};
