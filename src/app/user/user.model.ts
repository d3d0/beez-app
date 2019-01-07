const validator = require("email-validator");

export class User {
  id: string;
  email: string;
  password: string;
  // isValidEmail() {
  //   return validator.validate(this.email);
  // }
}
