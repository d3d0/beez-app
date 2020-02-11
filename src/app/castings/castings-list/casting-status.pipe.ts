import { Pipe, PipeTransform } from "@angular/core";

import { Casting } from "../casting.model";

@Pipe({
  name: "castingStatus"
})
export class CastingStatusPipe implements PipeTransform {
  value: Array<Casting> = [];
  transform(items: Array<Casting>, castingType: string) {
    // if (items instanceof Array)
    {
      switch(castingType) {
        case "New":
        this.value = items.filter((casting: Casting) => {
          return (casting.status === "New" || casting.status === "Archivio" || casting.status === "empty" );
        });
        break

        case "Audition":
        this.value = items.filter((casting: Casting) => {
          return casting.status === "Audition";
        });
        break

        case "Close":
        this.value = items.filter((casting: Casting) => {
          return casting.status === "Close";
        });
        break

      }
    }
    // se vuoto ritorno lista vuota con un elemento per il layout di default
    if(this.value.length<1) return [{id:null,status:castingType}]
    return this.value;
  }
}
