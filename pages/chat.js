import styles from "@/styles/Home.module.css";
import Pusher from "pusher-js";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Chat({ username }) {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_key, {
    cluster: "us3",
    // auth end point could be an API route here its the index.js file in auth folder
    authEndpoint: "api/pusher/auth",
    auth: {
      params: { username },
    },
  });

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setUsersOnline] = useState([]);
console.log("pusher looks like", pusher)
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // subscribe to 'presence-channel'
      const channel = pusher.subscribe("presence-channel");

      // bind to 'chat-update-event'
      channel.bind("chat-update-event", (data) => {
        // since this is subscribed to presence-channel it will receive \
        // data anytime it becomes available
        const { message, username } = data;
        setChats((prevState) => [...prevState, { username, message }]);

        console.log("data from chat-update-event", data);
      });
    }
    return () => {
      pusher.unsubscribe("presence-channel");
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // makes API call to /api/pusher/index
    await axios.post("/api/pusher", {
      message,
      username,
    });
  };
  return (
    <div className={styles.main}>
      {chats.map((chat, id) => {
        return <div key={id}>{`${chat.message} by ${chat.username}`}</div>;
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="enter message..."
        />
      </form>
    </div>
  );
}

/*
BIND MORE EVENTS
These events are given as part of PUSHER


// when a user subscribed
// channel.bind("pusher:subscription_suceeded", (members) => {
//     console.log('data from pusher:subscription_suceeded', members)
//     setOnlineUsersCount(members.count)
// })
// //when a new member joins a chat
// channel.bind("pusher:member_added", (member) => {
//     setOnlineUsersCount(channel.members.count)

//     setOnlineUsersCount((prevState) => [
//         ...prevState,
//         {username: member.info.username }
//     ])
// })

// called when a new member joins
channel.bind("pusher:member_added", (member) => {
// this
});
*/
