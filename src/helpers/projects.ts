import Reader from "./Reader";
import type { Project } from "./typeDefinitions";

const reader = new Reader<Project>("projects");

export const getAllProjects = reader.getAllItems;
export const getProject = reader.getItem;
