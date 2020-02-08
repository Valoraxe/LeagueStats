const express = require('express');
const LeagueJS = require('leaguejs');
const app = express();
const port = 3001;
const RiotAPI = 'INSERT RIOT API KEY HERE';

app.listen(port, () => {
    console.log(`Listening to Port ${port}`)
});

app.get('/backend/user/:username', (req, res) => {
    let username = req.params.username;
    getSummoner(username).then(data => {
        getMatches(data.accountId).then(data => {
            res.send(data);
        })
    })
});

app.get('/backend/match/:match', (req, res) => {
    let matchId = req.params.match;
    getMatch(matchId).then(data => {
        res.send(data);
    })
});

async function getSummoner(name) {
    let summonerData;
    try {
        await new LeagueJS(RiotAPI).Summoner.gettingByName(name).then(data => {
            summonerData = data
        });
    } catch(e) {
        summonerData = e.statusCode;
    }
    return summonerData
}

async function getMatches(id) {
    let matchData;
    try {
        await new LeagueJS(RiotAPI).Match.gettingListByAccount(id, options={endIndex: 20}).then(data => {
            matchData = {
                matches: data.matches,
                userId: id
            }
        });
    } catch(e) {
        matchData = e.statusCode;
    }
    return matchData
}

async function getMatch(id) {
    let matchData;
    try {
        await new LeagueJS(RiotAPI).Match.gettingById(id).then(data => {
            matchData = data
        });
    } catch(e) {
        matchData = e.statusCode;
    }
    return matchData
}