import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Child} from '../types/Child';
import {api} from '../utils/api';

const ChildrenContext = createContext<
	| {
			data: Child[];
			handleCheckIn: (id: string) => void;
			handleCheckOut: (id: string) => void;
	  }
	| undefined
>(undefined);

export const ChildrenContextProvider = ({
	defaultData = [],
	children,
}: {
	defaultData?: Child[];
	children: ReactNode;
}) => {
	const [data, setData] = useState<Child[]>(defaultData);

	useEffect(() => {
		const fetchChildren = async () => {
			const {children} = await api.get<{children: Child[]}>('/daycare/tablet/group', {
				groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
				institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb',
			});

			if (children) {
				setData(children);
			}
		};

		fetchChildren();
	}, []);

	const handleCheckIn = (id: string) => {
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

	const handleCheckOut = (id: string) => {
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
		<ChildrenContext.Provider value={{data, handleCheckIn, handleCheckOut}}>
			{children}
		</ChildrenContext.Provider>
	);
};

export const useChildrenContext = () => {
	const context = useContext(ChildrenContext);

	if (context === undefined) {
		throw new Error('useChildrenContext must be used within ChildrenContextProvider');
	}
	return context;
};
