function getPeriod(begin_date, end_date) {
    let beginAt = new Date(begin_date);
    let endAt = new Date(end_date);

    console.log(beginAt);
    console.log(endAt);

    let total = (endAt - beginAt) / (24 * 60 * 60 * 1000);
    let period_number = 10 - 1;
    let per_period = total / period_number;

    let matchday = [];

    matchday.push(beginAt);

    for(let i = 0; i < period_number-1; i++) {
        let tmp = new Date(beginAt);
        tmp.setDate(tmp.getDate() + per_period*(i+1));
        matchday.push(tmp);
    }

    matchday.push(endAt);

    let log = console.log;
    //log(matchday);

    return matchday;
}


// console.log('hello');
function getShuffleGames(teams, start_date, end_date) {
    let games_1 = [];
    let games_2 = [];

    for(var i = 0; i < teams.length; i++) {
        for(var j = i; j < teams.length; j++) {
            if(teams[i] === teams[j])   continue;
            games_1.push([teams[i], teams[j]]);
        }
    }

    // let log = console.log;
    // log(games_1);

    for(let i = 0; i < games_1.length; i++) {
        games_2.push([games_1[i][1], games_1[i][0]]);
    }

    // log();
    games_1 = games_1.concat(games_2);
    // log(games_1);

    for(let i = games_1.length-1; i >= 0; i--) {
        let index = Math.floor(Math.random() * (i));
        let temp = games_1[index];
        games_1[index] = games_1[i];
        games_1[i] = temp;
    }

    // log('after shuffle');
    // for(let i in games_1) {
    //     log(i, games_1[i]);
    // }

    let games = games_1;

    let matchday = getPeriod(start_date, end_date);
    // log(matchday);

    function oneOrTwo() {
        let res = Math.random();
        if(res >= 0.5) {
            return 1;
        } else {
            return 2;
        }
    }

    let matchday_and_games = [];
    //当前处理的比赛的下标，因为要进行选择，一个比赛周期里面的三场比赛一定要是三只不同的球队
    let index = 0;

    let team_occur_time = {};
    for(let j = 0; j < teams.length; j++) {
        team_occur_time[teams[j]] = 0;
    }

    // log('team_occur_time');
    // log(team_occur_time);

    // 看来要递归呀
    // 因为随机的排列可能不能满足这样的条件

    for(let i = 0; i < matchday.length; i++) {
        //一个比赛周期的时间，一天或者两天
        let period_last = oneOrTwo();

        for(let j in team_occur_time) {
            team_occur_time[j] = 0;
        }

        // log(team_occur_time);

        let cur_date = new Date(matchday[i]);
        if(period_last == 2) {
            cur_date.setDate(cur_date.getDate() + oneOrTwo() - 1);
        }

        // console.log('cur date: '+cur_date);
        cur_date.toISOString().substring(0, 10);

        matchday_and_games.push({
            'turn': i+1,
            'matchday': cur_date.toISOString().substring(0, 10),
            'home_team': games[index][0],
            'away_team': games[index][1]
        });
        team_occur_time[games[index][0]] = 1;
        team_occur_time[games[index][1]] = 1;

        index ++;
        for(let k = 0; k < 2; k++) {
            let cur_index = index;
            while(cur_index < games.length && (team_occur_time[games[cur_index][0]] == 1 || team_occur_time[games[cur_index][1]] == 1)) {
                // log('march_on');
                cur_index ++;
                if(cur_index >= games.length) {
                    // log('cur_index=', cur_index, 'index=', index);
                    // log('out of range');
                    break;
                }
            }

            if(cur_index < games.length && cur_index != index) {
                [games[cur_index], games[index]] = [games[index], games[cur_index]];
            }

            let cur_date = new Date(matchday[i]);
            if(period_last == 2) {
                cur_date.setDate(cur_date.getDate() + oneOrTwo() - 1);
                // log(cur_date, 'matchday[i]', matchday[i]);
            }

            cur_date.toISOString().substring(0, 10);

            matchday_and_games.push({
                'turn': i+1,
                'matchday': cur_date.toISOString().substring(0, 10),
                'home_team': games[index][0],
                'away_team': games[index][1]
            });
            team_occur_time[games[index][0]] = 1;
            team_occur_time[games[index][1]] = 1;
            index++;
        }


        // if(period_last == 1) {

        // } else {

        // }
    }

    // log('index = ' + index);

    // log(matchday_and_games);

    matchday_and_games.sort(function(a, b) {
        let date_a = new Date(a.matchday);
        let date_b = new Date(b.matchday);
        if(date_a > date_b) {
            return 1;
        } else if(date_a == date_b) {
            return 0;
        } else {
            return -1;
        }
    });

    return matchday_and_games;

    // for(let i = 0; i < matchday_and_games.length; i++) {
    //     log(matchday_and_games[i]);
    //     let j = i+1;
    //     while(j < matchday_and_games.length && matchday_and_games[j]['matchday'] == matchday_and_games[i]['matchday']) {
    //         log(matchday_and_games[j]);
    //         j++;
    //     }
    //     i = j-1;
    //     log();
    // }
}

// 能不能有一个更好的算法呢

module.exports = getShuffleGames;