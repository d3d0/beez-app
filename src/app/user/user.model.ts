const validator = require("email-validator");

export class User {
  id: string;
  mail: string;
  pass: string;
  name: string
  surname: string
  date_of_birth: Date
  tutor_name: string
  tutor_surname: string
  tutor_date_of_birth: Date
  place_of_birth: string
  age_range: string
  gender: string
  height: string
  body_size: string
  shoe_size: string
  agency: string
  field_registrato_da_app:{"und":[{"value":1}]};

  static isValidEmail(mail) {
    return validator.validate(mail);
  };

  static isValidPassword(pass) {
  	if ( pass.length > 5 ) return true;
  	return false
  }
}
