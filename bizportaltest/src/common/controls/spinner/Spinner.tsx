import * as React from 'react';
import styles from './spinner.module.scss';
import { ISpinnerProps } from './IspinnerProps';

export class SpinnerControl extends React.Component<ISpinnerProps, {}> {
    public render(): React.ReactElement<ISpinnerProps> {
        return (
            <div className={styles.container}>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        );
    }
}
