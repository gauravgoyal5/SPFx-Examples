
//import { IGreeting } from './IGreeting';
import { sp, Web } from "@pnp/sp";
import { IMyReminder } from "./IMyReminder";
import { escape } from '@microsoft/sp-lodash-subset';


export class MyRemindersService {

  private listName: string;
  private fieldNameTitle: string;
  private fieldNameDateTime: string;

    constructor() { }

    public generateMockData = () :Promise<IMyReminder[]> =>{
      let items: IMyReminder[]=[
        {
          Id: 1,
          Title: "My Reminder Title 1",
          Description:"My Reminder description 1",
          ReminderDate:new Date()
        },
        {
          Id: 2,
          Title: "My Reminder Title 2",
          Description:"My Reminder description 2",
          ReminderDate:new Date()
        },
        {
          Id: 3,
          Title: "My Reminder Title 3",
          Description:"My Reminder description 3",
          ReminderDate:new Date()
        },
        {
          Id: 4,
          Title: "My Reminder Title 4",
          Description:"My Reminder description 4",
          ReminderDate:new Date()
        },
        {
          Id: 5,
          Title: "My Reminder Title 5",
          Description:"My Reminder description 5",
          ReminderDate:new Date()
        },
        {
          Id: 6,
          Title: "My Reminder Title 6",
          Description:"My Reminder description 6",
          ReminderDate:new Date()
        },
        {
          Id: 7,
          Title: "My Reminder Title 7",
          Description:"My Reminder description 7",
          ReminderDate:new Date()
        },
        {
          Id: 8,
          Title: "My Reminder Title 8",
          Description:"My Reminder description 8",
          ReminderDate:new Date()
        },
        {
          Id: 9,
          Title: "My Reminder Title 9",
          Description:"My Reminder description 9",
          ReminderDate:new Date()
        },
        {
          Id: 10,
          Title: "My Reminder Title 10",
          Description:"My Reminder description 10",
          ReminderDate:new Date()
        }
      ];

      return new Promise<IMyReminder[]>((resolve) => {
        setTimeout(() => {
            resolve(items);
        }, 10);
    });
    }

    // public getAllReminders = ():Promise<IMyReminder[]> =>{

    // }
  }
  