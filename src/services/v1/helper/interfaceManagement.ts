import { ICategory } from "../../../modules/v1/category/model";

export interface IPaginate {
    docs: [ICategory] | [null],
    totalDocs: number | null,
    limit: number | null,
    totalPages: number | null,
    page: number | null,
    pagingCounter: number | null,
    hasPrevPage: boolean | null,
    hasNextPage: boolean | null,
    prevPage: number | null,
    nextPage: number | null
}
