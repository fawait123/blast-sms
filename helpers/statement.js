const { Op } = require("sequelize");

class Statement {
  constructor(query, field) {
    this.query = query;
    this.field = field;
    this.limit = query.limit === undefined ? 10 : parseInt(query.limit);
    this.page =
      query.page === undefined ? 0 : (parseInt(query.page) - 1) * this.limit;
    this.pageDisplay = parseInt(query.page) || 1;
  }
  search() {
    if (this.query.query !== undefined) {
      if (this.query.query !== "") {
        if (this.field !== undefined) {
          let obj = {};
          this.field.map((item) => {
            obj[item] = {
              [Op.like]: `%${this.query.query}%`,
            };
          });
          return { [Op.or]: obj };
        }
      }
    }
  }
  eagerSorting() {
    if (!this.query.query) {
      if (typeof this.query.sort !== "undefined") {
        if (Array.isArray(this.query.sort)) {
          if (this.query.sort.length > 0) {
            let sortData = this.query.sort.map((el) => JSON.parse(el));
            return sortData;
          }
        }
        let sortData = JSON.parse(this.query.sort);

        if (sortData.length === 0) {
          return [];
        }
        if (typeof sortData === "string") {
          return [];
        }
        return [sortData];
      }
    }
  }
}

module.exports = Statement;
