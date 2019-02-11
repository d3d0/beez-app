const validator = require("email-validator");

export class User {
  id: string;
  email: string;
  password: string;
  
  static isValidEmail(email) {
    return validator.validate(email);
  };

  static isValidPassword(password) {
  	if ( password.length > 5 ) return true;
  	return false
  }
}
