import Grid from '@mui/material/Grid2';
import PaginatedChildrenList from './components/PaginatedChildrenList/PaginatedChildrenList';
import { ChildrenContextProvider } from './contexts/ChildrenContext';

function App() {
	return (
		<>
			<ChildrenContextProvider>
				<Grid alignItems='center' container direction='column'>
					<PaginatedChildrenList />
				</Grid>
			</ChildrenContextProvider>
		</>
	);
}

export default App;
