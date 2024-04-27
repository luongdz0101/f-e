// import { Input } from 'antd';
import React from 'react';


function InputForm(props) {
    const { placeholder = 'Nhập text', handleOnChange, ...rests } = props;
    const handleOnChangeInput = (e) => {
        handleOnChange(e.target);
    };
    return (
        <div>
            <input 
            placeholder={placeholder} 
            value={props.value} 
            onChange={handleOnChangeInput} 
            
            {...rests} />
        </div>
    );
}

export default InputForm;
