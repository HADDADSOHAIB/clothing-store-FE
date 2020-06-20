export class Options {
  constructor(
    public searchQuery: string,
    public prices: number[],
    public sort: string[],
    public categoryList: number[],
    public page: number,
    public size: number
  ) {}
}
