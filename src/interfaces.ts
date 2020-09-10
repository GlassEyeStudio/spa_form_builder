export interface Form {
  type: string;
  items: Page[];
  uuid: string;
}
export interface Page {
  type: string;
  items: (Section | Question)[];
  uuid: string;
  title: string;
}

export interface Section {
  type: string;
  items: (Section | Question)[];
  uuid: string;
  title: string;
}

export interface Question {
  type: string;
  uuid: string;
  title: string;
  response_type: string;
}
