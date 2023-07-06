export class MyMovieInfo {
  constructor(
    public id: number,
    public rank: Rank,
    public watched: boolean,
    public rating: number,
    public watchlist: boolean
  ) {}
}

export class Rank {
  constructor(public id: number, public rank: number, public tier: number) {}
}

export class MovieList {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public movies: number[]
  ) {}
}

export class Watched {
  constructor(public id: number, public rating: number) {}
}
