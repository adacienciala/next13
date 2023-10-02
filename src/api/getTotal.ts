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
		res = await executeGraphql(ProductsGetByCategoryTotalDocument, { slug: params?.category });
	} else if (params?.collection) {
		res = await executeGraphql(ProductsGetByCollectionTotalDocument, { slug: params?.collection });
	} else {
		res = await executeGraphql(ProductsGetAllTotalDocument);
	}
	const total = res.productsConnection.aggregate.count;
	return total;
};
