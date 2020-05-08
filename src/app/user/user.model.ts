const validator = require("email-validator");

export class User {
  id: string;
  mail: string = '';
  pass: string = '';
  username : string = '';
  name: string = '';
  surname: string = '';
  gender: string = '';
  date_of_birth: any;
  
  tutor_name: string = '';
  tutor_surname: string = '';
  tutor_date_of_birth: Date;
  tutor_email = '';
  tutor_place_of_birth = '';
  tutor_address = '';
  tutor_phone = '';
  tutor_id_card_type = '';
  tutor_id_card_number = '';
  tutor_id_card_released_by = '';
  tutor_id_card_date = '';
  tutor_id_card_expiry = '';

  tutor1_name: string = '';
  tutor1_surname: string = '';
  tutor1_date_of_birth: Date;
  tutor1_email = '';
  tutor1_place_of_birth = '';
  tutor1_address = '';
  tutor1_phone = '';
  tutor1_id_card_type = '';
  tutor1_id_card_number = '';
  tutor1_id_card_released_by = '';
  tutor1_id_card_date = '';
  tutor1_id_card_expiry = '';

  minor_address = '';

  place_of_birth: string = '';
  age_range: string = '';
  height: string = '';
  body_size: string = '';
  shoe_size: string = '';
  agency: string = '';
  field_registrato_da_app:{"und":[{"value":1}]};

  // minore
  static isValidTutorName(name) {
    if ( name ) return true;
  	return false;
  };
  static isValidTutorSurname(surname) {
    if ( surname ) return true;
  	return false;
  };
  static isValidTutorDate(date) {
    if ( date ) return true;
  	return false;
  };
  static isValidTutorString(string) {
    if ( string ) return true;
  	return false;
  };

  // adulto
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

  // generale
  static isValidEmail(mail) {
    if ( mail ) {
      if ( mail.length > 0 ) {
        // return validator.validate(mail);
        return true;
      }
    }
    return false;
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
