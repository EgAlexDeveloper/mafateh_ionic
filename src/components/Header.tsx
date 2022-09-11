import {  IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/react';
import { settingsSharp } from 'ionicons/icons';
import { FC } from 'react';

type Props = {
    title: string,
    hasSettings?: boolean,
    hasBack?: boolean
}

const Header: FC<Props> = (props: Props) => {
    return (
        <IonHeader>
            <IonToolbar>
                {
                    props.hasSettings &&
                    <IonButtons slot="secondary">
                        <IonButton>
                            <IonIcon slot="icon-only" icon={settingsSharp} />
                        </IonButton>
                    </IonButtons>
                }
                
                {
                    props.hasBack &&
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                }
                
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>

        </IonHeader>
    );
};

export default Header;
