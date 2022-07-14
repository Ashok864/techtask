const initialState = [
    {
        id:0,
        name: "Ashok Kumar",
        email: "ashok@gmail.com",
        number: 9876543210,
    },
    {
        id:1,
        name: "Ganesh Prabhu",
        email: "ganesh@gmail.com",
        number: 9977543210,
    },
];

const ContactReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_CONTACT":
            state = [...state, action.payload];
        case "UPDATE_CONTACT":
            const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact)
            state = updateState;
            return state;
        case "DELETE_CONTACT":
            const filtercontacts = state.filter(contact => contact.id !== action.payload && contact);
            state = filtercontacts;
            return state;
        default:
            return state;
    }
}

export default ContactReducer;