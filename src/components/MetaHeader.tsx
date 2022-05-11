import Head from "next/head";
import db from "../../db.json";

export default function Meta({
  title,
  url,
  description,
  image,
}: MetaProps): JSX.Element {
  const siteName = db.title;
  const domainUrl = db.website;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${domainUrl}${image}`
    : db.profileImg;

  return (
    <Head>
      <title>
        {title} | {siteName}
      </title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={domainUrl + url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
    </Head>
  );
}

interface MetaProps {
  title: string;
  url: string;
  description?: string;
  image?: string;
}
