import * as React from 'react';
import styles from './Panel.module.scss';
import { IPanel } from './IPanel';
import { escape } from '@microsoft/sp-lodash-subset';

export class Panel extends React.Component<IPanel, {}> {

    public render(): React.ReactElement<IPanel> {

        return (
            <div className={styles.Panel} >
                <div className={styles.container} >
                    <div className="ms-Grid">
                        <div className={styles.rowPanelHeader}>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                                <h3 className={styles.headerTitle}>
                                    {/* <span className={this.props.webpartIcon}></span> */}
                                    <i className={`ms-Icon ms-Icon--${this.props.webpartIcon} ${styles.webpartIcon} `} aria-hidden="true">&nbsp;</i>
                                    {this.props.webpartTitle}
                                </h3>
                            </div>
                        </div>

                        <div className={styles.rowPanelBody}>
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}
