// import { listenerCount } from 'process';
import React, { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

// const allGuests = await response.json();
// const response = await fetch(`${baseUrl}/guests/:id`);
// const guest = await response.json();

// const response = await fetch(`${baseUrl}/guests/1`, {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ attending: true }),
// });
// // const updatedGuest = await response.json();

// const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });

// function List(props) {
//   return <ul style={{ backgroundColor: `beige` }}>{props.children}</ul>;
// }

export default function RandomGuestList() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckBox] = useState({});
  const checkboxKeys = Object.keys(checkbox);

  async function fetchGuests() {
    const response = await fetch(`${baseUrl}/guests`);

    const data = await response.json();
    console.log(data.results);
    setGuestList(data.results);
    // const response = await fetch(
    //   `https://randomuser.me/api/?results=${number}`,
    // );
    // const data = await response.json();
    // console.log(data.results);
    // setGuestList(data.results);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Creating a new guest
    async function createdGuest() {
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
      });
      const createdGuest = await response.json();
    }
    createdGuest();
  };

  // Update Guest
  function handleEditGuest(id) {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/guests/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();
    }
    editGuest();
  }
  // Delete Guest
  function handleDeleteGuest(id) {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/guests/1`, {
        method: 'DELETE',
      });
      const deletedGuest = await response.json();

      window.location.reload(false);
    }
    deleteGuest();
  }
  useEffect(() => {
    document.title = 'Guest List';

    async function myFetch() {
      await fetchGuests();
    }
    myFetch().catch((err) => {
      console.log(err);
    });
  }, []);

  // useEffect(() => {
  //   async function myFetch() {
  //     await fetchUsers(usersAmount);
  //   }
  //   myFetch().catch((err) => {
  //     console.log(err);
  //   });
  // }, [usersAmount]);

  // if (guestList.length === 0) {
  //   return <button onClick={() => fetchUsers()}>Fetch random users</button>;
  // }
  return (
    <div>
      {/* <List>
        {guestList.map((singleGuest) => {
          return (
            <Guest
              key={'guest' + singleGuest.name + singleGuest.email}
              name={singleGuest.name}
              email={singleGuest.email}
            />
          );
        })}
      </List> */}
      <h1>Register guests</h1>
      <form onSubmit={handleSubmit}>
        {/* <label> */}
        <span>First Name:</span>
        {/* </label> */}
        <input id="firstName" onChange={(e) => setFirstName(e.target.value)} />
        {/* <label> */}
        <span>Last Name:</span>
        {/* </label> */}
        <input id="lastName" onChange={(e) => setLastName(e.target.value)} />
        <button>Submit</button>
      </form>

      <h1>Guest List:</h1>
      <h4>
        Guests that are attending are check marked, while those who are not
        attending have no checkmark.{' '}
      </h4>

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
              className={item.attending ? 'attending' : 'not attending'}
            >
              <td>
                <input
                  type="checkbox"
                  defaultChecked={checkbox[item.id]}
                  onChange={() => {
                    setCheckBox({ ...checkbox, [item.id]: true });
                  }}
                />
              </td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <label> */}
      <button
        type="button"
        onClick={(item) => handleEditGuest(item.id)}
        id="delete"
      >
        Confirm
      </button>
      {/* </label> */}

      {/* <label> */}
      <button
        type="button"
        onClick={(item) => handleDeleteGuest(item.id)}
        id="deleteGuest"
      >
        Delete
      </button>
      {/* </label> */}
    </div>
  );
}
