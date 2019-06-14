import { IBizpWebPartProperies } from "../../../common/controls/IBizpWebPartProperties";

export interface IMyReminderProps {
  description: string;
  listName: string;
  fieldNameTitle : string;
  fieldNameDateTime: string;
  webpartProperties:IBizpWebPartProperies;
}
