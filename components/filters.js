export default function Filters({ playersList, changeHandler, selectedValues }) {
    return (
        <div className="filtersSection">
            <h3 className="filterSectionTitle">Filters</h3>

            <div className="filtersSectionInner">
                <div className="filterObject">
                    <input id="team-name-search" type="text" placeholder="Search by team name.." onChange={changeHandler} />
                </div>

                <div className="filterObject" id="search-playerDiv">
                    <label htmlFor="search-player">Find by player:</label>
                    <select name="search-player" id="search-player" className="filterObject" onChange={changeHandler} value={selectedValues[0]}>
                        <option value={0}>Select player...</option>
                        {playersList.map(player => {
                            return <option key={player.id} value={player.team.id}>{player.first_name + " " + player.last_name}</option>
                        })}
                    </select>
                </div>

                <div className="filterObject">
                    <label htmlFor="teams-sort">Sort teams by:</label>
                    <select name="teams-sort" id="teams-sort" className="filterObject" onChange={changeHandler} value={selectedValues[1]}>
                        <option value="nameAsc">Name (Ascending)</option>
                        <option value="nameDesc">Name (Descending)</option>
                        <option value="division">Division</option>
                    </select>
                </div>
            </div>
        </div >)
}