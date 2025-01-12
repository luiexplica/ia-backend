
import { PaginationMeta_I } from "@core/helpers/pagination.meta";

export interface Response_I<T = any> {
  ok?: boolean;
  statusCode?: number;
  path?: string;
  data?: T;
  message?: any;
  paginator?: PaginationMeta_I;
  err?: any;
  context?: string;
}
