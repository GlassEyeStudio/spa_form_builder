export interface form {
  items: page[] | page;
  uuid: string;
  title: string;
}
export interface page {
  items: (section | question)[];
  uuid: string;
  title: string;
}

export interface section {
  items: (section | question)[];
  uuid: string;
  title: string;
}

export interface question {
  uuid: string;
  title: string;
  responseType: string;
}
