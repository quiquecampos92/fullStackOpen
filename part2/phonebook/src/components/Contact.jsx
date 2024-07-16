
const Contact = ({ contact }) => {

    return (
        <div key={contact.id}>
            <p>{contact.name}</p>
            <p>{contact.number}</p>
            <p>{contact.id}</p>
            <br /><br /><br />
        </div>
    );
};

export default Contact