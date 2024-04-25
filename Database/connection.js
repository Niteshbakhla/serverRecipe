const mongoose = require("mongoose")


exports.connectDB = async () => {
            try {
                        const connecting = await mongoose.connect("mongodb+srv://niteshbakhla007:ITpTFqvb2zRwsM5M@cluster0.w9km6xl.mongodb.net/")


                        if (connecting.STATES.connected) {
                                    console.log("Database is connected")
                        } else {
                                    console.log("Database is not connected")
                        }

            } catch (error) {
                        console.log(error.message)
            }
}
