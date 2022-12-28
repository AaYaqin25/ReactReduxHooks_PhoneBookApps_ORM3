import React, { Fragment, useState } from "react"

export default function UserItem(props) {

    const [user, setUser] = useState({
        name: props.name,
        phone: props.phone,
        isEdit: false
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

    const handleClickEdit = () => {
        setUser({
            isEdit: true
        })

    }

    const handleCancelEdit = () => {
        setUser({
            isEdit: false
        })
    }

    const saveEdit = () => {
        props.update(user.name, user.phone)
        setUser({
            isEdit: false
        })
    }
   
    console.log(user.name);
    return (
        <tr>
            <td>{props.no}</td>
            {
                user.isEdit ?
                    <Fragment>
                        <td>
                            <input type="text" id="name" name='name' className="form-control" placeholder='name' onChange={handleInputChange} value={user.name} />
                        </td>
                        <td>
                            <input type="text" id="phone" name='phone' className="form-control" placeholder='phone' onChange={handleInputChange} value={user.phone} />
                        </td>
                    </Fragment>
                    :
                    <Fragment>
                        <td>{props.name}</td>
                        <td>{props.phone}</td>
                    </Fragment>
            }

            {
                props.sent ?
                    user.isEdit ?
                        <td>
                            <button className='btn btn-info' onClick={saveEdit}><i className="fa-sharp fa-solid fa-pen"></i> save</button>
                            <button className='btn btn-warning' onClick={handleCancelEdit}><i className="fa-solid fa-ban"></i> cancel</button>
                        </td>
                        : <td>
                            <button id='btnedit' className='btn btn-light' onClick={handleClickEdit}><i className="fa-sharp fa-solid fa-pen"></i> edit</button>
                            <button id='btndelete' className='btn btn-light' onClick={props.remove}><i className="fa-solid fa-ban"></i> delete</button>
                        </td>
                    :
                    <td>
                        <button className='btn btn-warning' onClick={props.resending}><i className="fa-solid fa-rotate-left"></i> resend</button>
                    </td>
            }

        </tr>
    )
}


