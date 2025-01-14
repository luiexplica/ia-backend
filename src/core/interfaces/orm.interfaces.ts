
import { EntityManager, FilterQuery, FindOneOptions, FindOptions, PopulatePath } from "@mikro-orm/core";
import { Pagination_Dto } from "../dto/pagination.dto";

export interface _Find_One_I<T extends object, J extends string> {
  find: FilterQuery<T>,
  options?: FindOneOptions<T, J>,
  _em?: EntityManager
}

export interface _Find_Many_I<T extends object> {
  find: FilterQuery<T>,
  options?: FindOptions<T>,
  pagination?: Pagination_Dto,
  _em?: EntityManager
}

export interface _Process_Save_I<T = any> {
  save: T,
  _em?: EntityManager
}

export interface _Process_Update_I<T = any> {
  find: FilterQuery<T>,
  update?: Partial<T>,
  _em?: EntityManager
}

export interface _Process_Delete_I<T = any> {
  find: FilterQuery<T>,
  _em?: EntityManager
}