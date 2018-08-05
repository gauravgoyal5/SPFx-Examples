import { Version } from '@microsoft/sp-core-library';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SpFxMarqueeWebPartWebPart.module.scss';
import * as strings from 'SpFxMarqueeWebPartWebPartStrings';

export interface ISpFxMarqueeWebPartWebPartProps {
  description: string;
  FieldBehavior: string;
  FieldBgcolor: string;
  FieldDirection: string;
  FieldWidth: string;
  FieldHeight: string;
  FieldLoop: string;
  FieldScrollAmount: number;
  FieldScrollDelay: number;
  FieldHSpace: string;
  FieldVSpace: string;
  FieldSiteUrl: string;
  FieldListName: string;
  FieldFieldNameToDisplay: string;
  FieldWebPartTitle: string;
}

import { sp, Web, List, Fields } from "@pnp/sp";

export default class SpFxMarqueeWebPartWebPart extends BaseClientSideWebPart<ISpFxMarqueeWebPartWebPartProps> {

  protected marqueeTag: string;
  protected webpartTitleTag: string;
  public render(): void {

    if (this.renderedOnce) {
      return;
    }


    this.marqueeTag = "<marquee behavior='" + this.properties.FieldBehavior + "' direction='" + this.properties.FieldDirection + "' ";
    if (this.properties.FieldBgcolor.trim().length > 0) {
      this.marqueeTag = this.marqueeTag + " bgcolor='" + this.properties.FieldBgcolor + "' ";
    }

    if (this.properties.FieldHeight.trim().length > 0) {
      this.marqueeTag = this.marqueeTag + " height='" + this.properties.FieldHeight + "' ";
    }

    if (this.properties.FieldHSpace.trim().length > 0) {
      this.marqueeTag = this.marqueeTag + " hspace='" + this.properties.FieldHSpace + "' ";
    }

    if (this.properties.FieldLoop.trim().length > 0) {
      this.marqueeTag = this.marqueeTag + " loop='" + this.properties.FieldLoop + "' ";
    }

    if (this.properties.FieldScrollAmount > 0) {
      this.marqueeTag = this.marqueeTag + " scrollamount='" + this.properties.FieldScrollAmount + "' ";
    }

    if (this.properties.FieldScrollDelay > 0) {
      this.marqueeTag = this.marqueeTag + " scrolldelay='" + this.properties.FieldScrollDelay + "' ";
    }

    if (this.properties.FieldVSpace.trim().length > 0) {
      this.marqueeTag = this.marqueeTag + " vspace='" + this.properties.FieldVSpace + "' ";
    }

    this.marqueeTag = this.marqueeTag + ">";
    if (Environment.type == EnvironmentType.ClassicSharePoint || Environment.type == EnvironmentType.SharePoint) {
      this.go(true).then((val) => {
        console.log(val);
        this.marqueeTag = this.marqueeTag + val;
        this.marqueeTag = this.marqueeTag + "</marquee>";

        if (this.properties.FieldWebPartTitle != undefined || this.properties.FieldWebPartTitle.trim().length > 0) {
          this.webpartTitleTag = `<span class="${styles.title}">${this.properties.FieldWebPartTitle}</span>`;
        }

        this.domElement.innerHTML = `
      <div class="${ styles.spFxMarqueeWebPart}">
      
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div >
              ${this.webpartTitleTag}
              <p class="${ styles.subTitle}">${this.marqueeTag}</p>
            </div>
          </div>
        </div>
      </div>`;
      });
    }


  }



  protected go(isWorking: boolean): Promise<string> {
    return new Promise((resolve) => {


      let htmlTemplate: string = '';
      let foundRecords: boolean = false;
      let web = sp.web.lists.getByTitle(this.properties.FieldListName).select(this.properties.FieldFieldNameToDisplay).items.orderBy(this.properties.FieldFieldNameToDisplay, true).top(4999).getAll().then((item: any) => {
        if (item.length > 0) {
          foundRecords = true;
        }
        for (let i = 0; i < item.length; i++) {
          //console.log(item[i][this.properties.FieldFieldNameToDisplay]);
          htmlTemplate = htmlTemplate + `<i class="ms-Icon ms-Icon--AutoEnhanceOn" aria-hidden="true">&nbsp;</i>${item[i][this.properties.FieldFieldNameToDisplay]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        }
        resolve(htmlTemplate);
      });


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
              groupName: "Record Information",
              groupFields: [
                PropertyPaneTextField('FieldSiteUrl', {
                  label: strings.FieldLabelSiteUrl,
                  onGetErrorMessage: this.textBoxValidationMethod,
                  validateOnFocusIn: true,
                  validateOnFocusOut: true,
                  deferredValidationTime: 1000
                }),
                PropertyPaneTextField('FieldListName', {
                  label: strings.FieldLabelListName,
                  onGetErrorMessage: this.textBoxValidationMethod,
                  validateOnFocusIn: true,
                  validateOnFocusOut: true,
                  deferredValidationTime: 1000
                }),
                PropertyPaneTextField('FieldFieldNameToDisplay', {
                  label: strings.FieldLabelFieldNameToDisplay,
                  onGetErrorMessage: this.textBoxValidationMethod,
                  validateOnFocusIn: true,
                  validateOnFocusOut: true,
                  deferredValidationTime: 1000
                }),
                PropertyPaneTextField('FieldWebPartTitle', {
                  label: strings.FieldLabelWebPartTitle

                }),
              ]
            }
          ]
        },
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [

            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('FieldBehavior', {
                  label: strings.FieldLabelBehavior,
                  options: [
                    { key: 'slide', text: 'Slide' },
                    { key: 'scroll', text: 'Scroll' },
                    { key: 'alternate', text: 'Alternate' }
                  ]
                }),
                PropertyPaneTextField('FieldBgcolor', {
                  label: strings.FieldLabelBgcolor
                }),
                PropertyPaneDropdown('FieldDirection', {
                  label: strings.FieldLabelDirection,
                  options: [
                    { key: 'left', text: 'Left' },
                    { key: 'right', text: 'Right' },
                    { key: 'up', text: 'Up' },
                    { key: 'down', text: 'Down' }
                  ]
                }),
                PropertyPaneTextField('FieldWidth', {
                  label: strings.FieldLabelWidth
                }),
                PropertyPaneTextField('FieldHeight', {
                  label: strings.FieldLabelHeight
                }),
                PropertyPaneTextField('FieldLoop', {
                  label: strings.FieldLabelLoop
                }),
                PropertyPaneTextField('FieldHSpace', {
                  label: strings.FieldLabelHSpace
                }),
                PropertyPaneTextField('FieldVSpace', {
                  label: strings.FieldLabelVSpace
                }),
                PropertyPaneSlider("FieldScrollAmount", {
                  label: strings.FieldLabelScrollAmount,
                  max: 1000,
                  min: 0,
                  showValue: true,
                  step: 1,
                  value: 1
                }),
                PropertyPaneSlider("FieldScrollDelay", {
                  disabled: false,
                  label: strings.FieldLabelScrollDelay,
                  max: 1000,
                  min: 0,
                  showValue: true,
                  step: 1,
                  value: 1
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
