const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../nodeMailer")
require("dotenv").config();
const {findUser,createNewAccount,findOperator,createNewOperator,otpStore,GetOtp,findUserById,} = require("../services/loginService");
//--------user Signup------------

async function Signup(req, res) {
    const { email, password, name,otp,otpRequest} = req.body;
    console.log(req.body)
      if(otpRequest){
        let isExist = await findOperator(email);
        if(isExist)return res.status(400).json({ message: "this mail only can join as operator" });
        let response = await nodemailer(email)
        if(response){
          return res.status(200).json({ message: "otp sented successfully..." });
        }
      }
    if (email && password && name && otp) {
      let username = name;
      console.log("total");
      let otpData = await GetOtp(email)
        if(otpData[0].otp != otp){
          return res.status(200).json({ message: "otp is not correct" });
        }
      let result = await findUser(email);
      if (!result) {
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await createNewAccount({
          email,
          username,
          password: hashedPassword,
        });
  
        if (newUser) {
          let accessToken = jwt.sign(
            { id: newUser.id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
          );
  
          return res
            .cookie("token", accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
            })
            .status(200)
            .json({
              message: "Account created successfully...",
              result: newUser,
            });
        } else {
          console.error("Error creating account");
          return res.status(500).json({ message: "Internal server error" });
        }
      } else {
        return res.status(401).json({ message: "User already has an account" });
      }
    } else {
      return res.status(400).json({ message: "Missing required fields" });
    }
  }
  
//--------user Login------------

  async function login (req,res){
    const { email, password } = req.body;
    if (email && password){
            let result = await findUser(email);
            if(!result){
              result = await findOperator(email);
            }
            if (result) {
              let valid = await bcrypt.compare(password, result.password);
              if (valid) {
                let accessToken = jwt.sign(
                  { id: result.id },
                  process.env.SECRET_KEY,
                  { expiresIn: "24h" }
                );
      
                return res
                  .cookie("token", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax",
                  })
                  .status(200)
                  .json({ message: "login successfully...", result});
              } else {
                return res.status(400).json({ message: "in correct password..." });
              }
    }
  }else{
    return res.status(400).json({ message: "no user found in this id" });
  }
  }

  async function nodemailer(userMail) {
    let otp = generateOTP()
    otpStore([otp,userMail])
    const info = await transporter.sendMail({
      from: 'sudheeshunni406@gmail.com', // sender address
      to: userMail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `${otp} here is your otp`, // plain text body
      html: `${otp} here is your otp`, // html body
    });
    // console.log("info:",info);
    return info
  }
  
  function generateOTP(length = 6) {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
    }
    return otp;
  }
  
//--------operator Signup------------

  async function operatorSignup(req, res) {
    const { email, password, username,otp,otpRequest} = req.body;
    console.log("data",req.body)
      if(otpRequest){
        let response = await nodemailer(email)
        if(response){
          return res.status(200).json({ message: "otp sented successfully..." });
        }
      }
    if (email && password && username && otp) {
      let otpData = await GetOtp(email)
        if(otpData[0].otp != otp){
          return res.status(400).json({ message: "otp is not correct" });
        }
      let result = await findOperator(email);
      if (!result) {
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = await createNewOperator({
          email,
          username,
          password: hashedPassword,
        });
  
        if (newUser) {
          let accessToken = jwt.sign(
            { id: newUser.id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
          );
  
          return res
            .cookie("token", accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: "lax",
            })
            .status(200)
            .json({
              message: "Account created successfully...",
              result: newUser,
            });
        } else {
          console.error("Error creating account");
          return res.status(500).json({ message: "Internal server error" });
        }
      } else {
        return res.status(401).json({ message: "User already has an account" });
      }
    } else {
      return res.status(400).json({ message: "Missing required fields" });
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

  const getUser = async (req,res)=>{
    try {
      let result = await findUserById(req.User.id)
      if(result){
        return res.status(200).json({ message: "user Found",result })   
       }else{
        return res.status(400).json({ message: "No user Found" })    
      }
    } catch (error) {
      console.error("error found in getUser",error);
      return res.status(400).json({ message: "error found in getUser" })    
    }
  }


  module.exports = {Signup,login,operatorSignup,getUser}