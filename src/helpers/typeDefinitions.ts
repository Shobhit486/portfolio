export interface BaseItem {
  id: string;
  name: string;
  tags?: string[];
  description?: string;
  image: string;
}
export interface Project extends BaseItem {
  order?: number;
  logo?: string;
  accent?: string;
}

export interface Blog extends BaseItem {
  date: string;
}
