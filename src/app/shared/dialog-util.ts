import * as dialogsModule from "ui/dialogs";
import *  as utilsModule from 'tns-core-modules/utils/utils';

export function alert(message: string) {
  return dialogsModule.alert({
    title: "",
    okButtonText: "OK",
    message: message
  });
}


export function openLink(link){
    utilsModule.openUrl(link)
  }