'use strict';

import _ from 'lodash';

function getMapFrom(maps, keyword) {
    if(!keyword) {
        return _.sample(maps);
    }

    let allMapsWithKeywordVotes = _initialiseVotesForMapsWithoutKeywordVote(maps, keyword);

    let mapsToSelectFrom = _getMapListFavouringUpvotedMaps(allMapsWithKeywordVotes, keyword);

    if (mapsToSelectFrom.length === 0) {
        mapsToSelectFrom = allMapsWithKeywordVotes;
    }

    return _.sample(mapsToSelectFrom);
}

function _initialiseVotesForMapsWithoutKeywordVote(maps, keyword) {
    let keywordVoteMap =_.map(maps, (map) => {
        if (!_.has(map, 'votes')) {
            map.votes = {};
        }

        if (_.has(map.votes, keyword)) {
            return map;
        }

        map.votes[keyword] = 0;
        return map;
    });

    return keywordVoteMap;
}

function _getMapListFavouringUpvotedMaps(maps, keyword) {
    let biasedMapList = [];

    _.forEach(maps, (map) => {
        if (map.votes[keyword] < 0) {
            return;
        }

        for(let i = 0; i < map.votes[keyword] + 1; ++i) {
            biasedMapList.push(map);
        }
    });

    biasedMapList = _.shuffle(biasedMapList);

    return biasedMapList;
}

export default { getMapFrom: getMapFrom };
