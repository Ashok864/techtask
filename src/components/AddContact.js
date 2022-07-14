// import { createBrowserHistory } from 'history';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const AddContact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();

    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(
            (contact) => contact.email === email && email
        );
        const checkNumber = contacts.find(
            (contact) => contact.number === parseInt(number)
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
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        };
        

        dispatch({type: "ADD_CONTACT", payload:data});
        toast.success("Added Successfully!!");
        history("/");
    };

  return (
    <div className='container-fluid'>
        <div className='row'>
            <h1 className='display-3 my-5 text-center'>Add Detail</h1>
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
                        <input type='submit' value='Add Detail' className='form-control btn btn-block btn-dark' />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddContact;