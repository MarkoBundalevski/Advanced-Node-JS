const DataService = require("../services/data.service");
const path = require("path");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "data", "users.json");

class User {
  constructor(firstName, lastName, age, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

class AuthModel {
  static async getAllUsers() {
    return DataService.readJSONFile(usersPath);
  }

  static async getUserById(userId) {
    const users = await this.getAllUsers();

    const foundUser = users.find((user) => user.id == userId);
    if (!foundUser) return Promise.reject({ msg: "invalid credentials" });
  }

  // 1. Create a user
  static async createUser(userData) {

    const users = await this.getAllUsers();
    const userExists = users.some((user) => user.email == userData.email);
    if (userExists) {
      return Promise.reject({ msg: "Email already taken!" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 8);
    console.log(hashedPassword);

    const newUser = new User(
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      hashedPassword
    );
    console.log(newUser);

    const updatedUsers = [...users, newUser];
    await DataService.saveJSONFile(usersPath, updatedUsers);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  // 2. Login a user
  static async loginUser(credentials) {
    
    const { email, password } = credentials;
    const users = await this.getAllUsers();
  
    const foundUser = users.find((user) => user.email == email);

    if (!foundUser) return Promise.reject({ msg: "Invalid credentials!" });
    
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) return Promise.reject({ msg: "Invalid credentials!" });
    
    const { password: hashedPassword, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

  //3. Save Refresh Token
  static async saveRefreshToken(userId, refreshToken) {
    const users = await this.getAllUsers();
    const foundUser = await this.getUserById(userId);

    foundUser.refreshToken = refreshToken;

    const updatedUsers = users.map((user) => {
      if (user.id == userId) {
        user.refreshToken = refreshToken;
        return user;
      }
      return user;
    });

    await DataService.saveJSONFile(usersPath, updatedUsers);
  }
  //4. Delete refresh token
  static async deleteToken(userId) {
    const users = await this.getAllUsers();

    const updatedUsers = users.map((user) => {
      if (user.id == userId) {
        user.refreshToken = null;
        return user;
      }
      return user;
    });

    await DataService.saveJSONFile(usersPath, updatedUsers);
  }
}

module.exports = AuthModel;
