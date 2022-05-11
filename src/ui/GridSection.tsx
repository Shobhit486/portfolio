import Link from "next/link";
import styled from "@emotion/styled";
import { Section } from "components/layout";
import { SubHeading, Paragraph, Heading } from "components/typography";
import useFilterRow from "components/Filters";
import { capitalise } from "helpers/tags";
import { Color } from "styles";
import type { BaseItem } from "helpers/typeDefinitions";

export default function GridSection<T extends BaseItem>({
  id,
  title,
  items = [],
  baseUrl,
}: {
  id: string;
  title: string;
  items: T[];
  baseUrl: string;
}): JSX.Element | null {
  if (items.length === 0) return null;

  const { filteredItems, toggleTag, renderedFilterRow } = useFilterRow(items);
  return (
    <Section id={id} style={{ backgroundColor: Color.Background_Primary }}>
      <SubHeading>{title}</SubHeading>
      {renderedFilterRow}
      {filteredItems.length > 0 ? (
        <ItemGrid>
          {filteredItems.map((item) => (
            <GridCard
              {...item}
              key={item.id}
              toggleTag={toggleTag}
              baseUrl={baseUrl}
            />
          ))}
        </ItemGrid>
      ) : (
        <Paragraph>
          No content match the filters. Try with different filters.
        </Paragraph>
      )}
    </Section>
  );
}

function GridCard<T extends BaseItem>({
  id,
  name,
  image,
  description,
  tags = [],
  baseUrl,
  toggleTag,
}: T & { baseUrl: string; toggleTag: (tag: string) => void }): JSX.Element {
  const linkHref = baseUrl + id;

  return (
    <Card>
      <Link href={linkHref}>
        <CardImage style={{ backgroundImage: `url("${image}")` }} />
      </Link>
      <CardData>
        <Link href={linkHref}>
          <a>
            <CardTitle as="h3">{name}</CardTitle>
          </a>
        </Link>
        {description ? (
          <CardText>
            {description}{" "}
            <Link href={linkHref}>
              <a>Read more.</a>
            </Link>
          </CardText>
        ) : null}
        {tags.length > 0 ? (
          <CardText>
            {tags.map((tag) => (
              <a key={tag} onClick={() => toggleTag(tag)}>
                #{capitalise(tag)}{" "}
              </a>
            ))}
          </CardText>
        ) : null}
      </CardData>
    </Card>
  );
}

const ItemGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 2em;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1800px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.article`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  width: 100%;
  height: 300px;
  position: relative;
  cursor: pointer;
  background-position: center;
  background-size: cover;
`;

const CardData = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding: 1em 0;
  flex: 1;
`;

const CardTitle = styled(Heading)`
  font-size: 1.5em;
  font-weight: normal;
  /* color: ${Color.Accent}; */
`;

const CardText = styled(Paragraph)`
  font-size: 1em;
  font-weight: normal;
  /* color: ${Color.Accent}; */
  max-width: 100%;
`;
