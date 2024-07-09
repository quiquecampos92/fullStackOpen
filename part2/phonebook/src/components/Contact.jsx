
const Contact = ({ contacts }) => {

    return (
        <>
            {contacts.map((c) => (
                <>
                    <div key={c.id}>
                        <p>{c.name}</p>
                        <p>{c.number}</p>
                        <p>{c.id}</p>
                        <br /><br /><br />
                    </div>
                </>
            )
            )}
        </>
    );
};

export default Contact