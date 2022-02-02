import './App.css';
import React, { useEffect, useState } from 'react';

// import Guest from './Guest';

export default function GuestList() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [isAttending, setIsAttending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = 'https://react-guest-list-create.herokuapp.com';
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

  // const handleKeypress = (e) => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     handleSubmit();
  //   }
  // };
  const handleSubmit = async (e) => {
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
    await newGuest();
  };
  // Removing guest

  function handleDelete(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();
    }
    deleteGuest();
  }
  // Changing to attending
  function handleEdit(id, isChecked) {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: !isChecked }),
      });
      const updatedGuest = await response.json();
    }
    editGuest();
  }
  const isAttending = (id, isChecked) => {
    const guestListCopy = [...guestList];
    const updatedGuestList = guestListCopy.find(
      (singleGuest) => singleGuest.id === id,
    );
    // guestList(updatedGuestList);
    setGuestList(updatedGuestList);
  };

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
      <form onSubmit={(e) => handleSubmit(e)}>
        <h4>First Name:</h4>
        <input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <h4>Last Name:</h4>
        <input
          id="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/* <button onClick="submit">Submit</button> */}
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
                    checked={item.attending}
                    onChange={(e) => {
                      isAttending(guestList.id, e.target.checked);
                      // setGuestList(updatedGuestList);
                      // 1. create a copy of guest list
                      // 2. Update the copy value of the guests with !isAttending
                      // 3. update guest list state with the copy

                      handleEdit(item.id, item.attending);
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
