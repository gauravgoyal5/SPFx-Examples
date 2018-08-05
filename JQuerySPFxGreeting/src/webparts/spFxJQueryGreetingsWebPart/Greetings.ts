import { sp } from "@pnp/sp";
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

import { IUserInfo } from "./IUserInfo";

export class Greetings {
    public async getUserName(): Promise<IUserInfo> {
        let userInfo={AccountName:'',FirstName:'',LastName:'',PictureURL:'',WorkEmail:'',PreferredName:'',UserName:'',TimeGreeting:'',WelcomeGreeting:''};
            
        let date=new Date();
        if(date.getHours()<=12)
        {
            userInfo.TimeGreeting="Good Morning";
        }else if(date.getHours()>12 && date.getHours()<=5)
        {
            userInfo.TimeGreeting="Good Afternood";
        }
        else if(date.getHours()>5 && date.getHours()<=24)
        {
            userInfo.TimeGreeting="Good Evening";
        }

        if (Environment.type === EnvironmentType.ClassicSharePoint || Environment.type === EnvironmentType.SharePoint) {
            const r = await sp.profiles.myProperties.get();
            
            userInfo.AccountName=r.UserProfileProperties[3].Value;
            userInfo.FirstName=r.UserProfileProperties[4].Value;
            userInfo.LastName=r.UserProfileProperties[6].Value;
            userInfo.PictureURL=r.UserProfileProperties[17].Value;
            userInfo.WorkEmail=r.UserProfileProperties[57].Value;
            userInfo.PreferredName=r.UserProfileProperties[8].Value;
            userInfo.UserName=r.UserProfileProperties[18].Value;

            const web=await sp.web.get();
            userInfo.WelcomeGreeting=`Welcome to ${web.Title}`;
            userInfo.PictureURL=`/_layouts/15/userphoto.aspx?size=l&${userInfo.UserName}`;
        }
        return userInfo;
    }
}

