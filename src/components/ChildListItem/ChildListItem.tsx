import ListItem from '@mui/material/ListItem';
import {Child} from '../../types/Child';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

type Props = {
	data: Child;
	onCheckIn: (id: string) => void;
	onCheckOut: (id: string) => void;
};

export default function ChildListItem({data, onCheckIn, onCheckOut}: Props) {
	const handleCheckIn = () => {
		console.log(`'Trying to checkin in ${data.childId}`);
		onCheckIn(data.childId); // Pass childId to check in
	};

	const handleCheckOut = () => {
		onCheckOut(data.childId); // Pass childId to check out
	};
	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar alt={data.name.fullName} src={data.image.small} />
			</ListItemAvatar>
			<ListItemText>{data.name.fullName}</ListItemText>
			{data.checkedIn ? (
				<Button color='secondary' sx={{minWidth: 150}} onClick={handleCheckOut}>
					Check out
				</Button>
			) : (
				<Button color='primary' sx={{minWidth: 150}} onClick={handleCheckIn}>
					Check in
				</Button>
			)}
		</ListItem>
	);
}
