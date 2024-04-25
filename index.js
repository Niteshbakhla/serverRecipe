const express = require("express")
const app = express()
const PORT = 3000;
const { connectDB } = require("./Database/connection");
const router = require("./Routes/route");
const cors = require("cors")
const cookieparser = require("cookie-parser")

require("dotenv").config()
connectDB()

app.use(cookieparser())
app.use(express.json())
app.use(cors({
            origin: "https://serverauth.netlify.app",
            credentials: true
}))
app.use("/api", router)
app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`)
})
