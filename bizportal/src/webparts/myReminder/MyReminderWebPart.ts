import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'MyReminderWebPartStrings';
import MyReminder from './components/MyReminder';
import { IMyReminderProps } from './components/IMyReminderProps';
import {IBizpWebPartProperies} from'../../common/controls/IBizpWebPartProperties';

export interface IMyReminderWebPartProps {
  description: string;
  listName: string;
  fieldNameTitle : string;
  fieldNameDateTime: string;
  webpartProperties:IBizpWebPartProperies;
}

export default class MyReminderWebPart extends BaseClientSideWebPart<IMyReminderWebPartProps> {

  public render(): void {
    let webpartProperties:IBizpWebPartProperies ={
      webpartDescription:"",
      webpartIcon:"Pin",
      webpartId:"webpartId_MyReminders",
      webpartTitle:"My Reminders",
    };

    const element: React.ReactElement<IMyReminderProps > = React.createElement(
      MyReminder,
      {
        description: this.properties.description,
        listName: this.properties.listName,
        fieldNameTitle: this.properties.fieldNameTitle,
        fieldNameDateTime: this.properties.fieldNameDateTime,
        webpartProperties: webpartProperties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
