import styled from "@emotion/styled";

import { HeroSection } from "../components/layout";
import { Tag } from "../components/Filters";
import { capitalise } from "../helpers/tags";
import { Color } from "../styles";

import type { CSSProperties } from "react";

export default function HeroImage<
  T extends { tags?: string[]; image?: string }
>({
  style,
  ...rest
}: T & {
  style?: CSSProperties;
}): JSX.Element {
  const { image, tags = [] } = rest;
  return (
    <HeroSection
      style={{
        ...style,
        backgroundImage: image ? `url(${image})` : "black",
        height: "70vh",
      }}
    >
      {tags.length > 1 ? (
        <TagsContainer>
          {tags.map((tag) => (
            <CustomTag key={tag}>{capitalise(tag)}</CustomTag>
          ))}
        </TagsContainer>
      ) : null}
    </HeroSection>
  );
}

const TagsContainer = styled.div`
  position: absolute;
  bottom: -1.5em;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

const CustomTag = styled(Tag)`
  cursor: initial;
  background-color: ${Color.Background_Primary};
`;
