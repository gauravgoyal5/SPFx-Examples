
import { IGreeting } from './IGreeting';
import { sp } from "@pnp/sp";

export class GreetingService {

    constructor() { }
  
    public getCurrentUserInformation(): Promise<IGreeting> {
  
      var promise = new Promise<IGreeting>((resolve, reject) => {
        var ig = {} as IGreeting;
        sp.web.select('Title').get().then(w => {
          ig.webSiteTitle = w.Title;
          //console.log('Title ', ig.webSiteTitle);
          //const currentUser = await sp.profiles.myProperties.get();
          //var userProperties = currentUser.UserProfileProperties;
  
          sp.profiles.myProperties.get().then(data => {
            data.UserProfileProperties.forEach((property) => {
              //console.log('Key : ', property.Key, ' Value : ', property.Value, ' Prop : ', property)
              if (property.Key == "Title") {
                ig.userJobTitle = property.Value;
                //console.log(ig.userJobTitle);
              }
              else if (property.Key == "PictureURL") {
                ig.userImageUrl = property.Value;
                ig.userImageUrl=ig.userImageUrl.replace('MThumb','LThumb');
                
                //console.log(ig.userImageUrl);
              }
              else if (property.Key == "PreferredName") {
                ig.userName = property.Value;
                //console.log(ig.userName);
              }
            });
            resolve(ig);
          });
        });
      });
      return promise;
  
    }
  }
  