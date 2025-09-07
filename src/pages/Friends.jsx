import { useState } from "react";
import { Link } from "react-router-dom";

export default function Friends() {
  // Données simulées
  const [friends, setFriends] = useState([
    { id: 1, name: "Alice Dupont", email: "alice@example.com" },
    { id: 2, name: "Bob Martin", email: "bob@example.com" },
  ]);

  const [friendRequests, setFriendRequests] = useState([
    { id: 3, name: "Charlie Durand", email: "charlie@example.com" },
  ]);

  const [blockedFriends, setBlockedFriends] = useState([
    { id: 4, name: "David Petit", email: "david@example.com" },
  ]);

  // Actions
  const acceptRequest = (id) => {
    const request = friendRequests.find(f => f.id === id);
    setFriends([...friends, request]);
    setFriendRequests(friendRequests.filter(f => f.id !== id));
  };

  const declineRequest = (id) => {
    setFriendRequests(friendRequests.filter(f => f.id !== id));
  };

  const removeFriend = (id) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  const blockFriend = (id) => {
    const friend = friends.find(f => f.id === id);
    setBlockedFriends([...blockedFriends, friend]);
    setFriends(friends.filter(f => f.id !== id));
  };

  return (
    <div className="friends-page">
      <h2>Mes Amis</h2>
      <div className="row mb-4">
        {friends.map(friend => (
          <div key={friend.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{friend.name}</h5>
                <p className="card-text">{friend.email}</p>
                <div className="mt-auto">
                  <button className="btn btn-sm btn-danger me-2" onClick={() => removeFriend(friend.id)}>Supprimer</button>
                  <button className="btn btn-sm btn-warning" onClick={() => blockFriend(friend.id)}>Bloquer</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Demandes d’amis</h2>
      <div className="row mb-4">
        {friendRequests.map(request => (
          <div key={request.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{request.name}</h5>
                <p className="card-text">{request.email}</p>
                <div className="mt-auto">
                  <button className="btn btn-sm btn-success me-2" onClick={() => acceptRequest(request.id)}>Accepter</button>
                  <button className="btn btn-sm btn-danger" onClick={() => declineRequest(request.id)}>Refuser</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Amis bloqués</h2>
      <div className="row">
        {blockedFriends.map(friend => (
          <div key={friend.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{friend.name}</h5>
                <p className="card-text">{friend.email}</p>
                <span className="badge bg-secondary">Bloqué</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
