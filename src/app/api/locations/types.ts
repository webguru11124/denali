export interface LocationResponse {
  id: number;
  name: string;
  typeId: number;
  categoryId: number | null;
  _lft: number;
  _rgt: number;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  system: number;
  oldId: number;
  deletedAt: string | null;
  externalLocationId: string | null;
  data?: any | null;
  depth: number;
  type: LocationType;
}
export interface LocationType {
  id: number;
  name: LocationTypeName;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  system: number;
}

interface FullLocationWithChildren extends LocationResponse {
  children: Array<FullLocationWithChildren>;
}

interface LocationTypeName {
  [k: string]: string | undefined;
}

export type FullLocationTree = FullLocationWithChildren;
