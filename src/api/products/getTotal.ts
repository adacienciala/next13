import {
	ProductsGetAllTotalDocument,
	ProductsGetByCategoryTotalDocument,
	ProductsGetByCollectionTotalDocument,
} from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";
import { type TCategoryList, type TCollectionList } from "@/types";

export const getTotal = async (params?: TCategoryList | TCollectionList) => {
	let res = undefined;
	if (params?.category) {
		res = await executeGraphql({
			query: ProductsGetByCategoryTotalDocument,
			variables: { slug: params?.category },
		});
	} else if (params?.collection) {
		res = await executeGraphql({
			query: ProductsGetByCollectionTotalDocument,
			variables: { slug: params?.collection },
		});
	} else {
		res = await executeGraphql({ query: ProductsGetAllTotalDocument });
	}
	const total = res.productsConnection.aggregate.count;
	return total;
};
