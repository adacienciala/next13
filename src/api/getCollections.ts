import { CollectionsGetAllDocument } from "@/gql/graphql";
import { executeGraphql } from "@/lib/graphql";

export const getCollections = async () => {
	const res = await executeGraphql(CollectionsGetAllDocument);
	return res.collections;
};
