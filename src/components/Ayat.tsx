import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import React, { FC } from "react";

type Props = {
    text: string
};

const Ayat: FC<Props> = (props: Props) => {
    return (
        <p className="ayat">
            <span className="bahij">﴿</span>
            <span>{props.text}</span>
            <span className="bahij">﴾</span>
        </p>
    )
}

export default Ayat;