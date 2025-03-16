import { Pagination_Dto } from "@luiexplica/ia-dev-services";


export interface Prisma_FindMany_I<T> {
  model: any,
  args?: T,
  pagination: Pagination_Dto
}