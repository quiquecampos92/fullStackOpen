const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('give correct arguments');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://quiquecampos92:${password}@cluster0.dg7nw.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

let contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    number: {
        type: String,
    }
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact);
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const contact = new Contact({
        name: name,
        number: number
    });

    contact.save().then(result => {
        console.log(`added ${name} with Number ${number} to phonebook`);
        mongoose.connection.close();
    });
}
