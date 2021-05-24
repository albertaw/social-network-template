import React from 'react';
import classnames from 'classnames';
import proptTypes from 'prop-types';

const TextFieldGroup = (props) => {
    return (
        <div className="mb-3">
            <input 
                type={props.type} 
                className={classnames('form-control', {
                    'is-invalid': props.error
                })} 
                name={props.name} 
                placeholder={props.placeholder} 
                value={props.value}
                onChange={props.onChange} 
                disabled={props.disabled} />
            {props.info && <small className="form-text text-muted">{props.info}</small>}
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    )
}

export default TextFieldGroup;