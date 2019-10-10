const validator = require("email-validator");

export class User {
  id: string;
  mail: string = '';
  pass: string = '';
  name: string = '';
  surname: string = '';
  gender: string = '';
  date_of_birth: Date;
  tutor_name: string;
  tutor_surname: string;
  tutor_date_of_birth: Date;
  place_of_birth: string;
  age_range: string;
  height: string;
  body_size: string;
  shoe_size: string;
  agency: string;
  field_registrato_da_app:{"und":[{"value":1}]};

  static isValidName(name) {
    if ( name ) return true;
  	return false;
  };
  static isValidSurname(surname) {
    if ( surname ) return true;
  	return false;
  };
  static isValidGender(gender) {
    if ( gender ) return true;
  	return false;
  };
  static isValidDate(date) {
    if ( date ) return true;
  	return false;
  };
  static isValidEmail(mail) {
    if ( mail ) {
      if ( mail.length > 0 ) {
        return validator.validate(mail);
      }
    }
  };
  static isValidPassword(pass) {
    if ( pass ) {
      if ( pass.length > 5 ) {
        return true;
      }
    }
  	return false;
  }
}
