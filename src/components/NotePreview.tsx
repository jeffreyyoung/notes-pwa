import React from 'react';
import formatTimestamp from '../util/formatTimestamp';
const NotePreview: React.FC<{ isActive:boolean, text: string, timestamp: number, onClick: () => any }> = (props) => {
    return (<div tabIndex={0} role="button" className={'note-preview-wrapper'+ (props.isActive ? ' is-active': '')} onClick={props.onClick}>
        <p style={{marginBottom: 0, fontSize: 10, wordBreak: 'break-all'}}>{props.text.substr(0, 50)+'...'}</p>
        <h5>{formatTimestamp(props.timestamp)}</h5>
    </div>);
}

export default NotePreview;