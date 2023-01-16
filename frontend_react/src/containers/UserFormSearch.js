import React, { useCallback, useState } from "react";
import { useDispatch } from 'react-redux'
import { resetUser, searchUser } from '../actions/users';

export default function UserFormSearch(props) {

    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: '',
        phone: ''
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }


    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        dispatch(searchUser({ name: user.name, phone: user.phone }))
    }, [user, dispatch])

    const handleResetSearch = () => {
        dispatch(resetUser())
        setUser({ name: '', phone: '' })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-1 align-items-center">
                <div className="col-auto">
                    <label htmlFor="name" className="col-form-label">Name</label>
                </div>
                <div className="col-auto">
                    <input type="text" id="name" name='name' className="form-control" placeholder='name' onChange={handleInputChange} value={user.name} />
                </div>

                <div className="col-auto">
                    <label htmlFor="phone" className="col-form-label">Phone</label>
                </div>
                <div className="col-auto">
                    <input type="text" id="phone" name='phone' className="form-control" placeholder='phone' onChange={handleInputChange} value={user.phone} />
                </div>
                <div className="col-auto">
                    <button className='btn btn-primary' ><i className="fa-regular fa-circle-check"></i> search</button>
                    <button className='btn btn-dark' onClick={handleResetSearch}><i className="fa-solid fa-rotate"></i> reset</button>
                </div>
            </div>
        </form>
    )
}
