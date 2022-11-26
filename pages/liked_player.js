import { useState } from "react";
import { LIKED_PLAYERS_ENDPOINT } from "../config";


async function postLikedPlayer(data) {
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    return await fetch(LIKED_PLAYERS_ENDPOINT, request);
}

export default function LikedPlayerPage() {

    const [formData, setFormData] = useState({});
    const [formResponseStatus, setFormResponseStatus] = useState();

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await postLikedPlayer(formData);
        setFormResponseStatus(response.status);
    }

    function handleChange(event) {
        if (event.target.id === "form-user-nickname") {
            const user_nickname = event.target.value;
            setFormData(Object.assign(formData, { user_nickname }))
        }
        if (event.target.id === "form-player-name") {
            const player_name = event.target.value;
            setFormData(Object.assign(formData, { player_name }))
        }
    }

    return (
        <div className="row">
            <div className="content">
                <div className="contentDetails">
                    Which player is your favorit? feel the form below and let us know!
                </div>
                <div className="formContent">
                    {formResponseStatus ?
                        <div>{formResponseStatus === 200 ? "Thank you. you favorit player has been logged" : "Something went wrong."}</div> :
                        <form onSubmit={handleSubmit}>
                            <input className="formContent" id="form-user-nickname" placeholder="Your nickname" value={formData.user_nickname} onChange={handleChange} required />
                            <input className="formContent" id="form-player-name" placeholder="Liked player name" value={formData.player_name} onChange={handleChange} required />
                            <button className="formContent" type="submit">Send</button>
                        </form>
                    }
                </div>
            </div>
        </div >
    )
}