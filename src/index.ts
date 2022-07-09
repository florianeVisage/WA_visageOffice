/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
interface messageToShow {
    deskName: string;
    title: string;
    sentence: string;
}

const messagesToShow: messageToShow[] = [{
    deskName: 'NebulaeOfficeTrigger',
    title: 'NebulaeTitle',
    sentence: `Welcome to Nebulae's office`
},
{
    deskName: 'PulsarOfficeTrigger',
    title: 'PulsarTitle',
    sentence: `Welcome to Pulsar's office`
},
{
    deskName: 'ConstellationOfficeTrigger',
    title: 'ConstellationTitle',
    sentence: `Welcome to Constellation's office`
},
{
    deskName: 'LionelOfficeTrigger',
    title: 'LionelTitle',
    sentence: `Welcome to Lionel's office`
},
{
    deskName: 'SebOfficeTrigger',
    title: 'SebTitle',
    sentence: `Welcome to Seb's cozy office`
},
{
    deskName: 'WarRoomOfficeTrigger',
    title: 'WarRoomTitle',
    sentence: `War Room`
},
{
    deskName: 'FeuEquinoxTrigger',
    title: 'FeuEquinoxTitle',
    sentence: `Old Equinox's office. Under works... Watch your step!`
},
{
    deskName: 'EquinoxGraveTrigger',
    title: 'EquinoxGraveTitle',
    sentence: `R.I.P Equinox office. To our beloved, funny and weird team... You will always be in our hearts, and we will never forget the time we spent together.`
}]

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    // console.log('Player tags: ',WA.player.tags)

    for (const room of messagesToShow) {
        WA.room.onEnterLayer(room.deskName).subscribe(() => {
            currentPopup = WA.ui.openPopup(room.title, room.sentence, [])
        })
        WA.room.onLeaveLayer(room.deskName).subscribe(closePopUp)
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
