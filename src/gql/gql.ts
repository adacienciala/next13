/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment ProductItem on Product {\n  id\n  name\n  description\n  price\n  categories {\n    name\n  }\n  collections {\n    name\n  }\n  reviews {\n    rating\n  }\n  slug\n  images {\n    url\n  }\n  ...ProductVariant\n}": types.ProductItemFragmentDoc,
    "fragment ProductVariant on Product {\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n      color\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n  }\n}": types.ProductVariantFragmentDoc,
    "query ProductsGetAll($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    ...ProductItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetAllDocument,
    "query ProductsGetAllTotal {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetAllTotalDocument,
    "query ProductsGetByCategory($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategoryDocument,
    "query ProductsGetByCategoryTotal($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategoryTotalDocument,
    "query ProductsGetByCollection($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {collections_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionDocument,
    "query ProductsGetByCollectionTotal($slug: String!) {\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionTotalDocument,
    "query ProductsGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}": types.ProductsGetByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductItem on Product {\n  id\n  name\n  description\n  price\n  categories {\n    name\n  }\n  collections {\n    name\n  }\n  reviews {\n    rating\n  }\n  slug\n  images {\n    url\n  }\n  ...ProductVariant\n}"): typeof import('./graphql').ProductItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductVariant on Product {\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n      color\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n  }\n}"): typeof import('./graphql').ProductVariantFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetAll($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    ...ProductItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetAllDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetAllTotal {\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetAllTotalDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategory($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {categories_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategoryTotal($slug: String!) {\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategoryTotalDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollection($slug: String!, $first: Int, $skip: Int) {\n  products(first: $first, skip: $skip, where: {collections_some: {slug: $slug}}) {\n    ...ProductItem\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionTotal($slug: String!) {\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionTotalDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductItem\n  }\n}"): typeof import('./graphql').ProductsGetByIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
