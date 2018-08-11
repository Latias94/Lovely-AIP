import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

export default function KFInput(props) {
	const {
		className, error, id, value, name, type, onChange,
	} = props;
	return (
		<FormControl className={className} error={!!error} aria-describedby={`${id}-helper-text`}>
			<InputLabel htmlFor={`${id}-helper`}>{name}</InputLabel>
			<Input id={id} value={value} type={type} onChange={onChange}/>
			{error && <FormHelperText id={`${id}-helper-text`}>{error}</FormHelperText>}
		</FormControl>
	);
}

// TODO: PropsType