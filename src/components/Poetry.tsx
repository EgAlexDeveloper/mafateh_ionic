import { FC } from "react";
import './poetry.css';

type Props = {
    list: string[][],
    type: 3 | 33
};

const Poetry: FC<Props> = (props: Props) => {
    return (
        <ul className={`poetry type_${props.type}`}>
            {
                props.list.map((subList) => (
                    <ul key={new Date().getTime()}>
                        {
                            subList.map((text) => (
                                <li key={new Date().getTime()}>{text}</li>
                            ))
                        }
                    </ul>
                ))
            }
        </ul>
    )
}

export default Poetry;