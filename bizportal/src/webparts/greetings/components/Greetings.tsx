import * as React from 'react';
import styles from './Greetings.module.scss';
import { IGreetingsProps } from './IGreetingsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { GreetingService } from './GreetingsService';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export default class Greetings extends React.Component<IGreetingsProps, {}> {
  public userName: string = "";
  public userJobTitle: string = "";
  public webSiteTitle: string = "";
  public welComeMessage: string = "";
  public userImageUrl: string = "";

  public greetingMessage: string = "";
  public prefixWelcomeMessage: string = "Welcome to ";

  constructor(props, private greetingService: GreetingService) {
    super(props);
    if ((new Date()).getHours() > 0 && (new Date()).getHours() < 12)
      this.greetingMessage = "Good Morning ";
    else if ((new Date()).getHours() >= 12 && (new Date()).getHours() <= 5)
      this.greetingMessage = "Good Afternoon ";
    else if ((new Date()).getHours() > 5)
      this.greetingMessage = "Good Evening ";

    if (this.props.environment === EnvironmentType.Local) {
      this.webSiteTitle = this.prefixWelcomeMessage + "Test Site";
      this.userImageUrl = "https://miro.medium.com/max/2400/1*vmWLIgxv98WCdZ1yKkiNeA.jpeg";
      this.userName = "Gaurav Goyal";
      this.userJobTitle = "PA";
    } 
    else if (this.props.environment === EnvironmentType.Test) {
      this.webSiteTitle = this.prefixWelcomeMessage + "Test Site";
      this.userImageUrl = "https://miro.medium.com/max/2400/1*vmWLIgxv98WCdZ1yKkiNeA.jpeg";
      this.userName = "Gaurav Goyal";
      this.userJobTitle = "PA";
    }
    else if (this.props.environment === EnvironmentType.ClassicSharePoint || this.props.environment === EnvironmentType.SharePoint) {
      this.getCurrentUserInformation();
    }
  }

  // componentDidMount() {

  //   this.getCurrentUserInformation();
  // }

  public getCurrentUserInformation() {

    this.greetingService.getCurrentUserInformation().then(ig => {
      this.webSiteTitle = this.prefixWelcomeMessage + ig.webSiteTitle;
      this.userImageUrl = ig.userImageUrl;
      this.userName = ig.userName;
      this.userJobTitle = ig.userJobTitle;

      console.log(this.webSiteTitle);
      console.log(this.userImageUrl);
      console.log(this.userJobTitle);
      console.log(this.userName);
    });
  }

  public render(): React.ReactElement<IGreetingsProps> {
    return (
      
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.emailSignature}>
                <div className={styles.signatureImg}>
                  <img src={this.userImageUrl} alt="" />
                </div>
                <div className={styles.signatureDetails}>
                  <h3 className={styles.title}>{this.userName}</h3>
                  <span className={styles.post}>{this.userJobTitle}</span>
                </div>
                <ul className={styles.signatureContent}>
                  <li><span className="fas fa-map-marker-alt"></span> {this.greetingMessage}</li>
                  <li><span className="fas fa-envelope"></span> {this.webSiteTitle}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

    );
  }
}
