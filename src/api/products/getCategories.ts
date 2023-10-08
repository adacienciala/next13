import { CategoriesGetAllDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const getCategories = async () => {
	const res = await executeGraphql({ query: CategoriesGetAllDocument });
	return res.categories;
};
