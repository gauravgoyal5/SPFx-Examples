import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxJQueryGreetingsWebPartWebPart.module.scss';
import * as strings from 'SpFxJQueryGreetingsWebPartWebPartStrings';
import { Greetings } from './Greetings';
import { IUserInfo } from './IUserInfo';
export interface ISpFxJQueryGreetingsWebPartWebPartProps {
  description: string;
}

export default class SpFxJQueryGreetingsWebPartWebPart extends BaseClientSideWebPart<ISpFxJQueryGreetingsWebPartWebPartProps> {
  protected greetings = new Greetings();
  public render(): void {

    if (this.renderedOnce == true) {
      return;
    }
    this.greetings.getUserName().then((val: IUserInfo) => {
      
      this.domElement.innerHTML = `
      <div class="${ styles.spFxJQueryGreetingsWebPart}">
        <div class="${ styles.container}">
        
          <div class="${ styles.row}">
          
        
            <div class="${ styles.column}">

            <div class="ms-Grid-row">
              <div class="ms-Grid-col ms-sm3">
                <img src="${val.PictureURL}" alt="${val.PreferredName}" height="100" width="100">
              </div>
              <div class="ms-Grid-col ms-sm9">
                <span class="${ styles.title}">${val.TimeGreeting} ${val.FirstName}!</span>
                <p class="${ styles.subTitle}">${val.WelcomeGreeting}</p>
              </div>
            </div>    


              
              
              
          </div>
        </div>
      </div>`;
    });


  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
