
export class  Profile {
	id: string
	field_name: string
	field_surname: string
	field_date_of_birth: Date
	field_tutor_name: string
	field_tutor_surname: string
	field_tutor_date_of_birth: Date
	place_of_birth: string
	age_range: string
	height: string
	body_size: string
	shoe_size: string
	agency: string
	constructor(){
			this.field_date_of_birth= new Date()
			this.field_tutor_date_of_birth= new Date()
	}
	}
