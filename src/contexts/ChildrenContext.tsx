import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Child } from '../types/Child';

const ChildrenContext = createContext<
	| {
			data: Child[];
			onCheckedIn: (id: string) => void;
			onCheckedOut: (id: string) => void;
	  }
	| undefined
>(undefined);

export const ChildrenContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [data, setData] = useState<Child[]>([]);

	useEffect(() => {
		const fetchChildren = async () => {
			const response = await fetch(
				`https://app.famly.co/api/daycare/tablet/group?accessToken=${
					import.meta.env.VITE_ACCESS_TOKEN
				}&groupId=86413ecf-01a1-44da-ba73-1aeda212a196&institutionId=dc4bd858-9e9c-4df7-9386-0d91e42280eb`
			);

			const data = await response.json();

			setData(data.children);
		};

		fetchChildren();
	}, []);

	const onCheckedIn = (id: string) => {
		setData((data) => {
			return data.map((child) => {
				if (id === child.childId) {
					return {
						...child,
						checkedIn: true,
					};
				}

				return child;
			});
		});
	};

	const onCheckedOut = (id: string) => {
		setData((data) => {
			return data.map((child) => {
				if (id === child.childId) {
					return {
						...child,
						checkedIn: false,
					};
				}

				return child;
			});
		});
	};

	return (
		<ChildrenContext.Provider value={{ data, onCheckedIn, onCheckedOut }}>
			{children}
		</ChildrenContext.Provider>
	);
};

export const useChildrenContext = () => {
	const context = useContext(ChildrenContext);

	if (context === undefined) {
		throw new Error(
			'useChildrenContext must be used within ChildrenContextProvider'
		);
	}
	return context;
};
