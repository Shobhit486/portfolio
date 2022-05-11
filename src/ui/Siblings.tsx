import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Link from "next/link";
import type { BaseItem } from "helpers/typeDefinitions";
import IconDown from "icons/Down";
import IconGrid from "icons/Grid";
import { Color } from "styles";

const ID_PARAM = "[id]";

export default function Siblings<T extends BaseItem>({
  next,
  prev,
  allItemsText,
  allItemsLink,
}: {
  next: T;
  prev: T;
  allItemsText: string;
  allItemsLink: string;
}): JSX.Element {
  const { route } = useRouter();
  const nextUrl = route.replace(ID_PARAM, next.id);
  const prevUrl = route.replace(ID_PARAM, next.id);

  return (
    <Container id="siblings">
      <Link href={prevUrl}>
        <a id="previous">
          <IconDown />
          <br />
          {prev.name}
        </a>
      </Link>
      <Link href={allItemsLink}>
        <a id="home">
          <IconGrid />
          <br />
          {allItemsText}
        </a>
      </Link>

      <Link href={nextUrl}>
        <a id="next">
          <IconDown />
          <br />
          {next.name}
        </a>
      </Link>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: auto;
  padding: 2em 1em;

  #next,
  #previous {
    flex: 1;
  }

  svg {
    fill: ${Color.Accent};
  }

  #previous svg {
    transform: rotate(90deg);
  }
  #next {
    text-align: right;
    svg {
      transform: rotate(-90deg);
    }
  }
  #home {
    text-align: center;
  }
`;
