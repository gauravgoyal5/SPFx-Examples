import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode,Environment,EnvironmentType } from "@microsoft/sp-core-library";


export interface IGreetingsProps {
  displayMode: DisplayMode;
  context: WebPartContext;
  environment:EnvironmentType;
}


