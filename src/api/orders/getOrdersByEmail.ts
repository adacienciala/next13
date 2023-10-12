import { OrdersGetByEmailDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const getOrdersByEmail = async (email: string) => {
	const res = await executeGraphql({
		query: OrdersGetByEmailDocument,
		variables: {
			email,
		},
	});
	return res.orders;
};
