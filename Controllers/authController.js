const User = require("../Schema/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.signup = async (req, res) => {
            try {

                        const { username, email, password } = req.body;
                        console.log(username, email, password)
                        const emailExist = await User.findOne({ email })
                        if (emailExist) return res.json({ success: false, message: `${email} is already exist ` })

                        if (username === "" || email === "" || password === "") return res.json({ success: false, message: "fill required fields" })

                        if (password.length < 6) return res.json({ message: "Password length must be 6 or above" })

                        const hashpassword = await bcrypt.hash(password, 0)
                        const userDets = new User({
                                    username,
                                    email,
                                    password: hashpassword
                        })

                        await userDets.save()
                        return res.json({ success: true, message: "Successfully Signup!", userDets })

            } catch (error) {
                        console.log(error.message)
                        return res.json({ success: false, message: "Interval Server error" })
            }

}


exports.login = async (req, res) => {

            const { email, password } = req.body;

            console.log(email, password)
            const isEmailExist = await User.findOne({ email })
            if (!isEmailExist) return res.status(404).json({ success: false, message: "Email is dosen't exist" })

            const isPasswordMatch = await bcrypt.compare(password, isEmailExist.password)
            if (!isPasswordMatch) return res.status(400).json({ success: false, message: "Invalid password" })

            const token = jwt.sign({ id: isEmailExist._id }, process.env.SECRET_KEY, { expiresIn: "1h" })


            res.cookie("token", token, {
                        httpOnly: true,
                        expiresIn: new Date(Date.now() + 1000 * 60 * 60)
            })

            return res.status(200).json({ success: true, message: "Login Successfully", isEmailExist })

}

exports.logout = async (req, res) => {

            try {
                        res.cookie("token", "", {
                                    expires: new Date(Date.now()),
                        });

                        return res.status(200).json({ success: false, message: "logout successfully" })
            } catch (error) {
                        console.log(error.message)
            }
}

exports.checkuser = async (req, res) => {
            const id = req.id;


            try {
                        const user = User.findById(id).select("-password");
                        console.log(user)
                        if (!user) return res.status(400).json({ success: false, message: "Please signup" })
                        res.status(200).json({ success: true, user })
            } catch (error) {
                        return res.status(500).json({ success: false, message: error.message })
            }

}