import _ from 'lodash';

export const updateStateWithValue =
    _.curry((key, state, value) =>
        Object.assign({}, state, {
            [key]: value,
        })
    );
export const updateStateWithPayload =
    _.curry((key, state, action) =>
        updateStateWithValue(key, state, merge(state[key], action.payload))
    );
export const clearState =
    _.curry((key, state) =>
        updateStateWithValue(key, state, emptyValue(state[key]))
    );

// private

const emptyValue = (a) => {
    if (_.isMap(a)) return new Map();
    if (_.isSet(a)) return new Set();
    if (_.isArray(a)) return [];
    return null;
};
const merge = (a, b) => {
    if (_.isMap(a)) {
       if(_.isMap(b) || is2dArray(b)) {
            return mergeMaps(a, b);
       } else if(_.isArray(b)) {
           return mergeMaps(a, [b]);
       }
    } else if (_.isSet(a) && _.isSet(b)) {
        return mergeSets(a, b);
    } else if (_.isArray(a) && _.isArray(b)) {
        return [].concat(a, b);
    }
    // if literal
    return b;
};
const is2dArray = (a) => _.isArray(a[0]);
const mergeCollection = (C, a, b) => new C([].concat(
    Array.from(a),
    Array.from(b),
));
const mergeSets = _.partial(mergeCollection, Set);
const mergeMaps = _.partial(mergeCollection, Map);
