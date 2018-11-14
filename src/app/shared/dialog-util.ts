import * as dialogsModule from "ui/dialogs";

export function alert(message: string) {
  return dialogsModule.alert({
    title: "BEEZ CASTING HUB",
    okButtonText: "OK",
    message: message
  });
}
