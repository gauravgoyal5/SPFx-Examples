import * as React from 'react';
import styles from './MyReminder.module.scss';
import { IMyReminderProps } from './IMyReminderProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { Panel } from '../../../common/controls/panel/Panel';
import { MyRemindersService } from './MyReminderService';
import { IMyReminder } from './IMyReminder';
import { registerBackButtonHandler } from '@microsoft/teams-js';
import { IMyReminderState } from './IMyReminderState';

export default class MyReminder extends React.Component<IMyReminderProps, IMyReminderState> {

  private myReminders: IMyReminder[] = [];

  constructor(props: IMyReminderProps) {
    super(props);

    this.state = {
      allMyReminders: [],
      activeMyReminders: [],
      hasRecords: false,
      loading: true,
    };
  }

  public componentDidMount(): void {
    try {

      let a = new MyRemindersService();
      a.generateMockData().then(response => {
        this.myReminders = response;
        this.setState({
          allMyReminders: response,
          activeMyReminders: response,
          hasRecords: (response.length > 0),
          loading: false
        });
        console.log(response);
      });

    }
    catch (erro) {
      console.error(erro);
    }
  }

  public render(): React.ReactElement<IMyReminderProps> {

    let userMessage;
    if (!this.state.hasRecords) {
      userMessage = (
        <span>
          <h1> Sorry </h1>
          <h2>
            No record found for you.
          </h2></span>
      );
    }
    else {
      userMessage = (
        this.state.activeMyReminders.map(val => {
          return (
            <div className="ms-Grid-row" key={val.Id.toString()}>
              <div className="ms-Grid-col ms-lg6">{val.Title}</div>
              <div className="ms-Grid-col ms-lg6">{val.ReminderDate.toDateString()}</div>
            </div>
          );
        })
      );
    }

    return (
      <div className={styles.myReminder} >
        <Panel webpartTitle={this.props.webpartProperties.webpartTitle}
          id={this.props.webpartProperties.webpartId}
          webpartIcon={this.props.webpartProperties.webpartIcon}>
          <div className="ms-Grid">
            {userMessage}
          </div>
        </Panel>


      </div>
    );
  }
}
