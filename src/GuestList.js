import './App.css';
import React, { useEffect, useState } from 'react';
import Guest from './Guest';

export default function GuestList() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [isAttending, setIsAttending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = 'https://localhost:4000';
  // Getting all the guests
  useEffect(() => {
    const getGuestList = async () => {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
    };
    getGuestList().catch((error) => console.log(error));
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // creating a new guest
    async function newGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          isAttending: false,
        }),
      });
      const createdGuest = await response.json();
      console.log(createdGuest);
      setFirstName('');
      setLastName('');
    }
    newGuest();
  };
  // Removing guest
  const [checkboxes, setCheckboxes] = React.useState({});
  const checkboxKeys = Object.keys(checkboxes);

  function handleDelete(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
    }
    deleteGuest();
  }
  // Changing to attending
  function handleEdit(id) {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();
    }
    editGuest();
  }
  // useEffect(() => {
  //   const guests = async () => {
  //     const response = await fetch(`${baseUrl}/guests`);
  //     const everyGuest = await response.json();
  //     setGuestList(everyGuest);
  //   };
  //   guests().catch((error) => console.log(error));
  // }, [isAttending]);
  return (
    <div>
      <h1>Guest List Registration</h1>
      <form onSubmit={() => handleSubmit()}>
        <span>First Name:</span>
        <input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <span>Last Name:</span>
        <input
          id="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button>Submit</button>
        <h1>Guest List: </h1>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
            {guestList.map((item) => (
              <tr
                key={item.id}
                className={item.attending ? 'attending' : 'notAttending'}
              >
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={checkboxes[item.id]}
                    onchange={() => {
                      setCheckboxes({
                        ...checkboxes,
                        [item.id]: true,
                      });
                    }}
                  />
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={(item) => handleEdit(item.id)}
          id="delete"
        >
          Confirm guest attendance
        </button>
        {/* // Delete */}
        <button
          type="button"
          onClick={(item) => handleDelete(item.id)}
          id="delete"
        >
          Delete guest
        </button>
      </form>
    </div>
  );
}
