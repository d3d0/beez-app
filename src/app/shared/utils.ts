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

export function action(option1,option2){
	return dialogsModule.action({
		cancelButtonText: "Cancel",
		actions: [option1,option2]
	});
}

export function confirm (message: string) {
	return dialogsModule.confirm({
		title: "",
		message: message,
		okButtonText: "YES",
		cancelButtonText: "NO",
	});
}

export function getIconSource(icon: string): string {
	const iconPrefix = isAndroid ? "res://" : "res://";
	return iconPrefix + icon;
}

export function openLink(link){
	utilsModule.openUrl(link)
}
