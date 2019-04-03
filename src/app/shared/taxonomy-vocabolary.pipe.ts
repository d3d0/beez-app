import { Pipe, PipeTransform } from "@angular/core";
import { TaxonomyService } from "./taxonomy.service"
@Pipe({
	name: "taxonomyName"
})
export class TaxonomyVocabolaryPipe implements PipeTransform {
	constructor(private taxonomyService:TaxonomyService){}
	transform(items, tid: string) {
		return items.filter(val => val.tid == tid)[0].name
	}
}
