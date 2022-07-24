import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useState } from "react";

import { FormGroup, FormControl, Validators } from 'ms-react-reactive-form';

type Props = {};

const Register: FC<Props> = (props: Props) => {
    const form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required(), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        password: new FormControl('', [Validators.required()])
    });

    const [formState, updateFormState] = useState<FormGroup>(form);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>تسجيل مستخدم جديد</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonItem>
                                    <IonLabel position="floating">البريد الإلكتروني</IonLabel>
                                    <IonInput value={formState.controls.email.value}></IonInput>
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="floating">كلمة المرور</IonLabel>
                                    <IonInput value={formState.controls.password.value}></IonInput>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" size-md>
                            <IonButton expand="block" fill="solid">التسجيل</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Register;