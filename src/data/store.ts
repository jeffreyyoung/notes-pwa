import { createSlice } from 'redux-starter-kit'
import { createStore, combineReducers, Action } from 'redux'
import Plain from 'slate-plain-serializer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const getDefaultDoc = () => ({
    preview: 'Write some markdown...',
    value: Plain.deserialize('Write some markdown...').toJSON(),
    id: (new Date()).getTime(),
    lastUpdated: (new Date()).getTime()
});

const defaultDoc = getDefaultDoc();

export type ActionType<T> = {
    type: string
    payload: T
}

export type Doc = {
    preview: string,
    value: any,
    id: number,
    lastUpdated: number
}

export type AppState = {
    docs: string[],
    activeDocId: string
    docsById: {
        [id: string]: Doc
    }
}
export const docsModule = createSlice({
    initialState: {
        docs: [defaultDoc.id],
        activeDocId: defaultDoc.id,
        docsById: {
            [defaultDoc.id]: defaultDoc
        }
    },
    reducers: {
        update: (state, action: ActionType<{id: number, value: any, preview: string}>) => {
            const idAndValue = action.payload;
            const docId = idAndValue.id;
            const nextValue = idAndValue.value;

            const doc = state.docsById[docId];

            doc.value = idAndValue.value;
            doc.lastUpdated = (new Date()).getTime();
            doc.preview = idAndValue.preview;
            state.docs.sort((a, b) => state.docsById[b].lastUpdated - state.docsById[a].lastUpdated);
        },
        create: (state) => {
            console.log('create', state);
            let newDoc = getDefaultDoc();
            state.docsById[newDoc.id] = newDoc;
            state.activeDocId = newDoc.id;
            state.docs.unshift(newDoc.id);
        },
        updateActiveDoc: (state, action: ActionType<number>) => {
            const id = action.payload;
            state.activeDocId = id;
        }
    }
})


const persistConfig = {
    key: 'root',
    storage,
  }

  

const persistedReducer = persistReducer(persistConfig, docsModule.reducer);

let j:any = window;



export default () => {
    const store = createStore(
        persistedReducer,
        j.__REDUX_DEVTOOLS_EXTENSION__ && j.__REDUX_DEVTOOLS_EXTENSION__()
    )
    let persistor = persistStore(store)
    return { store, persistor }
  }
