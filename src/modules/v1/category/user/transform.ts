import { IPaginate } from '../../../../services/v1/helper/interfaceManagement'

export default {
    getSome : (data: IPaginate) => {
        return {
            docs:data?.docs.map(data => {
                   return {
                    id: data?._id,
                    data: {
                        title:data?.title,
                        ...(data?.description && {description:data?.description}),
                        ...(data?.parentId && {parentId:data?.parentId}),
                        createdAt:data?.createdAt,
                        updatedAt:data?.updatedAt
                    }
                   }
            }),
            pagination:{
                totalDocs: data.totalDocs,
                limit: data.limit,
                totalPages: data.totalPages,
                page: data.page,
                pagingCounter: data.pagingCounter,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevPage: data.prevPage,
                nextPage: data.nextPage
            }
        }
    }
}