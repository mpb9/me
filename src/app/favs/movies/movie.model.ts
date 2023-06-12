export class Discover {
  constructor(public sort: Sort, public params: any[]) {}

  toString() {
    let query_string = `include_adult=false`;
    this.valid_params.forEach((param) => {
      if (param === 'sort_by') {
        query_string += `&${param}=${this.sort.toString()}`;
      }
      if (this.params.includes(param)) {
        query_string += `&${param}=${
          this.params.find((p) => p[0] === param)[1]
        }`;
      }
    });
    return query_string;
  }

  reset() {
    this.sort.reset();
    this.params = [['include_video', 'false']];
  }

  updateParams(param: string, value: any) {
    if (this.params.includes([param, value])) {
      this.params.splice(this.params.indexOf([param, value]), 1);
    }
    if (this.valid_params.includes(param)) {
      this.params.push([param, value]);
    }
  }

  deleteParam(param: string) {
    if (this.params.includes(param)) {
      this.params.splice(this.params.indexOf(param), 1);
    }
  }

  updateSort(sort: Sort) {
    this.sort = sort;
  }

  valid_params = [
    'include_video',
    'language',
    'region',
    'release_date_gte',
    'release_date_lte',
    'sort_by',
    'vote_average_gte',
    'vote_average_lte',
    'vote_count_gte',
    'vote_count_lte',
    'with_origin_country',
    'with_people',
    'with_runtime_gte',
    'with_runtime_lte',
    'year',
  ];
}

export class MovieSearch {
  constructor(public query: string, public params: any[]) {}

  toString() {
    let query_string = `query=${this.query}&include_adult=false`;
    this.valid_params.forEach((param) => {
      if (this.params.includes(param)) {
        query_string += `&${param}=${
          this.params.find((p) => p[0] === param)[1]
        }`;
      }
    });
    return query_string;
  }

  reset() {
    this.params = [];
  }

  updateParams(param: string, value: any) {
    if (this.params.includes([param, value])) {
      this.params.splice(this.params.indexOf([param, value]), 1);
    }
    if (this.valid_params.includes(param)) {
      this.params.push([param, value]);
    }
  }

  deleteParam(param: string) {
    if (this.params.includes(param)) {
      this.params.splice(this.params.indexOf(param), 1);
    }
  }

  updateQuery(query: string) {
    this.query = query;
  }

  valid_params = ['language', 'primary_release_year', 'page', 'region', 'year'];
}

export class PersonSearch {
  constructor(
    public query: string,
    public language: string,
    public page: number
  ) {}

  toString() {
    return `query=${this.query}&include_adult=false&language=${this.language}&page=${this.page}`;
  }

  reset() {
    this.query = '';
    this.language = 'en-US';
    this.page = 1;
  }

  updateQuery(query: string) {
    this.query = query;
  }

  updateLanguage(language: string) {
    this.language = language;
  }

  updatePage(page: number) {
    this.page = page;
  }
}

export class Sort {
  constructor(
    public param: string,
    public order: string,
    public page: number
  ) {}

  reset() {
    this.param = 'popularity';
    this.order = 'desc';
    this.page = 1;
  }
  toString() {
    return `page=${this.page}&sort_by=${this.param}.${this.order}`;
  }
  updateSort(param: string, order: string, page: number) {
    this.param = param;
    this.order = order;
    this.page = page;
  }

  valid_params = [
    'popularity',
    'revenue',
    'primary_release_date',
    'vote_average',
    'vote_count',
  ];

  valid_orders = ['asc', 'desc'];
}

export const GENRES = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

export const RELEASE_TYPES = [
  {
    type: 1,
    release: 'Premiere',
  },
  {
    type: 2,
    release: 'Theatrical (limited)',
  },
  {
    type: 3,
    release: 'Theatrical',
  },
  {
    type: 4,
    release: 'Digital',
  },
  {
    type: 5,
    release: 'Physical',
  },
  {
    type: 6,
    release: 'TV',
  },
];

export const COUNTRIES = [
  {
    name: 'Japan',
    iso_3166_1: 'JP',
    iso_639_1: 'ja',
  },
  {
    name: 'United States of America',
    iso_3166_1: 'US',
    iso_639_1: 'en',
  },
  {
    name: 'France',
    iso_3166_1: 'FR',
    iso_639_1: 'fr',
  },
  {
    name: 'United Kingdom',
    iso_3166_1: 'GB',
    iso_639_1: 'en',
  },
  {
    name: 'Germany',
    iso_3166_1: 'DE',
    iso_639_1: 'de',
  },
  {
    name: 'Italy',
    iso_3166_1: 'IT',
    iso_639_1: 'it',
  },
  {
    name: 'Canada',
    iso_3166_1: 'CA',
    iso_639_1: 'en',
  },
  {
    name: 'South Korea',
    iso_3166_1: 'KR',
    iso_639_1: 'ko',
  },
  {
    name: 'Russia',
    iso_3166_1: 'RU',
    iso_639_1: 'ru',
  },
  {
    name: 'Australia',
    iso_3166_1: 'AU',
    iso_639_1: 'en',
  },
  {
    name: 'Spain',
    iso_3166_1: 'ES',
    iso_639_1: 'es',
  },
  {
    name: 'China',
    iso_3166_1: 'CN',
    iso_639_1: 'zh',
  },
  {
    name: 'Hong Kong',
    iso_3166_1: 'HK',
    iso_639_1: 'zh',
  },
  {
    name: 'India',
    iso_3166_1: 'IN',
    iso_639_1: 'hi',
  },
  {
    name: 'Sweden',
    iso_3166_1: 'SE',
    iso_639_1: 'sv',
  },
  {
    name: 'Denmark',
    iso_3166_1: 'DK',
    iso_639_1: 'da',
  },
  {
    name: 'Belgium',
    iso_3166_1: 'BE',
    iso_639_1: 'fr',
  },
  {
    name: 'Mexico',
    iso_3166_1: 'MX',
    iso_639_1: 'es',
  },
  {
    name: 'Brazil',
    iso_3166_1: 'BR',
    iso_639_1: 'pt',
  },

  {
    name: 'Ireland',
    iso_3166_1: 'IE',
    iso_639_1: 'en',
  },
  {
    name: 'Netherlands',
    iso_3166_1: 'NL',
    iso_639_1: 'nl',
  },
  {
    name: 'Norway',
    iso_3166_1: 'NO',
    iso_639_1: 'no',
  },
  {
    name: 'Poland',
    iso_3166_1: 'PL',
    iso_639_1: 'pl',
  },
  {
    name: 'New Zealand',
    iso_3166_1: 'NZ',
    iso_639_1: 'en',
  },
  {
    name: 'Nigeria',
    iso_3166_1: 'NG',
    iso_639_1: 'en',
  },
  {
    name: 'Turkey',
    iso_3166_1: 'TR',
    iso_639_1: 'tr',
  },
];
