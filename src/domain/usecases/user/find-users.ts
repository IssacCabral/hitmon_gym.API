import { IUser } from '@domain/entities/user';
import {
  PaginationData,
  PaginationParams,
} from '@domain/types/pagination-params';

export interface IFindUsers {
  execute(pagination: PaginationParams): Promise<PaginationData<IUser>>;
}
