// separate this into each page folder
export const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
    	padding: '5% 15%'
	},
	emailVerificationHint: {
    	padding: '10%',
		fontSize: '25px'
	},
	verticalCenter: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '15px'
	},
	horizontalCenter: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyItems: 'space-between',
		alignItems: 'center',
	}
};

// export const styles = theme => ({
// 	container: {
// 		display: 'flex',
// 		flexDirection: 'column',
// 		flexWrap: 'wrap',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 	},
// 	formControl: {
// 		margin: theme.spacing.unit,
// 	},
// 	underlineStyle: {
// 		color: 'gray',
// 		textDecoration: 'underline',
// 	},
// });
