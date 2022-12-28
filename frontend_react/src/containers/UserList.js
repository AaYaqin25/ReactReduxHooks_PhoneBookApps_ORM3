import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from "react"
import UserItem from "../components/UserItem"
import { loadMore, loadUser, removeUser, resendUser, updateUser } from '../actions/users'

export default function UserList(props) {

    const users = useSelector((state) => state.users.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop - element.clientHeight <= 1) {
            dispatch(loadMore())
        }
    }

    return (
        <div onScroll={scrolling} style={{ overflowY: "scroll", height: 200 }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index) => (
                            <UserItem
                                key={item.id}
                                no={index + 1}
                                name={item.name}
                                phone={item.phone}
                                sent={item.sent}
                                remove={() => dispatch(removeUser(item.id))}
                                resending={() => dispatch(resendUser(item.id, item.name, item.phone))}
                                update={(name, phone) => dispatch(updateUser(item.id, name, phone))} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
