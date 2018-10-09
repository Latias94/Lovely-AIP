import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import PropTypes from 'prop-types';

export default function KFAccountInput(props) {
	const {
		className, error, id, value, name, type, onChange, onKeyDown, placeholder
	} = props;
	return (
		<FormControl className={className} error={!!error} aria-describedby={`${id}-helper-text`}
                     style={{width:'330px'}}>
			<InputLabel htmlFor={`${id}-helper`}>{name}</InputLabel>
			<Input id={id} value={value} type={type} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder}/>
			{error && <FormHelperText id={`${id}-helper-text`}>{error}</FormHelperText>}
		</FormControl>
	);
}

KFAccountInput.propTypes = {
	className: PropTypes.string.isRequired,
	error: PropTypes.object,
	id: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func,
	placeholder: PropTypes.string,
};
