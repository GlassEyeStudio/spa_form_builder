import { v4 as uuidv4 } from "uuid";
import store from "./store";

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

// Initializers:

export function newPage() {
  return {
    type: "page",
    title: "New page",
    uuid: uuidv4(),
    items: []
  } as Page;
}
export function newSection() {
  return {
    type: "section",
    title: "New section",
    uuid: uuidv4(),
    items: []
  } as Section;
}

export function newQuestion() {
  return {
    type: "question",
    title: "New question",
    uuid: uuidv4(),
    // eslint-disable-next-line @typescript-eslint/camelcase
    response_type: "text"
  } as Question;
}

// Methods

export function addNewElement(
  type: "page" | "section" | "question",
  position: number,
  parentUID: string
) {
  let element = null;
  switch (type) {
    case "page":
      element = newPage();
      break;
    case "section":
      element = newSection();
      break;
    case "question":
      element = newQuestion();
      break;
    default:
      return;
  }
  if (element)
    store.commit("addElemToForm", {
      element: element,
      atPosition: position,
      parentUUID: parentUID
    });
}

export function removeElement(elemUUID: string, parentUID: string) {
  store.commit("removeElementFromForm", {
    elemUUID: elemUUID,
    parentUUID: parentUID
  });
}
