import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { FC, useContext, useState } from "react";

import { FormGroup, FormControl, Validators, BaseValidator } from 'ms-react-reactive-form';
import { signin } from "../firebase/auth";
import { LoginPayload } from "../firebase/types";

import { useHistory } from "react-router-dom";
import { saveData } from "../db";
import { UserCredential } from "firebase/auth";
import { AuthContext } from "../context/auth.context";
import messages from "../assets/messages";

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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{messages.LOGIN}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <form onSubmit={onSubmit}>
                        <IonRow>
                            <IonCol>
                                <IonList>
                                    <IonItem className="mb-2">
                                        <IonInput
                                            placeholder={messages.EMAIL_ADDRESS}
                                            type="email"
                                            value={formState.controls.email.value}
                                            onIonChange={(e: CustomEvent<any>) => { changeHandler(e, 'email') }}
                                        >
                                        </IonInput>
                                    </IonItem>

                                    {
                                        !formState.controls.email.validity &&
                                        <span className="error">{messages.WRONGE_EMAIL_ADDRESS}</span>
                                    }

                                    {
                                        EMAIL_NOT_FOUND &&
                                        <span className="error">{EMAIL_NOT_FOUND}</span>
                                    }

                                    <IonItem className="mb-2">
                                        <IonInput
                                            placeholder={messages.PASSWORD}
                                            type="password"
                                            value={formState.controls.password.value}
                                            onIonChange={(e: any) => changeHandler(e, 'password')}
                                        >
                                        </IonInput>
                                    </IonItem>

                                    {
                                        !formState.controls.password.validity &&
                                        <span className="error">{messages.WRONGE_PASSWORD}</span>
                                    }

                                    {
                                        INVALID_PASSWORD &&
                                        <div className="error">{INVALID_PASSWORD}</div>
                                    }

                                    {
                                        TOO_MANY_REQUESTS &&
                                        <div className="error">{TOO_MANY_REQUESTS}</div>
                                    }
                                </IonList>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12" size-md>
                                <IonButton color="success" onClick={onSubmit} expand="block" fill="solid">{messages.LOGIN}</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="12">
                                {/* <IonButton expand="block" fill="clear" onClick={() => history.replace('/register')} className="ion-text-center">
                                   {messages.REGISTER}
                                </IonButton> */}

                                <IonButton expand="block" fill="clear" onClick={() => history.replace('/categories')} className="ion-text-center">
                                    {messages.ACCESS_AS_GUEST}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Login;