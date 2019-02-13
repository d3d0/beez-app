const validator = require("email-validator");

export class User {
  id: string;
  mail: string;
  pass: string;
  
  static isValidEmail(mail) {
    return validator.validate(mail);
  };

  static isValidPassword(pass) {
  	if ( pass.length > 5 ) return true;
  	return false
  }
}
