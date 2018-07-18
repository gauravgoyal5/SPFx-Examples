import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import { Version,Environment,EnvironmentType } from '@microsoft/sp-core-library';

import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NewsRollupWebPart.module.scss';
import * as strings from 'NewsRollupWebPartStrings';
import { INewsRollupWebPartProps } from './INewsRollupWebPartProps';
import MockHttpClient from './MockHttpClient';
import { SPHttpClientResponse , HttpClientConfiguration,HttpClient,HttpClientResponse,ISPHttpClientOptions, IHttpClientOptions, SPHttpClient } from '@microsoft/sp-http';


export interface INewsItems {
  value: INewsItem[];
}

export interface INewsItem {
  ImageUrl: any;
  Title: string;
  Byline: string;
  Id: number;
}

export interface INewsRollupWebPartProps {
  description: string;
}

export default class NewsRollupWebPart extends BaseClientSideWebPart<INewsRollupWebPartProps> {

  private _getMockListData(): Promise<INewsItems> {
    return MockHttpClient.get(this.context.pageContext.web.absoluteUrl)
        .then((data: INewsItem[]) => {
             var listData: INewsItems = { value: data };
             return listData;
         }) as Promise<INewsItems>;
  }

  private _getListData(): Promise<INewsItems> {
    const httpClientOptions: IHttpClientOptions = {
      body: '',
  };
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/lists/getbytitle('News')/items?$select=Id,ImageUrl,Title,Byline`,SPHttpClient.configurations.v1)
          .then((response: any) => {
            return response.json();
          });
  }

  private _renderNewsAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
        this._getMockListData().then((response) => {
        this._renderNews(response.value);
        }); }
        else {
        this._getListData()
        .then((response) => {
            this._renderNews(response.value);
        });
    }
  }

  private _renderNews(items: INewsItem[]): void {
    let html: string = '';
    items.forEach((item: INewsItem, index: number) => {
        console.log(index);
        if((index+1) <= this.properties.items)
        {
          //html += `
              //<li class="ms-ListItem">
                  //<span class="ms-ListItem-primaryText">${item.Title}</span>
                  //<img class="${styles.newsImage}" src="${item.ImageUrl.Url}" />
              //</li>`;
          html += `<div class="ms-Persona">
                      <div class="ms-Persona-imageArea ${styles.noBorderRadius}">
                          <img class="ms-Persona-image ${styles.noBorderRadius}" src="${item.ImageUrl.Url}">
                      </div>
                      <div class="ms-Persona-details">

                          <div class="ms-Persona-primaryText">${item.Title}</div>
                          <div class="ms-Persona-secondaryText">${item.Byline}</div>
                      </div>
                    </div>
                    <br/>`;
        }
    });

    const newsItemsHolder: Element = this.domElement.querySelector('#newsItems');
    newsItemsHolder.innerHTML = html;
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.newsRollup}">
        <div class="${styles.container}">
          <p class="ms-font-l ms-fontColor-black">${this.properties.description}</p>
          <div id="newsItems" />
          </div>
        </div>
      </div>`;
      this._renderNewsAsync();
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
                }),
                PropertyPaneSlider('items', {
                  label: 'Number of items',
                  min: 1,
                  max: 10
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
