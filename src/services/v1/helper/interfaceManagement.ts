import {ICategory} from '../../../modules/v1/category/model'
import { FormInterface } from '../../../modules/v1/form/formModel'
import { FormSectionInterface } from '../../../modules/v1/form/formSectionModel'


export interface  ICat extends ICategory{};
export interface  IForm extends FormInterface{};
export interface  IFormSection extends FormSectionInterface{};
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
