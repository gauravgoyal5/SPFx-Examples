import { Version } from '@microsoft/sp-core-library';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JQueryAccordionWebPartWebPart.module.scss';
import * as strings from 'JQueryAccordionWebPartWebPartStrings';

//Gaurav : Importing JQuery & JQuery UI related files
import * as jQuery from 'jquery';
import 'jqueryui';

import { sp, Web, List, Fields } from "@pnp/sp";

//Gaurav : To load CSS dynamically
import { SPComponentLoader } from '@microsoft/sp-loader';

//Added custom properties here , loc/en-js, loc/mystring, JQueryAccordionWebPartWebPart.manifest.json
export interface IJQueryAccordionWebPartWebPartProps {
  description: string;
  listName: string;
  fieldForTitle: string;
  fieldForDesc: string;
}

export default class JQueryAccordionWebPartWebPart extends BaseClientSideWebPart<IJQueryAccordionWebPartWebPartProps> {

  //Gaurav : creating constructor to load jquery ui css
  public constructor() {
    super();
    SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  }

  public render(): void {
    if (this.renderedOnce) {
      return;
    }
    if (Environment.type == EnvironmentType.ClassicSharePoint || Environment.type == EnvironmentType.SharePoint) {
      this.generateAccordion();
    }
    else {
      let tabData = this.accordingTab('Section 1', 'Section Data');
      tabData += this.accordingTab('Section 2', 'Section Data');
      tabData += this.accordingTab('Section 3', 'Section Data');
      tabData += this.accordingTab('Section 4', 'Section Data');
      tabData += this.accordingTab('Section 5', 'Section Data');
      tabData += this.accordingTab('Section 6', 'Section Data');
      tabData += this.accordingTab('Section 7', 'Section Data');
      tabData += this.accordingTab('Section 8', 'Section Data');
      tabData += this.accordingTab('Section 9', 'Section Data');
      tabData += this.accordingTab('Section 10', 'Section Data');

      this.domElement.innerHTML = this.accordingRoot(tabData);
      const accordionOptions: JQueryUI.AccordionOptions = {
        animate: true,
        collapsible: false,
        icons: {
          header: 'ui-icon-circle-arrow-e',
          activeHeader: 'ui-icon-circle-arrow-s'
        }
      };
  
      jQuery('.accordion', this.domElement).accordion(accordionOptions);
    }


    
  }

  accordingRoot = (data: string): string => {
    let root: string = '';
    root = `
    <div class="accordion">
      ${data}
    </div>
    `;
    return root;
  }

  accordingTab = (title: string, desc: string): string => {
    let tabData: string = `
        <h3>${title}</h3>
        <div>
            <p>
            ${desc}
            </p>
        </div>
    `;
    return tabData;
  }

  generateAccordion = () => {
    let htmlTemplate:string='';
    let foundRecords:boolean=false;
    let web = sp.web.lists.getByTitle(this.properties.listName).select(this.properties.fieldForTitle, this.properties.fieldForDesc).items.orderBy(this.properties.fieldForTitle, true).top(4999).getAll().then((item: any) => {
      if(item.length>0 )
      {
        foundRecords=true;
      }
      for(let i=0; i<item.length; i++)
      {
        console.log(item[i].Title);
        htmlTemplate+=this.accordingTab(item[i].Title,item[i].Desc);
      }
      this.domElement.innerHTML= this.accordingRoot(htmlTemplate);
      const accordionOptions: JQueryUI.AccordionOptions = {
        animate: true,
        collapsible: false,
        icons: {
          header: 'ui-icon-circle-arrow-e',
          activeHeader: 'ui-icon-circle-arrow-s'
        }
      };
  
      jQuery('.accordion', this.domElement).accordion(accordionOptions);
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private textBoxValidationMethod(value: string): string {
    if (value.trim().length <= 0) {
      return "This field can't be blank.";
    } else {
      return "";
    }
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
                PropertyPaneTextField('listName', {
                  label: strings.FieldLabelListName,
                  onGetErrorMessage: this.textBoxValidationMethod,
                  validateOnFocusIn: true,
                  validateOnFocusOut: true,
                  deferredValidationTime: 1000
                }),
                PropertyPaneTextField('fieldForTitle', {
                  label: strings.FieldLabelTitleFieldName,
                  onGetErrorMessage: this.textBoxValidationMethod,
                  validateOnFocusIn: true,
                  validateOnFocusOut: true,
                  deferredValidationTime: 1000
                }),
                PropertyPaneTextField('fieldForDesc', {
                  label: strings.FieldLabelDescFieldName,
                  onGetErrorMessage: this.textBoxValidationMethod,
                  validateOnFocusIn: true,
                  validateOnFocusOut: true,
                  deferredValidationTime: 1000
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
