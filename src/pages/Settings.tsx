import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { FC } from 'react';

const Settings: FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>الإعدادات</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

            </IonContent>
        </IonPage>
    );
};

export default Settings;
