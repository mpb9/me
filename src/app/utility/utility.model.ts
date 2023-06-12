export class Login {
  constructor(
    public website: string,
    public url: string,
    public username: string,
    public password: string
  ) {}
}

export class ToDo {
  constructor(
    public rank: number,
    public due: string,
    public category: string,
    public description: string
  ) {}
}

export class Link {
  constructor(public name: string, public url: string) {}
}

export class PersonalInfo {
  constructor(public name: string, public description: string) {}
}
