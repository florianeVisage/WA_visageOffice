/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
const deskNames: string[] = ['Nebulae', 'Equinox', 'Pulsar', 'Lionel']

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    WA.chat.sendChatMessage('Hello world', 'Mr Robot');

    
    for (const name of deskNames) {
        WA.room.onEnterLayer(name + 'OfficeTrigger').subscribe(() => {
            currentPopup = WA.ui.openPopup(name+'Title', `Welcome to ${name} office`, [])
        })

        WA.room.onLeaveLayer(name + 'OfficeTrigger').subscribe(closePopUp)
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
    
}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
