import { FC } from "react";

type Props = {
    text: string
};

const Text: FC<Props> = (props: Props) => {
    return (<>
        <p className="text">{props.text}</p>
    </>)
}

export default Text;