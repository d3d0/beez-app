import { Pipe, PipeTransform } from "@angular/core";
import { TaxonomyService } from "./taxonomy.service"
@Pipe({
  name: "taxonomyNameValue"
})
export class TaxonomyNameValuePipe implements PipeTransform {
  constructor(private taxonomyService:TaxonomyService){}
  value: string
  transform( tid: string ) {
    return this.taxonomyService.getNameValue(tid)	;
  }
}
