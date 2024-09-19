import ListItem from '@mui/material/ListItem';
import { Child } from '../../types/Child';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useChildrenContext } from '../../contexts/ChildrenContext';

type Props = {
	data: Child;
};

export default function ChildListItem({ data }: Props) {
	const { onCheckedIn, onCheckedOut } = useChildrenContext();

	const handleCheckIn = async () => {
		onCheckedIn(data.childId);

		const response = await fetch(
			`https://app.famly.co/api/v2/children/${data.childId}/checkins`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Famly-Accesstoken': import.meta.env.VITE_ACCESS_TOKEN,
				},
			}
		);

		if (!response.ok) {
			onCheckedOut(data.childId);
		}
	};

	const handleCheckOut = async () => {
		onCheckedOut(data.childId);
		const response = await fetch(
			`https://app.famly.co/api/v2/children/${data.childId}/checkout`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Famly-Accesstoken': import.meta.env.VITE_ACCESS_TOKEN,
				},
			}
		);

		if (!response.ok) {
			onCheckedIn(data.childId);
		}
	};

	return (
		<ListItem>
			<ListItemAvatar>
				<Avatar alt={data.name.fullName} src={data.image.small} />
			</ListItemAvatar>
			<ListItemText
				style={{
					flex: '1',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					marginRight: 16,
				}}
			>
				{data.name.fullName}
			</ListItemText>
			{data.checkedIn ? (
				<Button color='secondary' onClick={handleCheckOut}>
					Check out
				</Button>
			) : (
				<Button color='primary' onClick={handleCheckIn}>
					Check in
				</Button>
			)}
		</ListItem>
	);
}
