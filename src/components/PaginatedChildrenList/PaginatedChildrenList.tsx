import { Child } from '../../types/Child';
import { ChangeEvent, useState } from 'react';
import ChildListItem from '../ChildListItem/ChildListItem';
import { useChildrenContext } from '../../contexts/ChildrenContext';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';

const ITEMS_PER_PAGE = 5;

export default function PaginatedChildrenList() {
	const [page, setPage] = useState(1);
	const { data: children } = useChildrenContext();
	const pageCount = Math.ceil(children.length / ITEMS_PER_PAGE);

	const currentPage = children.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE
	);

	const handleChange = (_: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<>
			<List>
				{currentPage.map((child: Child) => (
					<ChildListItem key={child.childId} data={child} />
				))}
			</List>
			<Pagination
				color='primary'
				count={pageCount}
				page={page}
				onChange={handleChange}
			/>
		</>
	);
}
