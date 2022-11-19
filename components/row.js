import PlayersTable from "../components/player_table";

export default function Row({ teamList, playerList }) {
    return (<div className="row" id="app">
        {teamList.map(team => {
            const playerDataCopy = JSON.parse(JSON.stringify(playerList));
            const relevantPlayers = Object.values(playerDataCopy).filter((player) => player.team.id == team.id);
            return <div className="item" key={team.id}>
                <div className="content" key={team.id}>
                    <h2 className="teamTitle">{team.full_name}</h2>
                    <div className="contentDetails">
                        <p>City: {team.city}</p>
                        <p>Abbr: {team.abbreviation}</p>
                    </div>
                    <p>Division: {team.division}</p>
                    <PlayersTable playersList={relevantPlayers} key={team.id} />
                </div>
            </div>;
        })}
    </div>);
}