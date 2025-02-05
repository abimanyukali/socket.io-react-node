import './card.css';
import Heart from '../../img/heart.svg';
import HeartFilled from '../../img/heartFilled.svg';
import Comment from '../../img/comment.svg';
import Share from '../../img/share.svg';
import Info from '../../img/info.svg';
import React, { useState } from 'react';

const Card = ({ post, socket, user }) => {
  console.log(post, user);
  const [like, setLike] = useState(false);
  const handleClick = (type) => {
    setLike(true);
    socket.emit('sendNotification', {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg " />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {like ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleClick(1)}
          />
        )}
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleClick(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleClick(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
