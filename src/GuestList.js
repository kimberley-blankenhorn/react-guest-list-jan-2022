import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';

const generalStyle = css`
  display: flex;
  width: 100%;
  margin: 0;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;
const bodyBackgroundStyle = css`
  background-image: url('/background2.jpg');
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  /* position: fixed; */
`;
const leftContainerStyle = css`
  display: flex;
  justify-content: center;
  width: 30%;
  align-items: center;
  align-content: center;
  margin-top: 40px;
  padding: 130px 50px;
  color: rgb(64, 50, 57);
`;

const middleContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  align-items: center;
  align-content: center;
  margin: 0 0 0 -60px;
  color: rgb(64, 50, 57);

  /* margin-left: -150px; */
  h1 {
    font-size: 45px;
  }
  table {
    font-size: 22px;
  }
`;

const rightContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  align-items: center;
  align-content: center;
  margin-top: 50px;
  margin-left: -75px;
  color: rgb(64, 50, 57);
`;

const headingStyle = css`
  font-size: 30px;
  color: #616161;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  padding: 10px;
  border: 10px inset rgba(217, 193, 208, 0.85);
  background-color: rgb(180, 161, 170);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    // setTimeout(() => {
    setIsLoading(false);
    // }, 500);
  }, [guestList]);

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
        body: JSON.stringify({ attending: !isChecked }),
      });
      const updatedGuest = await response.json();
      console.log(updatedGuest);

      // editGuest();

      const guestListCopy = [...guestList];
      const findGuest = guestListCopy.find((guest) => guest.id === id);
      findGuest.isChecked = !isChecked;
      handleEdit(findGuest);

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
          <div css={leftContainerStyle}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div css={inputFieldStyle}>
                <label>
                  First Name:
                  <input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div css={inputFieldStyle}>
                <label>
                  Last Name:
                  <input
                    id="LastName"
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
          <div css={middleContainerStyle}>
            <div>
              <h1>Guest List: </h1>
            </div>
            <div css={guestListStyle} data-test-id="guest">
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
                      className={item.isChecked ? 'attending' : 'notAttending'}
                    >
                      <td>
                        <input
                          type="checkbox"
                          aria-label="attending"
                          checked={item.attending}
                          onChange={(e) => {
                            handleEdit(item.id, item.attending);
                          }}
                        />
                      </td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>
                        <div css={buttonDivStyle}>
                          <button
                            type="button"
                            aria-label="Remove"
                            onClick={() => handleDelete(item.id)}
                            id="delete"
                            css={buttonStyle}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div css={rightContainerStyle}>
            <div css={buttonDivStyle}>
              <button
                type="button"
                onClick={(item) => handleEdit(item.id)}
                id="delete"
                css={buttonStyle}
              >
                Confirm guest attendance
              </button>
            </div>
            {/* // Delete */}
          </div>
        </div>
      </div>
    </div>
  );
}
