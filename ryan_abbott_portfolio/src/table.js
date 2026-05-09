import React from 'react';

const DataTable = ({ title, data, accentColor = 'indigo' }) => {
    if (!data || data.length === 0) return null;

    const headers = Object.keys(data[0]);

    const headerColors = {
        indigo: 'bg-indigo-600 text-white',
        red:    'bg-red-600 text-white',
    };

    return (
        <div className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-3 tracking-wide">{title}</h2>
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700">
                <table className="min-w-full text-sm text-left">
                    <thead className={`${headerColors[accentColor] ?? 'bg-gray-700 text-white'} uppercase text-xs tracking-wider`}>
                        <tr>
                            {headers.map(col => (
                                <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                className={`${i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-150`}
                            >
                                {Object.values(row).map((val, j) => (
                                    <td key={j} className="px-4 py-2.5 text-gray-200 whitespace-nowrap">
                                        {val}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function Table({ teamData, hittingData }) {
    return (
        <div className="p-6 space-y-4">
            <DataTable title="Team Standings" data={teamData} accentColor="indigo" />
            <DataTable title="Batting Leaders" data={hittingData} accentColor="red" />
        </div>
    );
}

export default Table;
