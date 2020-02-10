const express = require('express');
const LeagueJS = require('leaguejs');
const app = express();
const port = 3001;
const RiotAPI = 'RGAPI-f4a037e9-687b-4d45-9592-f3c0b5963cf5';

app.listen(port, () => {
    console.log(`Listening to Port ${port}`)
});

app.get('/backend/user/:username', (req, res) => {
    let username = req.params.username;
    getSummoner(username).then(data => {
        if(data !== undefined) {
            getMatches(data.accountId).then(data => {
                if (data !== undefined) {
                    res.send(data);
                } else {
                    res.send({userAvailable: true, matchesAvailable: false});
                }
            });
        } else {
            res.send({userAvailable: false});
        }
    }).catch(err => {
        console.log("error", err);
    })
});

app.get('/backend/match/:match', (req, res) => {
    let matchId = req.params.match;
    getMatch(matchId).then(data => {
        res.send(data);
    }).catch(err => {
        console.log("error", err);
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
                userAvailable: true,
                matchesAvailable: true,
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