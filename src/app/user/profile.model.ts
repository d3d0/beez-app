export class  Profile {
	id: string
	name: string
	surname: string
	date_of_birth: Date
	tutor_name: string
	tutor_surname: string
	tutor_date_of_birth: Date
	place_of_birth: string
	age_range: string
	height: string
	body_size: string
	shoe_size: string
	agency: string
	
	constructor(){
			this.date_of_birth= new Date()
			this.tutor_date_of_birth= new Date()
	}
}
