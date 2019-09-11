import React, { useState } from 'react';
import './App.css';
import ControlledEditor from './components/ControlledEditor';
import NotePreview from './components/NotePreview';
import { useLocalStorage } from 'react-use';
import { useSelector, useDispatch } from 'react-redux'
import { AppState, Doc, docsModule } from './data/store';

const App: React.FC = () => {
  const docs: Doc[] = useSelector((d: AppState) => {
    return d.docs.map(id => d.docsById[id])
  });
  const activeDoc: Doc = useSelector((d: AppState) => d.docsById[d.activeDocId]);
  const dispatch = useDispatch();

  return (
    <div className='container'>
      <div className='flex'>
        {docs.map(d => <NotePreview
          isActive={d.id === activeDoc.id}
          key={d.id}
          text={d.preview}
          timestamp={d.lastUpdated}
          onClick={() => {dispatch(docsModule.actions.updateActiveDoc(d.id))}}
        />)}
        <div 
          style={{
          flexShrink: 0,
          width: 150,
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <p className='pointer' tabIndex={0} role="button"
           onClick={() => dispatch(docsModule.actions.create())} style={{backgroundColor: 'green', color: 'white', padding: 10, borderRadius: 5}}>New Note</p>
        </div>
      </div>
      <hr />
      <ControlledEditor
        key={activeDoc.id}
        initialValue={activeDoc.value}
        onChange={(payload) => {
          dispatch(docsModule.actions.update({
            id: activeDoc.id,
            value: payload.value,
            preview: payload.preview
          }))
        }} 
      />
    </div>
  );
}

export default App;
