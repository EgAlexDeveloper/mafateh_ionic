import { FC } from "react";

type Props = {
    text: string
};

const Ayat: FC<Props> = (props: Props) => {
    return (<>
        <p className="ayat">
            <span className="bahij">﴿</span>
            <>{props.text}</>
            <span className="bahij">﴾</span>
        </p>
    </>)
}

export default Ayat;