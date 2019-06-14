declare interface IGreetingsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'GreetingsWebPartStrings' {
  const strings: IGreetingsWebPartStrings;
  export = strings;
}
