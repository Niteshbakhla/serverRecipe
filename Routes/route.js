const express = require("express")
const { signup, login, logout, checkuser } = require("../Controllers/authController")
const { verifyToken } = require("../middleware/verifyToken")
const { addToFavourites, removeFromFavourites, getfavourites } = require("../Controllers/featureController")
const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.get("/checkuser", checkuser)
router.get("/addtofavourite/:id", addToFavourites)
router.post("/removefavourite/:id", removeFromFavourites)
router.get("/getfavourite/:id", getfavourites)
module.exports = router