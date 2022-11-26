import { LIKED_PLAYERS_TABLE_NAME } from "../../config";
import { client } from "../../datastores";

export default async function handler(req, res) {
    console.log(req.body)
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Unsupported request method' })
        return;
    }

    try {
        const { user_nickname, player_name } = req.body;
        const { error } = await client.from(LIKED_PLAYERS_TABLE_NAME).insert({ user_nickname, player_name });
        if (error) {
            res.status(500).json({ message: error });
            return;
        }
        res.status(200).json({ message: "inserted successfully" })
    } catch (error) {
        res.status(500).json({ message: `Error caught. error: ${error.message}` })
    }
}