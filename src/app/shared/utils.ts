import * as dialogsModule from "ui/dialogs";
import *  as utilsModule from 'tns-core-modules/utils/utils';
import { isAndroid } from "tns-core-modules/platform";

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
export function getIconSource(icon: string): string {
	const iconPrefix = isAndroid ? "res://" : "res://";
	 return iconPrefix + icon;
	}