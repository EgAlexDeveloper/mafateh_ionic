import { FC } from "react";

type Props = {
    text: string
};

const Ayat: FC<Props> = (props: Props) => {
    return (<>
        <p className="ayat">{props.text}</p>
    </>)
}

export default Ayat;