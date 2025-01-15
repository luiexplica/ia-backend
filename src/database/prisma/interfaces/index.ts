
import { Pagination_Dto } from "@core/dto/pagination.dto";

export interface Prisma_FindMany_I<T> {
  model: any,
  args?: T,
  pagination: Pagination_Dto
}