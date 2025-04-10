const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../nodeMailer");
require("dotenv").config();
const {
  findUser,
  createNewAccount,
  findOperator,
  createNewOperator,
  otpStore,
  GetOtp,
  findUserById,
} = require("../services/loginService");

//--------user Signup------------

async function Signup(req, res) {
  try {
  const { email, password, username, otp, otpRequest } = req.body;
  console.log(req.body);
  if (otpRequest) {
    let isExist = await findOperator(email);
    if (isExist) {
      return res
        .status(400)
        .json({ message: "this mail already has an account as operator" });
    }
    isExist = await findUser(email);
    if (isExist)
      return res
        .status(409)
        .json({ message: "this mail already has an account" });

    let response = await nodemailer(email);
    if (response) {
      return res.status(200).json({ message: "otp sented successfully..." });
    }
  }
  if (email && password && username && otp) {
    let otpData = await GetOtp(email);
    if (otpData[0].otp != otp) {
      return res.status(401).json({ message: "otp is not correct" });
    }
    let result = await findUser(email);
    if (!result) {
      const hashedPassword = await bcrypt.hash(password, 10);
      let accessUser = await createNewAccount({
        email,
        username,
        password: hashedPassword,
      });

      if (accessUser) {
        let accessToken = jwt.sign(
          { id: accessUser.id },
          process.env.SECRET_KEY,
          { expiresIn: "52h" }
        );

        let newUser = {};
        newUser._id = accessUser._id;
        newUser.email = accessUser.email;
        newUser.username = accessUser.username;
        newUser.role = accessUser.role;
        return res
          .cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 194400000,
          })
          .status(200)
          .json({
            message: "Account created successfully...",
            result: { newUser, accessToken },
          });
      } else {
        console.error("Error creating account");
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    return res.status(402).json({ message: "Missing required fields" });
  }
} catch (error) {
    console.error("error found in signup", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

//--------user Login------------

async function login(req, res) {
  try {
  const { email, password } = req.body;
  if (email && password) {
    let data = await findUser(email);
    if (!data) {
      data = await findOperator(email);
    }
    if (data) {
      if (data.acess !== true) {
        return res.status(403).json({ message: "Acess Cancelled.." });
      }
      let valid = await bcrypt.compare(password, data.password);
      if (valid) {
        let accessToken = jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
          expiresIn: "52h",
        });
        let result = {};
        result._id = data._id;
        result.email = data.email;
        result.username = data.username;
        result.role = data.role;
        result.about = data.about;
        result.phone = data.phone;
        result.location = data.location;
        result.image = data.image;
        result.DateOfBirth = data.DateOfBirth;
        return res
          .cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 194400000,
          })
          .status(200)
          .json({ message: "login successfully...", result, accessToken });
      } else {
        return res.status(401).json({ message: "in correct password..." });
      }
    }else{
      return res.status(404).json({ message: "no user found with this email" });
    }
  }
     
} catch (error) {
    console.error("error found in login", error);
    return res.status(500).json({ message: "Internal server error" });
}
}

async function nodemailer(userMail) {
  let otp = generateOTP();
  otpStore([otp, userMail]);
  const info = await transporter.sendMail({
    from: "sudheeshunni406@gmail.com", // sender address
    to: userMail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `${otp} here is your otp`, // plain text body
    html: `${otp} here is your otp`, // html body
  });
  // console.log("info:",info);
  return info;
}

function generateOTP(length = 6) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

//--------operator Signup------------

async function operatorSignup(req, res) {
  try {
  const { email, password, username, otp, otpRequest } = req.body;
  if (otpRequest) {
    let data = await findUser(email);
    if (data) {
      return res
        .status(400)
        .json({ message: "this mail already has an account as user" });
    }
    data = await findOperator(email);
    if (data)
      return res
        .status(409)
        .json({ message: "this mail already has an account" });
    let response = await nodemailer(email);
    if (response) {
      return res.status(200).json({ message: "otp sented successfully..." });
    }
  }
  if (email && password && username && otp) {
    let otpData = await GetOtp(email);
    if (otpData[0].otp != otp) {
      return res.status(401).json({ message: "otp is not correct" });
    }
    let result = await findOperator(email);
    if (!result) {
      const hashedPassword = await bcrypt.hash(password, 10);
      let accessUser = await createNewOperator({
        email,
        username,
        password: hashedPassword,
      });

      if (accessUser) {
        let accessToken = jwt.sign(
          { id: accessUser.id },
          process.env.SECRET_KEY,
          { expiresIn: "52h" }
        );
        let newUser = {};
        newUser._id = accessUser._id;
        newUser.email = accessUser.email;
        newUser.username = accessUser.username;
        newUser.role = accessUser.role;
        return res
          .cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 194400000,
          })
          .status(200)
          .json({
            message: "Account created successfully...",
            result: { newUser, accessToken },
          });
      } else {
        console.error("Error creating account");
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    return res.status(401).json({ message: "Missing required fields" });
  }
} catch (error) {
 res.status(500).json({ message: "Internal server error" });
  console.error("error found in operator signup", error);   
}
}

// //--------operator Login------------

// async function operatorLogin (req,res){
//   const { email, password } = req.body;
//   if (email && password){
//           let data = email;
//           let result = await findOperator(data);
//           if (result) {
//             let valid = await bcrypt.compare(password, result.password);
//             if (valid) {
//               let accessToken = jwt.sign(
//                 { id: result.id },
//                 process.env.SECRET_KEY,
//                 { expiresIn: "24h" }
//               );
//               return res
//                 .cookie("token", accessToken, {
//                   httpOnly: true,
//                   secure: true,
//                   sameSite: "lax",
//                 })
//                 .status(200)
//                 .json({ message: "login successfully...", result});
//             } else {
//               return res.status(400).json({ message: "in correct password..." });
//             }
//   }
// }else{
//   return res.status(400).json({ message: "no Operator found in this id" });
// }
// }

const getUser = async (req, res) => {
  try {
    let result = await findUserById(req.User.id);
    if (result) {
      return res.status(200).json({ message: "user Found", result });
    } else {
      return res.status(400).json({ message: "No user Found" });
    }
  } catch (error) {
    console.error("error found in getUser", error);
    return res.status(400).json({ message: "error found in getUser" });
  }
};

let logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { Signup, login, operatorSignup, getUser, logOut };
