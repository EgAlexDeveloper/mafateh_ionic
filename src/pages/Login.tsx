import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonNote, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useContext, useState } from "react";

import { FormGroup, FormControl, Validators, BaseValidator } from 'ms-react-reactive-form';
import { signin } from "../firebase/auth";
import { LoginPayload } from "../firebase/types";

import { useHistory } from "react-router-dom";
import { saveData } from "../db";
import { UserCredential } from "firebase/auth";
import { AuthContext } from "../context/auth.context";

import messages from "../assets/messages";
import Header from "../components/Header";

type Props = {};

const Login: FC<Props> = (props: Props) => {
    const history = useHistory();
    const authContext = useContext(AuthContext);

    const form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required(), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        password: new FormControl('', [Validators.required()])
    });

    const [formState, updateFormState] = useState<FormGroup>(form);

    const [INVALID_PASSWORD, update_INVALID_PASSWORD] = useState<string>("");
    const [EMAIL_NOT_FOUND, update_EMAIL_NOT_FOUND] = useState<string>("");
    const [TOO_MANY_REQUESTS, update_TOO_MANY_REQUESTS] = useState<string>("");

    const onSubmit = (event: any): void => {
        event.preventDefault();

        let validate = new BaseValidator(formState);
        validate.analysis()
            .then(controls => {
                let res = validate.result(controls);
                if (res.form.validity) {
                    signin(res.payload as LoginPayload)
                        .then((res: UserCredential) => {
                            saveData(JSON.stringify(res.user), 'user');
                            authContext?.updateIsLoggedInState(true);
                            authContext?.updateUserState(res);
                            history.replace('/categories');
                        })
                        .catch(error => {
                            const errorMessage = error.code;

                            if (errorMessage == 'auth/too-many-requests') update_TOO_MANY_REQUESTS("تم ادخال البريد الاكتروني او كلمة المرور اكثر من مرة بطريقة خاطأ حاول في وقت لاحق")
                            if (errorMessage == 'auth/wrong-password') update_INVALID_PASSWORD("كلمة المرور المدخلة غير مرتبطة بالابريد الالكتروني المدخل")
                            if (errorMessage == 'auth/user-not-found') update_EMAIL_NOT_FOUND('البريد الالكتروني المدخل غير مسجل')
                        });
                } else {
                    updateFormState({ ...res.form })
                }
            });
    };

    const changeHandler = (event: any, name: string): void => {
        update_TOO_MANY_REQUESTS("");
        update_INVALID_PASSWORD("");
        update_EMAIL_NOT_FOUND("");

        const { value } = event.currentTarget;
        formState.controls[name].setValue(value);
    };

    return (
        <IonPage>
            <Header title={messages.LOGIN} hasBack={false} hideSettings={true} />
            <IonContent fullscreen>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={onSubmit}>
                            <IonList lines="full" className="ion-margin-bottom">
                                <IonItem
                                    fill="solid"
                                    className={`${formState.controls.email.validity && 'ion-valid'} 
                                ${!formState.controls.email.validity && 'ion-invalid'}`}
                                >
                                    <IonLabel position="floating">{messages.EMAIL_ADDRESS}</IonLabel>
                                    <IonInput
                                        placeholder={messages.EMAIL_ADDRESS}
                                        type="email"
                                        value={formState.controls.email.value}
                                        onIonChange={(e: CustomEvent<any>) => { changeHandler(e, 'email') }}
                                    >
                                    </IonInput>

                                    {
                                        !formState.controls.email.validity &&
                                        <IonNote slot="error">{messages.WRONGE_EMAIL_ADDRESS}</IonNote >
                                    }

                                    {
                                        EMAIL_NOT_FOUND &&
                                        <IonNote slot="error">{EMAIL_NOT_FOUND}</IonNote>
                                    }
                                </IonItem>

                                <IonItem
                                    fill="solid"
                                    className={`${formState.controls.password.validity && 'ion-valid'} 
                                ${!formState.controls.password.validity && 'ion-invalid'}`}
                                >
                                    <IonLabel position="floating">{messages.PASSWORD}</IonLabel>
                                    <IonInput
                                        placeholder={messages.PASSWORD}
                                        type="password"
                                        value={formState.controls.password.value}
                                        onIonChange={(e: any) => changeHandler(e, 'password')}
                                    >
                                    </IonInput>

                                    {
                                        !formState.controls.password.validity &&
                                        <IonNote slot="error">{messages.WRONGE_PASSWORD}</IonNote>
                                    }

                                    {
                                        INVALID_PASSWORD &&
                                        <IonNote slot="error">{INVALID_PASSWORD}</IonNote>
                                    }

                                    {
                                        TOO_MANY_REQUESTS &&
                                        <IonNote slot="error">{TOO_MANY_REQUESTS}</IonNote>
                                    }
                                </IonItem>
                            </IonList>

                            <IonButton color="dark" expand="full" fill="solid" onClick={onSubmit}>
                                {messages.LOGIN}
                            </IonButton>

                            <IonButton size="small" color="success" expand="block" fill="clear" onClick={() => history.replace('/categories')} className="ion-text-center">
                                {messages.ACCESS_AS_GUEST}
                            </IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default Login;