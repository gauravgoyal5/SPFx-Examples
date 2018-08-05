import * as angular from 'angular';

export class ReminderController
{
    public orderBy = 'BizpReminderDate';
    public reverse = true;
    public webPartFilterName = 'My Reminders'; //Added by Gourav Bagora for "Help option" on 12/15/16
    public orderByAllView = 'BizpReminderDate';
    public reverseAllView = true;
    public listName = 'BizpReminders';
    public ControllerDivId = 'reminderControllerDiv';  // Div id of ng-contorller for reminder
    public ManageKendoWindowID = "manageAllReminders";     // Div id for manageAllReminder k-window modal
    public ManageReminderKendoWindowID = 'manageReminders'; // Div id for manageReminders k-window modal
    public GlobalMessages = GlobalMessages ;
    public isRemProcess = false; //bysheetal

    public searchText = '';
    //public showDeleteButton=false;
    public GlobalSettings = [];
    public NoOfRecsToShowInWebPart = 10;
    public validDate = true;
    public IsSave = true;

    constructor()
    {

    }

    ConvertDateTimeWithServerZone=(dDate) : Date => {
        if (dDate != undefined) {
            //return BizCommonFactoryService.ConvertLocalTOServerDate(dDate, "MM/DD/YYYY HH:mm");
            return new Date();
        }
    }
}