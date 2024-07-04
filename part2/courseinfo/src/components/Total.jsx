const Total = (props) => {
    const parts = props.parts;
    const totals = () => {
        return parts.reduce((total, part) => {
            const ejercicios = part.exercises
            return total + ejercicios
        }, 0)
    }
    return (
        <>
            <p><strong>Number of exercises {totals()}</strong></p>
            {/* <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p> */}
        </>
    )
}

export default Total