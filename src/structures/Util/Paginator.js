class Paginator {
  constructor(items, itemsPerPage = 10) {
    this.items = items;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  }

  getCurrentPageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
  }

  goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      return false;
    }
    this.currentPage = pageNumber;
    return true;
  }

  nextPage() {
    return this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    return this.goToPage(this.currentPage - 1);
  }
}

module.exports = Paginator;