import { IFormSection ,IForm} from '../../../../services/v1/helper/interfaceManagement'
import { IPaginate } from '../../../../services/v1/helper/interfaceManagement'
export default {
    getOneSection : (data: IFormSection | null) => {
         return {
            id: data?._id,
            data
         }
    },
    getSectionList : (docs: IFormSection[] | null[] ) => {
        return docs.map(data => {
            return {
                id:data?._id,
                data:{
                    title:data?.title
                }
            }
        })
    },
    getOneForm : (data: IForm | null) => {
        return {
           id: data?._id,
           data
        }
   },
}