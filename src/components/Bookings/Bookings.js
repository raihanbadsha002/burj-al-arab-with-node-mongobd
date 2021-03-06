import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    

    useEffect(() => {
       fetch('http://localhost:5000/bookings?email='+loggedInUser.email, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
           }
       })
       .then(res => res.json())
       .then(data => setBookings(data))
    }, [])
    return (
        <div>
            <h3>You have: {bookings.length}</h3>
            {
                bookings.map(book => <li key={book._id}>{book.name} From: {new Date(book.checkIn).toDateString('dd/MM/yyyy')} To: {new Date(book.checkOut).toDateString('dd/MM/yyyy')}</li> )
            }
        </div>
    );
};

export default Bookings;