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
          case "ongoing":
            this.value = items.filter((casting: Casting) => {
              return casting.closed === false;
            });
            break
          case "attend":
            this.value = items.filter((casting: Casting) => {
              return casting.closed === true && casting.to_attend === true ;
            });
            break

          case "concluded":
            this.value = items.filter((casting: Casting) => {
              return casting.closed === true && casting.active === false && casting.to_attend === false;
            });
            break

      }
    }
    return this.value;
  }
}
