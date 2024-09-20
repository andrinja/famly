import ListItem from '@mui/material/ListItem';
import {Child} from '../../types/Child';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import {api} from '../../utils/api';

type Props = {
	data: Child;
	onCheckIn: (id: string) => void;
	onCheckOut: (id: string) => void;
};

export default function ChildListItem({data, onCheckIn, onCheckOut}: Props) {
	const handleCheckIn = async () => {
		onCheckIn(data.childId);
		try {
			await api.post(`/v2/children/${data.childId}/checkins`);
		} catch (_) {
			onCheckOut(data.childId);
		}
	};

	const handleCheckOut = async () => {
		onCheckOut(data.childId);
		try {
			await api.post(`/v2/children/${data.childId}/checkout`);
		} catch (_) {
			onCheckIn(data.childId);
		}
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
