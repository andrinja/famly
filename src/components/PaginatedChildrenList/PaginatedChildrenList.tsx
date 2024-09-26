import {Child} from '../../types/Child';
import {ChangeEvent, useState} from 'react';
import ChildListItem from '../ChildListItem/ChildListItem';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import {useCheckInMutation} from '../../hooks/useCheckInMutation';
import {useCheckOutMutation} from '../../hooks/useCheckOutMutation';
import {useChildren} from '../../hooks/useChildren';

const ITEMS_PER_PAGE = 5;

export default function PaginatedChildrenList() {
	const [page, setPage] = useState(1);
	const checkInMutation = useCheckInMutation();
	const checkOutMutation = useCheckOutMutation();

	const groupId = '86413ecf-01a1-44da-ba73-1aeda212a196';
	const institutionId = 'dc4bd858-9e9c-4df7-9386-0d91e42280eb';

	const {data: children} = useChildren(groupId, institutionId);

	if (!children) {
		return;
	}
	const pageCount = Math.ceil(children.length / ITEMS_PER_PAGE);

	const currentPage = children.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
	const handleChange = (_: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<>
			<List sx={{minHeight: 350, width: '100%'}}>
				{currentPage.map((child: Child) => (
					<ChildListItem
						key={child.childId}
						data={child}
						onCheckIn={() => checkInMutation.mutate(child.childId)} // Pass the mutate function directly
						onCheckOut={() => checkOutMutation.mutate(child.childId)}
					/>
				))}
			</List>
			<Pagination color='primary' count={pageCount} page={page} onChange={handleChange} />
		</>
	);
}
