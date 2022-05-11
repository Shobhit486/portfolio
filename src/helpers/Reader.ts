import fs from "fs";
import matter from "gray-matter";

export default class Reader<T extends Data> {
  private dirPath: string;
  constructor(private dir: string) {
    this.dirPath = process.cwd() + "/" + this.dir;
  }

  public getAllItems = (): T[] => {
    const filePaths = getAllMarkdownFilePaths(this.dirPath);
    const items = filePaths.map((path) => readMarkdownFile<T>(path).data);
    return items.sort(sortItems);
  };

  public getItem = (id: string): Item<T> => {
    const filePath = this.dirPath + "/" + id + ".md";
    const parsed = readMarkdownFile<T>(filePath);
    const siblings = this.getSiblings(id);
    return { ...parsed, ...siblings };
  };

  getSiblings = (id: string): Siblings<T> => {
    const allItems = this.getAllItems();
    const maxIndex = allItems.length - 1;
    const index = allItems.findIndex((item) => item.id === id);
    const nextIndex = index < maxIndex ? index + 1 : 0;
    const prevIndex = index > 0 ? index - 1 : maxIndex;
    return {
      next: allItems[nextIndex]!,
      prev: allItems[prevIndex]!,
    };
  };
}

function getAllMarkdownFilePaths(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith("md"))
    .map((file) => `${dirPath}/${file.name}`);
}

function readMarkdownFile<T extends Data>(filePath: string) {
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data, content } = matter(fileContent);
  return { content, data: data as T };
}

function sortItems(a: Data, b: Data): number {
  if ("date" in a && "date" in b) {
    return a.date === b.date ? 0 : a.date > b.date ? -1 : 1;
  }
  if ("order" in a && "order" in b) {
    return b.order - a.order;
  }
  return 0;
}

type Data = Record<string, any>;

interface Siblings<T> {
  next: T;
  prev: T;
}

interface Item<T> {
  content: string;
  data: T;
  next: T;
  prev: T;
}
