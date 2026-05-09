import React, { useEffect, useState } from 'react';

function NbaPage() {
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1/sports/nba')
            .then(res => res.json())
            .then(data => {
                setTeamData(data.team_data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <h2>NBA Team Stats</h2>
            <table style={{ border: '1px solid' }}>
                <thead>
                    <tr>
                        {teamData[0] && Object.keys(teamData[0]).map(col => <th key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {teamData.map((row, i) => (
                        <tr key={i}>
                            {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default NbaPage;
