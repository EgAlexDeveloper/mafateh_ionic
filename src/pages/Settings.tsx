import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCol,
    IonGrid,
    IonRow,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonIcon,
    IonButton,
    IonChip,
} from '@ionic/react';

import React, { FC } from 'react';
import messages from '../assets/messages';

const Settings: FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>{messages.SETTINGS}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen scrollY={true}>
                <IonList>
                    <IonItem>
                        <IonLabel>Medium Toggle</IonLabel>
                        <IonToggle slot="end" checked={true}></IonToggle>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
