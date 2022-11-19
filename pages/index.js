
import Message from "../components/message";
import Filters from "../components/filters";
import { GetAllPlayers, GetAllTeams } from "../hooks/data";

// Our main page. Here we are loading data "on the client"
// And showing some loading screen(s) while waiting for the data to be ready
export default function IndexPage() {

  let [allTeamsData, allPlayersData] = [GetAllTeams(), GetAllPlayers()];

  if (allTeamsData == null || allPlayersData == null) return <Message content="Loading..." />

  allPlayersData = Object.values(allPlayersData.data);
  allTeamsData = Object.values(allTeamsData.data);
  allPlayersData.sort(((a, b) => a.first_name < b.first_name ? -1 : 1));
  let currentlySelectTeams = allTeamsData;

  return (
    <>
      <Filters> </Filters>
      <div className="row">
        {currentlySelectTeams.map(team => {
          const playerDataCopy = JSON.parse(JSON.stringify(allPlayersData));
          const relevantPlayers = Object.values(playerDataCopy).filter((player) => player.team.id == team.id);
          return <div className="item">
            <div className="content">
              <h2 className="teamTitle">{team.full_name}</h2>
              <div className="contentDetails">
                <p>City: {team.city}</p>
                <p>Abbr: {team.abbreviation}</p>
              </div>
              <p>Division: {team.division}</p>
              <div className="contentPlayersList">
                {relevantPlayers.length != 0 ? <><p>Partial players list:</p><table className="playerListTable">
                  <thead>
                    <tr>
                      <td>First Name</td>
                      <td>Last Name</td>
                      <td>Position</td>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table></> : <p>No player were found.</p>}
              </div>
            </div>
          </div>;
        })}
      </div>
    </>
  )
}
