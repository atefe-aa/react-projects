import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    const isSelected = selectedFriend?.id === friend.id;

    setSelectedFriend(isSelected ? null : friend);
    setShowAddFriend(false);
  }

  function handleBill(newBalance) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + newBalance }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelect={handleSelection}
          selected={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAdd={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill selected={selectedFriend} onSubmit={handleBill} />
      )}
    </div>
  );
}

function FriendList({ friends, onSelect, selected }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          data={friend}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function Friend({ data, onSelect, selected }) {
  const isSelected = selected?.id === data.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>

      {data.balance < 0 && (
        <p className="red">
          You owe {data.name} ${Math.abs(data.balance)}
        </p>
      )}

      {data.balance > 0 && (
        <p className="green">
          {data.name} owes you ${Math.abs(data.balance)}
        </p>
      )}

      {data.balance === 0 && <p>You and your friend are even.</p>}
      <Button onClick={() => onSelect(data)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
function FormAddFriend({ onAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleNewFriend(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      id,
      balance: 0,
    };

    onAdd(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleNewFriend}>
      <label>👭 Friend Name : </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📸 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add Friend</Button>
    </form>
  );
}

function FormSplitBill({ selected, onSubmit }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [WhoPays, setWhoPays] = useState("user");
  const balance = WhoPays === "user" ? paidByFriend : -paidByUser;

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSubmit(balance);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selected.name} </h2>
      <label>💸 Bill Value: </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🚶‍♂️ Your Expences</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👭 {selected.name}'s Expences</label>
      <input type="text" value={paidByFriend} disabled />

      <label>🤑 Who is paying the bill?</label>
      <select value={WhoPays} onChange={(e) => setWhoPays(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selected.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
