function getPosition(position_char) {
    switch (position_char) {
        case 'G':
            return "Guard"
        case 'F':
            return "Forward"
        default:
            return Math.floor(Math.random() * 2) == 0 ? "Guard" : "Forward"
    }
}

export default function PlayersTable({ playersList }) {

    const players_with_position = playersList.filter(player => player.position !== '');
    if (players_with_position.length < 10) {
        const players_without_position = playersList.filter(player => player.position === '');
        for (let i = players_with_position.length; (i < 10 && i < players_without_position.length); i++) {
            players_with_position.push(players_without_position[i])
        }
    }

    return (
        <div className="contentPlayersList">
            {playersList.length == 0 ? <p>No player were found.</p> :
                <>
                    <p>Partial players list:</p>
                    <table className="playerListTable">
                        <thead>
                            <tr>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Position</td>
                            </tr>
                        </thead>
                        <tbody>
                            {players_with_position.slice(0, 10).map(player => {
                                return <tr key={player.id}>
                                    <td>{player.first_name}</td>
                                    <td>{player.last_name}</td>
                                    <td>{getPosition(player.position)}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </>}
        </div>
    );
}