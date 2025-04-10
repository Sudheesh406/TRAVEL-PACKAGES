const User = require("../models/userSchema");
const TourOperator = require("../models/TourOperatorSchema");
const temperaryPassword = require("../models/otpSchema");

async function findUser(email) {
  otpClear(email);
  if (email) {
    try {
      let isExist = await User.findOne({ email: email });
      if (isExist) {
        return isExist;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error found in finding User:", error);
    }
  } else {
    console.log("No data provided");
    return null;
  }
}

async function findUserById(id) {
  if (id) {
    try {
      let isExist;
      let data = await User.findOne({ _id: id });
      if (data) {
        isExist = data;
      } else {
        isExist = await TourOperator.findOne({ _id: id });
      }
      if (isExist) {
        return isExist;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error found in finding User:", error);
    }
  } else {
    console.log("No data provided");
    return null;
  }
}

async function findOperator(email) {
  if (email) {
    try {
      let isExist = await TourOperator.findOne({ email: email });
      if (isExist) {
        return isExist;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error found in finding User:", error);
    }
  } else {
    console.log("No data provided");
    return null;
  }
}

async function createNewAccount(data) {
  let { email, username, password } = data;
  if (data) {
    let value = await findUser(email);
    if (!value) {
      try {
        let result = await User.create({ email, username, password });
        if (result) {
          return result;
        }
      } catch (error) {
        console.error("error found in user creation");
      }
    } else {
      return value;
    }
  }
}

async function createNewOperator(data) {
  let { email, username, password } = data;
  if (data) {
    console.log("data:", data);
    let value = await findOperator(email);
    if (!value) {
      try {
        let result = await TourOperator.create({ email, username, password });
        console.log("result:", result);

        if (result) {
          return result;
        }
      } catch (error) {
        console.error("error found in user creation");
      }
    } else {
      return value;
    }
  }
}

async function otpStore(value) {
  try {
    let data = await temperaryPassword.find({ email: value[1] });
    if (data) {
      let deleted = await temperaryPassword.deleteMany({ email: value[1] });
      if (deleted) {
        let result = await temperaryPassword.create({
          otp: value[0],
          email: value[1],
        });
        if (result) return result;
      }
    } else {
      let result = await temperaryPassword.create({
        otp: value[0],
        email: value[1],
      });
      if (result) return result;
    }
  } catch (error) {
    console.log("error:", error);
  }
}

async function GetOtp(value) {
  try {
    let result = await temperaryPassword.find({ email: value });
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log("error:", error);
  }
}

async function otpClear(value) {
  try {
    let result = await temperaryPassword.deleteMany({ email: value });
    if (result) {
      return result;
    }
  } catch (error) {
    console.error("error:", error);
  }
}



module.exports = {
  findUser,
  createNewAccount,
  findOperator,
  createNewOperator,
  otpStore,
  GetOtp,
  findUser,
  findUserById
};
