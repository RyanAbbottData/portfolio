import React, { useEffect, useState } from 'react';
import Table from '../table';
import supabase from '../utils/supabase';

async function getLatestRows(table: string): Promise<Record<string, any>[]> {
    const { data: latest, error: latestError } = await supabase
        .schema('public')
        .from(table)
        .select('time')
        .order('time', { ascending: false })
        .limit(1)
        .single();

    if (latestError) {
        console.error(`[${table}] error fetching latest time:`, latestError);
        return [];
    }
    if (!latest) return [];

    const { data, error } = await supabase
        .schema('public')
        .from(table)
        .select('*')
        .eq('time', latest.time);

    if (error) {
        console.error(`[${table}] error fetching rows:`, error);
        return [];
    }
    return data ?? [];
}

function MlbPage() {
    const [teamData, setTeamData] = useState<Record<string, any>[]>([]);
    const [hittingData, setHittingData] = useState<Record<string, any>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getLatestRows('daily_standings'),
            getLatestRows('daily_hitting'),
        ]).then(([teamRows, hittingRows]) => {
            setTeamData(teamRows);
            setHittingData(hittingRows);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    return <Table teamData={teamData} hittingData={hittingData} />;
}

export default MlbPage;
