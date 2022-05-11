import Reader from "./Reader";
import type { Blog } from "./typeDefinitions";

const reader = new Reader<Blog>("blog");

export const getAllBlogs = reader.getAllItems;
export const getBlog = reader.getItem;

export function cleanupBlog(blog: Blog) {
  return {
    ...blog,
    date: new Date(blog.date).toISOString().slice(0, 10),
  };
}
