export interface Props {
    name: string;
}

const Test = ({ name }: Props) => {
    return <div>{name} </div>;
};

export default Test;
