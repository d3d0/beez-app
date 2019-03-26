import { Pipe, PipeTransform } from "@angular/core";
import { TaxonomyService } from "./taxonomy.service"
@Pipe({
	name: "taxonomyVocabolary"
})
export class TaxonomyVocabolaryPipe implements PipeTransform {
	constructor(private taxonomyService:TaxonomyService){}
	transform(items, dictionary: string) {

		let vid = 'this.taxonomyService.getVId(dictionary)'
		if (vid){
		let result = items
		return result
		}
		return items
	}
}
