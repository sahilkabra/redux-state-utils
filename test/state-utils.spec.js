import * as StateUtils from '../src/state-utils';
import {updateStateWithValue} from '../src/state-utils';
import {expect} from 'chai';

describe('redux state utils', () => {
    const state = {
        key: 'value',
        notUpdated: 'no',
        emptymap: new Map(),
        mergeMap: new Map([['v', 2]]),
        emptySet: new Set(),
        mergeSet: new Set([1, 2]),
        emptyArray: [],
        mergeArray: [1, 2],
    };
    it('updates state with key and value passed', () => {
        const updateKey = StateUtils.updateStateWithValue('key');
        const newState = updateKey(state, 'updatedValue');
        const expectedState = Object.assign({}, state, {key: 'updatedValue'});
        expect(newState).to.deep.equal(expectedState);
    });
    it('updates state with key and payload from object passed', () => {
        const updateKey = StateUtils.updateStateWithPayload('key');
        const newState = updateKey(state, {payload: 'updatedValue'});
        const expectedState = Object.assign({}, state, {key: 'updatedValue'});
        expect(newState).to.deep.equal(expectedState);
    });
    it('clears state for literals', () => {
        const clearStateForKey = StateUtils.clearState('key');
        const newState = clearStateForKey(state);
        const expectedState = Object.assign({}, state, {key: null});
        expect(newState).to.deep.equal(expectedState);
    });
    describe('for collections', () => {
        it('merges state with key and map passed#empty map', () => {
            const updateKey = StateUtils.updateStateWithPayload('emptymap');
            const newState = updateKey(state, {payload: new Map([['updatedValue', true]])});
            const expectedState = Object.assign({}, state, {emptymap: new Map([['updatedValue', true]])});
            expect(newState).to.deep.equal(expectedState);
        });
        it('merges state with key and map passed#non empty map', () => {
            const updateKey = StateUtils.updateStateWithPayload('mergeMap');
            const newState = updateKey(state, {payload: new Map([['updatedValue', true]])});
            const expectedState = Object.assign({}, state, {
                mergeMap: new Map([
                    ['updatedValue', true],
                    ['v', 2],
                ])});
            expect(newState).to.deep.equal(expectedState);
        });
        it('merges state with key and array passed#non empty map', () => {
            const updateKey = StateUtils.updateStateWithPayload('mergeMap');
            const newState = updateKey(state, {payload: ['updatedValue', true]});
            const expectedState = Object.assign({}, state, {
                mergeMap: new Map([
                    ['updatedValue', true],
                    ['v', 2],
                ])});
            expect(newState).to.deep.equal(expectedState);
        });
        it('merges state with key and set passed#empty set', () => {
            const updateKey = StateUtils.updateStateWithPayload('emptySet');
            const newState = updateKey(state, {payload: new Set([1, 3])});
            const expectedState = Object.assign({}, state, {emptySet: new Set([1, 3])});
            expect(newState).to.deep.equal(expectedState);
        });
        it('merges state with key and set passed#non empty set', () => {
            const updateKey = StateUtils.updateStateWithPayload('mergeSet');
            const newState = updateKey(state, {payload: new Set([1, 3])});
            const expectedState = Object.assign({}, state, {
                mergeSet: new Set([1, 2, 3])});
            expect(newState).to.deep.equal(expectedState);
        });
        it('merges state with key and array passed#empty array', () => {
            const updateKey = StateUtils.updateStateWithPayload('emptyArray');
            const newState = updateKey(state, {payload: [1, 3]});
            const expectedState = Object.assign({}, state, {emptyArray: [1, 3]});
            expect(newState).to.deep.equal(expectedState);
        });
        it('merges state with key and array passed#non empty array', () => {
            const updateKey = StateUtils.updateStateWithPayload('mergeArray');
            const newState = updateKey(state, {payload: [1, 3]});
            const expectedState = Object.assign({}, state, {mergeArray: [1, 2, 1, 3]});
            expect(newState).to.deep.equal(expectedState);
        });
        it('clears state for maps', () => {
            const clearStateForKey = StateUtils.clearState('mergeMap');
            const newState = clearStateForKey(state);
            const expectedState = Object.assign({}, state, {mergeMap: new Map()});
            expect(newState).to.deep.equal(expectedState);
        });
        it('clears state for sets', () => {
            const clearStateForKey = StateUtils.clearState('mergeSet');
            const newState = clearStateForKey(state);
            const expectedState = Object.assign({}, state, {mergeSet: new Set()});
            expect(newState).to.deep.equal(expectedState);
        });
        it('clears state for arrays', () => {
            const clearStateForKey = StateUtils.clearState('mergeArray');
            const newState = clearStateForKey(state);
            const expectedState = Object.assign({}, state, {mergeArray: []});
            expect(newState).to.deep.equal(expectedState);
        });
    });
});
