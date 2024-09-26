//this hook fetches children data using useQuery.
//The key 'children' is used to cache and refetch the data as needed

import {useQuery} from '@tanstack/react-query';
import {Child} from '../types/Child';
import {api} from '../utils/api';

export const useChildren = (institutionId: string, groupId: string) => {
	return useQuery<Child[]>({
		//uniquely identifies the query so react query knows how to cache, refetch and update data
		queryKey: ['children'],
		//function that is called to fetch the data.
		queryFn: async () => {
			const {children} = await api.get<{children: Child[]}>('/daycare/tablet/group', {
				groupId: institutionId,
				institutionId: groupId,
			});
			return children;
		},
	});
};
