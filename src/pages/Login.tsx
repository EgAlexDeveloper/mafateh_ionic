import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import { FC, FormEvent, useState } from "react";

import { FormGroup, FormControl, Validators, BaseValidator } from 'ms-react-reactive-form';
import { signin } from "../firebase/auth";
import { LoginPayload } from "../firebase/types";
import Register from "./Register";
import { useHistory } from "react-router-dom";

type Props = {};

const Login: FC<Props> = (props: Props) => {
    const history = useHistory();

    const form: FormGroup = new FormGroup({
        email: new FormControl('eng.moustafa.it@gmail.com', [Validators.required(), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
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
                        .then(res => { })
                        .catch(error => {
                            const errorMessage = error.code;

                            console.log(errorMessage)

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
                    <IonTitle>تسجيل الدخول</IonTitle>
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
                                            placeholder="البريد الإلكتروني"
                                            type="email"
                                            value={formState.controls.email.value}
                                            onIonChange={(e: CustomEvent<any>) => { changeHandler(e, 'email') }}
                                        >
                                        </IonInput>
                                    </IonItem>

                                    {
                                        !formState.controls.email.validity &&
                                        <span className="error">ادخل بريد الكتروني صحيح</span>
                                    }

                                    {
                                        EMAIL_NOT_FOUND &&
                                        <span className="error">{EMAIL_NOT_FOUND}</span>
                                    }

                                    <IonItem className="mb-2">
                                        <IonInput
                                            placeholder="كلمة المرور"
                                            type="password"
                                            value={formState.controls.password.value}
                                            onIonChange={(e: any) => changeHandler(e, 'password')}
                                        >
                                        </IonInput>
                                    </IonItem>

                                    {
                                        !formState.controls.password.validity &&
                                        <div className="error">ادخل كلمة مرور صحيحة</div>
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
                                <IonButton color="success" onClick={onSubmit} expand="block" fill="solid">الدخول</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="12">
                                <IonButton expand="block" fill="clear" onClick={() => history.replace('/register')} className="ion-text-center">
                                    تسجيل مستخدم جديد
                                </IonButton>

                                <IonButton expand="block" fill="clear" onClick={() => history.replace('/categories')} className="ion-text-center">
                                    الإستمرار بدون تسجيل
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