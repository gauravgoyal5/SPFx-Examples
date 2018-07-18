import { INewsItem } from './NewsRollupWebPart';

export default class MockHttpClient {

    private static _items: INewsItem[] =
    [
      {
        ImageUrl:{
          Url: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-128.png'
        },
        Title: 'Google',
        Byline: 'This is Google news',
        Id: 1
      },
      {
        ImageUrl:{
          Url: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-128.png'
        },
        Title: 'Inbox',
        Byline: 'This is Inbox news',
        Id: 2
      },
      {
        ImageUrl:{
          Url: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-128.png'
        },
        Title: 'Microsoft',
        Byline: 'This is MS news',
        Id: 3
      },
    ];

    public static get(restUrl: string, options?: any): Promise<INewsItem[]> {
    return new Promise<INewsItem[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}