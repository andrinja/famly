import {useMutation, useQueryClient} from '@tanstack/react-query';
import {api} from '../utils/api';
import {Child} from '../types/Child';

export const useCheckOutMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => api.post(`/v2/children/${id}/checkout`),
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({queryKey: ['children']});
			const previousChildren = queryClient.getQueryData(['children']);
			queryClient.setQueryData<Child[]>(['children'], (previous) => {
				return previous?.map((child) => {
					if (child.childId === id) {
						return {
							...child,
							checkIn: false,
						};
					}
					return child;
				});
			});
			return {previousChildren};
		},
		onSettled: () => {
			queryClient.invalidateQueries({queryKey: ['children']});
		},
		onError: (error: Error, id: string) => {
			console.log(`Failed to check in child with id ${id}:`, error.message);
		},
	});
};
