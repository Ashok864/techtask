import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const EditContact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const {id} = useParams();
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useNavigate();
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(() => {
        if(currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(
            (contact) => contact.id !== parseInt(id) && contact.email === email 
        );
        const checkNumber = contacts.find(
            (contact) => contact.id !== parseInt(id) && contact.number === parseInt(number)
        );

        if(!email || !number || !name ){
            return toast.warning("please fill in all fields!");
        }

        if(checkEmail){
            return toast.warning("This email already Exists!");
        }

        if(checkNumber){
            return toast.warning("This number already Exists!");
        }

        const data = {
            id: parseInt(id),
            name,
            email,
            number
        };
        

        dispatch({type: "UPDATE_CONTACT", payload:data});
        toast.success("Updated Successfully!!");
        history("/");
    };

  return (
    <div className='container-fluid'>
        {currentContact ? (
            <>
            <h1 className='display-3 my-5 text-center'>Edit Detail {id}</h1>
            <div className='row'>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group mb-4'>
                            <input type='text' placeholder='Enter Name' className='form-control' value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className='form-group mb-4'>
                            <input type='email' placeholder='Enter Email' className='form-control' value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className='form-group mb-4'>
                            <input type='number' placeholder='Phone Number' className='form-control' value={number} onChange={e => setNumber(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <input type='submit' value='Update Detail' className='btn btn-dark' />
                            <Link to="/" className='btn btn-danger ms-3'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
            </>
        ): (
            <h1 className='display-3 my-5 text-center'>Contact Detail with id {id} not exists</h1>
        )}
        
    </div>
  )
}

export default EditContact