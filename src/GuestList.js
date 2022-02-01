import { useState } from 'react';
import Guest from './Guest';

const guests = [
  {
    gender: 'male',
    name: {
      first: 'James',
      last: 'Bond',
    },
    email: 'email@email.com',
  },
  {
    gender: 'females',
    name: {
      first: 'Money',
      last: 'Penny',
    },
    email: 'email@email.com',
  },
];

function List(props) {
  return <ul style={{ backgroundColor: `beige` }}>{props.children}</ul>;
}

export default function GuestList() {
  const [guestList, setGuestList] = useState(guests);
  return (
    <div>
      <List>
        {guestList.map((singleGuest) => {
          return (
            <Guest
              key={'guest' + singleGuest.name + singleGuest.email}
              name={singleGuest.name}
              email={singleGuest.email}
            />
          );
        })}
        {/* <Guest
        name={{
          title: 'Mrs',
          first: 'Kimberley',
          last: 'Blankenhorn',
        }}
        email="guest1@email.com"
      /> */}
      </List>
      <button
        onClick={() => {
          const guestListCopy = [...guestList];
          // guestListCopy.push({
          //   gender: 'female',
          //   name: {
          //     first: 'Money',
          //     last: 'Penny',
          //   },
          //   email: 'email@email.com',
          // });
          const arrayUpdated = [
            ...guestListCopy,
            {
              gender: 'female',
              name: {
                first: 'Money',
                last: 'Penny',
              },
              email: 'email@email.com',
            },
          ];
          setGuestList(arrayUpdated);
        }}
      >
        add new guest
      </button>
      <button
        onClick={() => {
          const arrayUpdated = [...guestList];

          arrayUpdated.pop();
          setGuestList(arrayUpdated);
        }}
      >
        Remove last user
      </button>
      <button
        onClick={() => {
          const arrayUpdated = [...guestList];

          const updatedGuestList = arrayUpdated.map((singleGuest, index) => {
            if (index === arrayUpdated.length - 1) {
              singleGuest.email = 'example@mail.com';
              return singleGuest;
            } else {
              return singleGuest;
            }
          });
          setGuestList(updatedGuestList);
        }}
      >
        update email
      </button>
    </div>
  );
}
