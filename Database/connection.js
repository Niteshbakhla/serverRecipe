const mongoose = require("mongoose")


exports.connectDB = async () => {
            try {
                        const connecting = await mongoose.connect(process.env.MONGO_URI)


                        if (connecting.STATES.connected) {
                                    console.log("Database is connected")
                        } else {
                                    console.log("Database is not connected")
                        }

            } catch (error) {
                        console.log(error.message)
            }
}