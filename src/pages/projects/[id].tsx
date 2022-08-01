import Header from "ui/Header";
import Markdown from "ui/Markdown";
import Footer from "ui/Footer";
import Siblings from "ui/Siblings";
import HeroImage from "ui/HeroImage";
import { getAllProjects, getProject } from "helpers/projects";
import Meta from "components/MetaHeader";

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import type { Project } from "helpers/typeDefinitions";

export default function Projects({
  data,
  content,
  next,
  prev,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { id, name, image, hero, tags, description } = data;
  return (
    <>
      <Meta
        title={name}
        url={"/projects/" + id}
        image={name}
        description={description}
      />
      <Header />
      <HeroImage tags={tags} image={hero} fallback={image} />
      <Markdown markdown={content} />
      <Siblings
        next={next}
        prev={prev}
        allItemsLink="/#projects"
        allItemsText="All projects"
      />
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = getAllProjects();
  const paths = projects.map(({ id }) => `/projects/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  data: Project;
  content: string;
  next: Project;
  prev: Project;
}> = async ({ params }) => {
  const id = params?.id?.toString();
  if (!id) throw new Error(`Missing ID.`);
  const { content, data, prev, next } = getProject(id);

  return {
    props: {
      content,
      data,
      next,
      prev,
    },
  };
};
