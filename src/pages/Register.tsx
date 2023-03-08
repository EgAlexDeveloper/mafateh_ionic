import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonPage, IonRow, IonTabButton, IonTitle, IonToolbar } from "@ionic/react";
import { FC, FormEvent, useState } from "react";

import { FormGroup, FormControl, Validators, BaseValidator } from 'ms-react-reactive-form';
import { register, signin } from "../firebase/auth";
import { LoginPayload } from "../firebase/types";
import { useHistory } from "react-router-dom";

type Props = {};

const Register: FC<Props> = (props: Props) => {
    const history = useHistory();

    const form: FormGroup = new FormGroup({
        email: new FormControl('eng.moustafa.it@gmail.com', [Validators.required(), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        password: new FormControl('bebaP@$$w0rd', [Validators.required()])
    });

    const [formState, updateFormState] = useState<FormGroup>(form);
    const [serverError, updateServerError] = useState<string>("");

    const onSubmit = (event: any): void => {
        event.preventDefault();

        let validate = new BaseValidator(formState);
        validate.analysis()
            .then(controls => {
                let res = validate.result(controls);
                if (res.form.validity) {
                    register(res.payload as LoginPayload)
                        .then(res => history.replace('/login'))
                        .catch(error => updateServerError('هذا البريد الالكتروني مسجل من قبل'));
                } else {
                    updateFormState({ ...res.form })
                }
            });
    };

    const changeHandler = (event: any, name: string): void => {
        updateServerError("");
        const { value } = event.currentTarget;
        formState.controls[name].setValue(value);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>تسجيل مستخدم جديد</IonTitle>
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
                                        serverError &&
                                        <span className="error">{serverError}</span>
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
                                        <span className="error">ادخل كلمة مرور صحيحة</span>
                                    }
                                </IonList>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12" size-md>
                                <IonButton color="success" onClick={onSubmit} expand="block" fill="solid">التسجيل</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="12">
                                <IonButton expand="block" fill="clear" onClick={() => history.replace('/login')} className="ion-text-center">
                                    تسجيل الدخول
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

export default Register;