import Part from "./Part";

const Content = (props) => {
    const parts = props.parts;

    return (
        <>
            {parts.map((e) => (
                <Part key={e.id} part={e} />
            ))}
        </>
    );
};

export default Content