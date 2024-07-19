
const DataContact = ({ contact, handleDelete }) => {

    return (
        <div key={contact.id}>
            <p>{contact.name}</p>
            <p>{contact.number}</p>
            <p>{contact.id}</p>
            <button onClick={handleDelete}>Delete</button>
            <br /><br /><br />
        </div>
    );
};

export default DataContact