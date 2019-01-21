const validator = require("email-validator");

export class User {
  id: string;
  email: string;
  password: string;
  
  isValidEmail() {
    return validator.validate(this.email);
  }

  isValidPassword() {
  	if ( this.password.length > 5 )
  		return true;
  	return false
  }
}
