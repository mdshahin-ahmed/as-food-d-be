import { JwtPayload } from 'jsonwebtoken'
import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>
  public user?: JwtPayload

  constructor(
    modelQuery: Query<T[], T>,
    query: Record<string, unknown>,
    user?: JwtPayload,
  ) {
    this.modelQuery = modelQuery
    this.query = query
    this.user = user
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm?.toString()?.toLowerCase()
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              // [field]: { $regex: searchTerm, $options: 'i' },
              $expr: {
                $eq: [
                  { $toLower: `$${field}` }, // Convert field value to lowercase
                  searchTerm, // Compare with normalized searchTerm
                ],
              },
            }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }

  filter() {
    const queryObj = { ...this.query }
    const user = this.user
    // filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((el) => delete queryObj[el])
    if (queryObj.status && typeof queryObj.status === 'string') {
      const statusArray = queryObj.status.split(',')
      // Update queryObj to use $in for the status
      queryObj.status = { $in: statusArray }
    }
    if (user?.role === 'user') {
      queryObj.user = user?._id
      // queryObj.status = { $in: ['delivered', 'pending'] }
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

    return this
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',').join(' ') || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)

    return this
  }

  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 20
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)

    return this
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(fields)

    return this
  }

  async countTotal() {
    const query = this.modelQuery.getFilter()
    const total = await this.modelQuery.model.countDocuments(query)
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 20
    const totalPage = Math.ceil(total / limit)

    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder
