import { useCallback, useState } from "react";
import type { BaseItem } from "helpers/typeDefinitions";

const MAX_TAGS = 20;

export function extractTagsFromItems<T extends BaseItem>(items: T[]): string[] {
  const tagMap: Record<string, number> = {};

  items
    .flatMap((item) => item.tags || [])
    .forEach((tag) => {
      const key = tag.toLowerCase();
      if (tagMap[key]) tagMap[key]++;
      else tagMap[key] = 0;
    });

  const tags = Object.entries(tagMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_TAGS)
    .map(([key]) => key);

  return tags;
}

export function useTags() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((previousTags) => {
      const newTags = isContainTag(previousTags, tag)
        ? previousTags.filter((t) => t.toLowerCase() !== tag.toLowerCase())
        : [...previousTags, tag];
      return newTags;
    });
  }, []);

  return { selectedTags, toggleTag };
}

export function isContainTag(tags: string[], selectedTag: string) {
  return tags?.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());
}

export function capitalise(text: string) {
  return `${text[0]!.toUpperCase()}${text.slice(1)}`;
}
