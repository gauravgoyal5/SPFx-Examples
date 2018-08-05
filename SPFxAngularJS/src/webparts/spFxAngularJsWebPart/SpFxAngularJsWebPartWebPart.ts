import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './SpFxAngularJsWebPartWebPart.module.scss';
import * as strings from 'SpFxAngularJsWebPartWebPartStrings';
import * as angular from 'angular';
import {HomeController} from "./app/HomeController";

export interface ISpFxAngularJsWebPartWebPartProps {
  description: string;
}

export default class SpFxAngularJsWebPartWebPart extends BaseClientSideWebPart<ISpFxAngularJsWebPartWebPartProps> {

  constructor()
  {
    super();
    let cssUrl = 'https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
    SPComponentLoader.loadCss(cssUrl);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }
  public render(): void {
    if(this.renderedOnce== true)
    {
      return;
    }
    let html=require("./app/Tmplate.html");
    angular.module('apptest',[]).controller('HomeController', HomeController);
    
    

    this.domElement.innerHTML = `
    ${html}
            
    `;
    angular.bootstrap(this.domElement, ['apptest']);
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
