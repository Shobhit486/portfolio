import Header from "ui/Header";
import Markdown from "ui/Markdown";
import Footer from "ui/Footer";
import Siblings from "ui/Siblings";
import HeroImage from "ui/HeroImage";
import { getAllBlogs, getBlog, cleanupBlog } from "helpers/blog";
import Meta from "components/MetaHeader";
import db from "../../../db.json";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import type { Blog } from "helpers/typeDefinitions";

export default function Blog({
  data,
  content,
  next,
  prev,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { id, name, image, tags, description, date } = data;
  const caption = `Author: ${db.title} | Published: ${new Date(
    date
  ).toLocaleDateString()}`;
  return (
    <>
      <Meta
        title={name}
        url={"/blog/" + id}
        image={name}
        description={description}
      />
      <Header />
      <HeroImage tags={tags} image={image} />
      <Markdown markdown={content} caption={caption} />
      <Siblings
        next={next}
        prev={prev}
        allItemsLink="/#blog"
        allItemsText="All blogs"
      />
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = getAllBlogs();
  const paths = blogs.map(({ id }) => `/blog/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  data: Blog;
  content: string;
  next: Blog;
  prev: Blog;
}> = async ({ params }) => {
  const id = params?.id?.toString();
  if (!id) throw new Error(`Missing ID.`);
  const { content, data, prev, next } = getBlog(id);

  return {
    props: {
      content,
      data: cleanupBlog(data),
      next: cleanupBlog(next),
      prev: cleanupBlog(prev),
    },
  };
};
