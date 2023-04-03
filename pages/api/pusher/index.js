import { pusher } from "@/lib";

export default async function handler(req, res) {
  console.log('which came first 2')
  // req comes from 'handleSubmit' in chat page
  const { message, username } = req.body;
  console.log('FROM AXIOS: chat to --> api/pusher:', { message, username })

  await pusher.trigger("presence-channel", "chat-update-event", {
    message,
    username,
  });
  console.log('pusher event has been triggered')
  res.json({ status: 200 });
}
