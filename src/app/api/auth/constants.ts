export enum Role {
  RegionManager = 'rm',
  StoreManager = 'sm',
  CountryManager = 'cm',
  AreaManager = 'am',
  FullTimeEmployee = 'ft',
  PartTimeEmployee = 'pt',
}

export const MANAGER_ROLES = [
  Role.RegionManager,
  Role.StoreManager,
  Role.AreaManager,
  Role.CountryManager,
];

export const COLLABORATOR_PERMISSIONS = ['create', 'update', 'delete'];
