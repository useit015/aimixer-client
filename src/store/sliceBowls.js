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
        },
        bowlsAddContent: (state, action) => {
            const { id, content} = action.payload;
            const bowl = state.find(s => s.id === id)
            if (bowl) {
                bowl.contents.push(content);
                return state;
            }
        },
        bowlsChangeContentDate: (state, action) => {
            const { bowlId, contentId, date} = action.payload;
            const bowl = state.find(s => s.id === bowlId)
            if (bowl) {
                const test = bowl.contents.find(c => c.id === contentId);
                if (test) test.date = date;
                return state;
            }
        },
        bowlsSetInfo: (state, action) => {
            const { bowlId, info } = action.payload;
            const bowl = state.find(s => s.id === bowlId);
            if (bowl) {
                for (let i = 0; i < info.length; ++i) {
                    const content = bowl.contents[i];
                    if (!content) continue;
                    content.infoLink = info[i].infoLink;
                    content.infoLength = info[i].infoLength;
                }
                return state;
            }
        },
        bowlsSetFacts: (state, action) => {
            const { bowlId, info } = action.payload;
            const bowl = state.find(s => s.id === bowlId);
            if (bowl) {
                for (let i = 0; i < info.length; ++i) {
                    const content = bowl.contents[i];
                    if (!content) continue;
                    content.facts = info[i];
                }
                return state;
            }
        },
        bowlsAddCreation: (state, action) => {
            const { bowlId, creation } = action.payload;
            const bowl = state.find(s => s.id === bowlId);
            if (bowl) {
                bowl.creations.push(creation);
                return state;
            }
        },
        bowlsSetCustomInstructions: (state, action) => {
            const { bowlId, customInstructions } = action.payload;
            const bowl = state.find(s => s.id === bowlId);
            if (bowl) {
                bowl.customInstructions = customInstructions;
                return state;
            }
        },
        bowlsDeleteContent: (state, action) => {
            const { bowlId, contentId } = action.payload;
            const bowl = state.find(s => s.id === bowlId);
            if (bowl) {
                bowl.contents = bowl.contents.filter(c => c.id !== contentId);
                return state;
            }
        }
    }
});

export const { bowlsAddBowl, bowlsSetBowls, bowlsDeleteBowl, bowlsChangeContentDate, bowlsSetInfo, bowlsSetFacts, bowlsSetCustomInstructions  } = bowlsSlice.actions;

export default bowlsSlice.reducer;