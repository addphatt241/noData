/* eslint-disable no-param-reassign */

/**
 * @typedef {Object} QueryResult
 * @property {Document[]} results - Results found
 * @property {number} page - Current page
 * @property {number} limit - Maximum number of results per page
 * @property {number} totalPages - Total number of pages
 * @property {number} totalResults - Total number of documents
 */

/**
 * Query for documents with pagination
 * @param {import('mongoose').Model} schema - The Mongoose model schema
 * @returns {void}
 */
const paginate = (schema: any) => {
    schema.statics.paginate = async function (filter: any = {}, options: any = {}): Promise<any> {
      if (filter.keyword) {
        const { keyword } = filter;
        filter.name = { $regex: keyword, $options: 'i' };
        delete filter.keyword;
      }

      let sort = '';
      if (options.sortBy) {
        const sortingCriteria: string[] = [];
        options.sortBy.split(',').forEach((sortOption: string) => {
          const [key, order] = sortOption.split(':');
          sortingCriteria.push((order === 'desc' ? '-' : '') + key);
        });
        sort = sortingCriteria.join(' ');
      } else {
        sort = 'createdAt';
      }

      const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
      const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
      const skip = (page - 1) * limit;

      const countPromise = this.countDocuments(filter).exec();
      let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

      if (options.populate) {
        options.populate.split(',').forEach((populateOption: any) => {
          docsPromise = docsPromise.populate(
            populateOption
              .split('.')
              .reverse()
              .reduce((a: any, b: any) => ({ path: b, populate: a }))
          );
        });
      }

      docsPromise = docsPromise.exec();

      return Promise.all([countPromise, docsPromise]).then((values: any) => {
        const [totalResults, results] = values;
        const totalPages = Math.ceil(totalResults / limit);
        const result = {
          results,
          page,
          limit,
          totalPages,
          totalResults,
        };
        return Promise.resolve(result);
      });
    };
  };

  export default paginate;
