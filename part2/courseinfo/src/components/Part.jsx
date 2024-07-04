const Part = (props) => {
    const part = props.part;

    // const { name, exercises } = props.part;
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
};

export default Part