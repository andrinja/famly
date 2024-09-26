import {useMutation, useQueryClient} from '@tanstack/react-query';
import {api} from '../utils/api';
import {Child} from '../types/Child';

export const useCheckInMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => await api.post(`/v2/children/${id}/checkins`),
		// when mutate is called
		onMutate: async (id: string) => {
			// cancel any outdated refetches
			// so they don't overwrite our optimistic update
			await queryClient.cancelQueries({queryKey: ['children']});
			// sanpshot the previous value
			const previousChildren = queryClient.getQueryData(['children']);
			// optimistically update to the new value
			queryClient.setQueryData<Child[]>(['children'], (previous) => {
				return previous?.map((child) => {
					if (child.childId === id) {
						return {
							...child,
							checkedIn: true,
						};
					}
					return child;
				});
			});
			// return a context object with the snapshoted value
			return {previousChildren};
		},
		// always refetch after error or success
		onSettled: () => {
			queryClient.invalidateQueries({queryKey: ['children']});
		},
		//if mutation fails, use the context returned from onMutate to roll back
		onError: (_: Error, __: string, context) => {
			queryClient.setQueryData(['children'], context?.previousChildren);
		},
	});
};
