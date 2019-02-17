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
          return casting.status === "New";
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
    return this.value;
  }
}
