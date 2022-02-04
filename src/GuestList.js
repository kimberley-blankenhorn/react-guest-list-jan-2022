import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

// Adding styling to the whole page
const generalStyle = css`
  display: flex;
  width: 100%;
  margin: 0;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;
// For the background
const bodyBackgroundStyle = css`
  background-image: url('/background2.jpg');
  width: 100vw;
  height: 180vh;
  background-size: cover;
  background-repeat: no-repeat;
`;

// Header
const headingStyle = css`
  font-size: 30px;
  color: #616161;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  text-shadow: -9px 5px 9px rgba(126, 119, 119, 0.6);
  padding: 10px;
  border: 10px inset rgba(217, 193, 208, 0.85);
  background-color: rgb(180, 161, 170, 0.4);

  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Left section - Form entry
const leftContainerStyle = css`
  display: flex;
  justify-content: center;
  width: 30%;
  align-items: center;
  align-content: center;
  margin-top: -200px;
  padding: 10px 50px;
  color: rgb(64, 50, 57);

  label {
    font-size: 23px;
    font-weight: 900;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  button {
    display: flex;
    justify-content: center;
    width: 100px;
    margin: 0 0 0 20px;
    &:hover {
      background-color: #64c4c0;
      transition: box-shadow 0.3s 0s ease-in-out, background 0.5s 0s ease-in-out;
    }
  }
`;

// Right section containing list of guests
const rightContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 45%;
  height: 800px;
  align-items: center;
  /* /* align-content: center; */
  margin: 70px 0 0 60px;
  color: rgb(64, 50, 57);
  vertical-align: top;

  /* margin-left: -150px; */
  h1 {
    font-size: 45px;
  }
  h3 {
    font-size: 23px;
    font-weight: bolder;
  }
  table {
    font-size: 22px;
  }

  button {
    width: 150px;
    margin-left: 30px;
    &:hover {
      background-color: #bf7e89;
      transition: box-shadow 0.3s 0s ease-in-out, background 0.5s 0s ease-in-out;
    }
  }
  th {
    padding: 10px;
    font-size: 28px;
  }
  td {
    font-size: 25px;
    input[type='checkbox'] {
      height: 18px;
      width: 18px;
    }
  }
`;

// styling only for the guest list
const guestListStyle = css`
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const inputFieldStyle = css`
  display: flex;
  justify-content: center;
  /* align-content: center; */
  align-items: center;
  margin: 0;

  input {
    height: 50px;
    width: 250px;
    font-size: 25px;
    text-align: center;
    display: flex;
    align-content: center;
    justify-content: center;
    margin-left: 20px;
    border-radius: 25px;
    box-shadow: 0px 0px 8px 5px rgba(117, 106, 115, 0.4);
    border: none;
  }
  h4 {
    font-size: 23px;
  }
`;

const buttonStyle = css`
  width: 250px;
  height: 40px;
  font-size: 18px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 8px 5px rgba(117, 106, 115, 0.4);
  border: none;
  margin: 10px;
`;
const buttonDivStyle = css`
  display: flex;
  justify-content: center;
`;

export default function GuestList() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = 'https://react-guest-list-create.herokuapp.com';

  // Getting all the guests
  useEffect(() => {
    const getGuestList = async () => {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList(data);
      setIsLoading(false);
    };
    getGuestList().catch((error) => console.log(error));
  }, []);

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
      setGuestList([...guestList, createdGuest]);
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
      console.log(deletedGuest);
    }
    deleteGuest().catch((error) => {
      console.log(error);
    });
    const updatedList = guestList.filter((guest) => guest.id !== id);
    setGuestList(updatedList);
  }
  // Changing to attending
  function handleEdit(id, isChecked) {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: isChecked }),
      });
      const updatedGuest = await response.json();
      console.log(updatedGuest);

      const guestListCopy = [...guestList];
      const findGuest = guestListCopy.find((guest) => guest.id === id);
      findGuest.attending = isChecked;

      console.log(findGuest);

      setGuestList(guestListCopy);
      return updatedGuest;
    }
    editGuest().catch((error) => {
      console.log.error(error);
    });
  }

  return (
    <div css={bodyBackgroundStyle}>
      <div>
        <div css={headingStyle}>
          <h1>Guest List Registration</h1>
        </div>
        <div css={generalStyle}>
          {/* Left section containing the form for Guest Name entry */}
          <div css={leftContainerStyle}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <h2>Input Guests Below</h2>
              <div css={inputFieldStyle}>
                <label label="First name">
                  First name:
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div css={inputFieldStyle}>
                <label label="Last name">
                  Last name:
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
              <div css={buttonDivStyle}>
                <button css={buttonStyle}>Submit</button>
              </div>
            </form>
          </div>
          {/* isLoading will disable the forms temporarily until the guest list loads */}
          {isLoading ? (
            'Loading...'
          ) : (
            // This section is for the guest list as well as delete
            <div css={rightContainerStyle}>
              <div>
                <h1>Guest List: </h1>
              </div>
              <div>
                <h3>
                  Check the box for attending guests. For guests not attending,
                  simply uncheck the box.
                </h3>
                <h3>
                  To remove a guest from the list, press "Remove Guest" button.
                </h3>
              </div>
              <div css={guestListStyle} data-test-id="guest">
                {/* Here you can edit attending or delete guests */}
                <table>
                  <tbody>
                    <tr>
                      <th />
                      <th>First Name</th>
                      <th>Last Name</th>
                    </tr>
                    {guestList.map((item) => (
                      <tr
                        key={item.id}
                        className={
                          item.isChecked ? 'attending' : 'notAttending'
                        }
                      >
                        <td>
                          <input
                            type="checkbox"
                            aria-label="Guest Attending"
                            checked={item.attending}
                            onChange={(e) => {
                              handleEdit(item.id, e.currentTarget.checked);
                            }}
                          />
                        </td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>
                          <div css={buttonDivStyle}>
                            <button
                              type="button"
                              aria-label="Remove Guest"
                              onClick={() => handleDelete(item.id)}
                              id="delete"
                              css={buttonStyle}
                            >
                              Remove Guest
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
