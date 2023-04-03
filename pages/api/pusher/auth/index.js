import { pusher } from "@/lib";

export default async function handler(req, res) {
  const { socket_id, channel_name, username } = req.body;
  const randomString = Math.random().toString(36).slice(2);
  const presenceData = {
    user_id: randomString.toString(),
    user_info: {
      username: username.toString()
    }
  }
  console.log('WHERE IS THIE COMING FROM', {socket_id, channel_name, presenceData})
  try {
    const auth = pusher.authorizeChannel(socket_id, channel_name, presenceData)
    // that way pusher gets a response back from api
    res.send(auth)
  } catch (error) {
    console.log('ERROR FROM HANDLER::::', error)
  }
}
