import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version , Environment} from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'GreetingsWebPartStrings';
import Greetings from './components/Greetings';
import { IGreetingsProps } from './components/IGreetingsProps';

export interface IGreetingsWebPartProps {
  description: string;
}

export default class GreetingsWebPart extends BaseClientSideWebPart<IGreetingsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGreetingsProps > = React.createElement(
      Greetings,
      {
        context: this.context,
        displayMode: this.displayMode,
        environment: Environment.type,
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
