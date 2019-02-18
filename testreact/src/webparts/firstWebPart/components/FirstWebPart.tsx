//For Bootstrap Example : https://github.com/StfBauer/spfx-autorenaming-styles/tree/master/src/webparts/bootstrapWebPart


require('./FirstWebPart.scss');

import * as React from 'react';
//import styles from './FirstWebPart.module.scss';
import { IFirstWebPartProps } from './IFirstWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SpinnerControl } from '../../../common/controls/spinner/Spinner';
import { WebPartPanel } from '../../../common/controls/webpartPanel/WebPartPanel';

export default class FirstWebPart extends React.Component<IFirstWebPartProps, {}> {
  public render(): React.ReactElement<IFirstWebPartProps> {
    return (
      <div className="firstWebPart">
      <h1>Hi</h1>
        <SpinnerControl description="test"></SpinnerControl>
        <WebPartPanel webpartTitle="test" id="test" panelStyle="panel-primary">
          <h1>
            This is test
          </h1>
          <h2>
            asfsafsad
          </h2>
        </WebPartPanel>

      </div>
    );
  }
}
