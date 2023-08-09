import { createSlice } from '@reduxjs/toolkit';

const bowlsSlice = createSlice({
    name: 'bowls',
    initialState: [],
    reducers: {
        bowlsAddBowl: (state, action) => {
            state.push(action.payload)
            return state;
        },
        bowlsSetBowls: (state, action) => {
            state = action.payload;
            return state;
        },
        bowlsDeleteBowl: (state, action) => {
            const id = action.payload;
            console.log('redux id', id, state)
            const bowls = state.filter(b => b.id !== id);
            console.log('bowls', bowls);
            state = bowls;
            return state;
        },
        bowlsChangeBowlName: (state, action) => {
            const { id, name} = action.payload;
            const bowl = state.find(s => s.id === id)
            if (bowl) {
                bowl.name = name;
                return state;
            }
        },
        bowlsChangeBowlOutput: (state, action) => {
            const { id, output} = action.payload;
            const bowl = state.find(s => s.id === id)
            if (bowl) {
                bowl.output = output;
                return state;
            }
        },
        bowlsChangeBowlLength: (state, action) => {
            const { id, length} = action.payload;
            const bowl = state.find(s => s.id === id)
            if (bowl) {
                bowl.length = length;
                return state;
            }
        },
        bowlsChangeBowlSource: (state, action) => {
            const { id, source} = action.payload;
            const bowl = state.find(s => s.id === id)
            if (bowl) {
                bowl.source = source;
                return state;
            }
        }
    }
});

export const { bowlsAddBowl, bowlsSetBowls, bowlsDeleteBowl  } = bowlsSlice.actions;

export default bowlsSlice.reducer;