import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Reviews, ReviewsRelations} from '../models';

export class ReviewsRepository extends DefaultCrudRepository<
  Reviews,
  typeof Reviews.prototype.id,
  ReviewsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Reviews, dataSource);
  }
}
