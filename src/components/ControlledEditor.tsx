import React, {useState} from 'react';
import Editor from './Editor';
import { Value } from 'slate'
import Plain from 'slate-plain-serializer'

const ControlledEditor: React.FC<{onChange:({value: any, preview: string}) => any, initialValue: any}> = (props) => {
    let [value, setValue] = useState(Value.fromJSON(props.initialValue));

    return (
        <Editor
            value={value}
            onChange={(next) => {
                setValue(next);
                props.onChange({
                    preview: Plain.serialize(value),
                    value: value.toJSON()
                })
            }}
        />
    );
}

export default ControlledEditor;