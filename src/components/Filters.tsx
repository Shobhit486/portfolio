import { useMemo } from "react";
import styled from "@emotion/styled";
import { Color } from "../styles";
import {
  isContainTag,
  capitalise,
  useTags,
  extractTagsFromItems,
} from "../helpers/tags";
import { BaseItem } from "helpers/typeDefinitions";

export default function useFilterRow<T extends BaseItem>(items: T[]) {
  const { selectedTags, toggleTag } = useTags();
  const tags = extractTagsFromItems(items);

  const filteredItems = useMemo(
    () => filterProjectsWithSelectedTag<T>(items, selectedTags),
    [items, selectedTags]
  );

  const renderedFilterRow = (
    <Filters tags={tags} selectedTags={selectedTags} toggleTag={toggleTag} />
  );

  return { filteredItems, toggleTag, renderedFilterRow };
}

function filterProjectsWithSelectedTag<T extends BaseItem>(
  items: T[],
  selectedTags: string[]
): T[] {
  return selectedTags.length > 0
    ? items.filter((project) =>
        // For AND use `every`; for OR use `some`
        selectedTags.some((selectedTag) =>
          isContainTag(project.tags || [], selectedTag)
        )
      )
    : items;
}

export function Filters({
  tags,
  selectedTags,
  toggleTag,
  className,
}: FilterRowProps): JSX.Element {
  return (
    <FilterRow className={className}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          onClick={() => toggleTag(tag)}
          data-active={isContainTag(selectedTags, tag)}
        >
          {capitalise(tag)}
        </Tag>
      ))}
    </FilterRow>
  );
}

interface FilterRowProps {
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  className?: string;
}

const FilterRow = styled.div`
  margin: 1em 0;
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.button`
  padding: 0.5em 1em;
  border-radius: 2em;
  background-color: transparent;
  color: ${Color.Text_Disabled};
  font-size: 1em;
  border: 1px solid ${Color.Border};
  margin: 0.25em;
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s;

  &:hover {
    background-color: ${Color.Background_Secondary};
    color: ${Color.Accent};
  }

  &[data-active="true"] {
    background-color: ${Color.Accent};
    color: ${Color.White};
  }
`;
