import { IMyReminder } from "./IMyReminder";

export interface IMyReminderState
{
    allMyReminders :IMyReminder[];
    activeMyReminders :IMyReminder[];
    hasRecords:boolean;
    loading:boolean;
}