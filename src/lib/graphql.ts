// import { type TypedDocumentString } from "@/gql/graphql";

type GraphQLResponse<T> =
	| { data?: undefined; errors: { message: string }[] }
	| { data: T; errors?: undefined };

export const executeGraphql = async <TResult, TVariables>(
	// query: TypedDocumentString<TResult, TVariables>,
	query: string,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> => {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer 0f39a5f9870e8521dec6ea55d278b0c7a7f01c674aef602fe716f43e11dc981e3f0512f1a7a6ecdc9c9ebb2ff31c7fbd31c4d2348599e827b5101017ad229c66944a23a012913ffc9a2221bbe24e56d7d4439884d1e00381cc38eb4ba1c3f41164879a6ed848f1225132896dce6efdff84dfa06c69b97cad7775ae0482f138c0",
		},
	});

	const graphqlResponse = (await res.json()) as GraphQLResponse<TResult>;

	if (graphqlResponse.errors) {
		console.log("graphqlResponse.errors", graphqlResponse.errors);
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
};
