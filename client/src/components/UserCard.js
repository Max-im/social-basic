import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/avatar.png";

export default function UserCard({ item }) {
  return (
    <li className="user__item">
      <div className="user__body">
        <img
          src={item.customPhoto ? `/user/photo/${item._id}` : defaultAvatar}
          alt={item.name}
          className="user__img img-thumbnail"
        />
        <div>
          <p>name - {item.name}</p>
          <p>email - {item.email}</p>
          <p>created - {new Date(item.created).toDateString()}</p>
          {item.updated && (
            <p>updated - {new Date(item.updated).toDateString()}</p>
          )}
        </div>
      </div>
      <Link className="btn btn-raised btn-primary" to={`/users/${item._id}`}>
        Profile
      </Link>
    </li>
  );
}
