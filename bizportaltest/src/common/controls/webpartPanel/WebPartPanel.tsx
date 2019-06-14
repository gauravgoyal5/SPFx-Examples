import * as React from 'react';
import styles from './WebPartPanel.module.scss';
import { IWebPartPanel } from './IWebPartPanel';

export class WebPartPanel extends React.Component<IWebPartPanel, {}> {

    public render(): React.ReactElement<IWebPartPanel> {
        let styleName=this.props.panelStyle;
        if(styleName.length==0)
            styleName="panel panel-default";
        else
            styleName="panel "+styleName;

        return (
            <div className={styleName}>
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.webpartTitle} - {styleName}</h3>
                </div>
                <div className="panel-body">
                    Panel content
                    {this.props.children}
                </div>
            </div>
        );
    }
}
