const User = require("../Schema/user");

exports.addToFavourites = async (req, res) => {
            const { id } = req.params;
            const favourite = req.body;

            try {
                        // Find the user by _id
                        let user = await User.findById(id);

                        if (!user) {
                                    return res.status(404).json({ success: false, message: "User not found!" });
                        }

                        // Check if the favourite already exists
                        const existingFavourite = user.favourites.some(fav => fav.idMeal === favourite.idMeal);

                        if (existingFavourite) {
                                    return res.status(400).json({ success: false, message: "Recipe already in favourites" });
                        } else {
                                    // Add the new favourite to the user's favourites array
                                    user.favourites = [...user.favourites, favourite]
                                    await user.save();
                                    return res.status(200).json({ success: true, message: "Recipe added to favourites" });
                        }
            } catch (error) {
                        console.error(error);
                        return res.status(500).json({ success: false, message: "Internal server error" });
            }
};


exports.removeFromFavourites = async (req, res) => {
            const { id } = req.params
            const favourite = req.body;

            try {
                        let user = await User.findById({ id })
                        if (!user) {
                                    return res.status(404).json({ success: false, message: "User not found!" });
                        }
                        user.favourites = user.filter((fav) => fav.idMeal !== favourite.idMeal)
            } catch (error) {
                        return res.status(500).json({ success: false, message: "Internal server error" })
            }
}


exports.getfavourites = async (req, res) => {
            const { id } = req.params;
            try {
                        let user = await User.findOne({ id })
                        if (!user) return res.status(404).json({ success: false, message: "User not found" })
                        return res.status(200).json({ success: true, favourites: user.favourites })
            } catch (error) {

                        return res.status(500).json({ success: false, message: error.message })

            }
}