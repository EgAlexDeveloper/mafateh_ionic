import { IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon } from '@ionic/react';
import { arrowRedo } from 'ionicons/icons';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
    title: string,
    hideSettings?: boolean,
    hasBack?: boolean,
    backRoute?: string
}

const Header: FC<Props> = (props: Props) => {
    const history = useHistory();

    return (
        <IonHeader>
            <IonToolbar>
                {/* {
                    !props.hideSettings &&
                    <IonButtons slot="end">
                        <IonButton onClick={() => history.replace('/settings')}>
                            <IonIcon size='small' color="dark" slot="icon-only" icon={settingsSharp} />
                        </IonButton>
                    </IonButtons>
                } */}

                <IonTitle color="dark">{props.title}</IonTitle>

                {
                    props.hasBack &&
                    <IonButtons slot="start">
                        <IonIcon color="dark" onClick={() => history.replace(props.backRoute!)} icon={arrowRedo} />
                    </IonButtons>
                }
            </IonToolbar>

        </IonHeader>
    );
};

export default Header;
