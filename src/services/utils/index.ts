//===
// Public Helpers
//===
export function moduleUrl(module: string, controller: string) {
  return {
    action: (action: string) => `/${module}/${controller}/${action}`,
  }
}

export function serviceUrl(controller: string) {
  return {
    action: (action: string) => `/${controller}/${action}`,
  }
}

//===
// Helper interfaces
//===

export interface GuidIdTableType {
  id: string
}

export interface IntIdTableType {
  id: number
}

export interface IdReturnViewModel {
  id?: string
  key?: number
}

//===
// Interfaces used for paginated results
//===

export interface PaginationSelectModel {
  pageNumber: number
  rowsPerPage: number
  searchBy?: string | null
}

export interface PaginationList<T> {
  items: T[]
  totalItems: number
}

//===
// Interfaces used for action audit purposes
//===

export interface AuditInsert {
  createdBy: string
  creationDate: string
}

export interface AuditUpdate {
  lastModifiedBy: string | null
  lastModifiedDate: string | null
}

export interface AuditDelete {
  deletedBy: string | null
  deletedDate: string | null
}

export interface Audit extends AuditInsert, AuditUpdate, AuditDelete {}

export interface OrderFilter {
  expression: string
  modifier: string
}

export enum OrderModifiers {
  Ascending = 'ASC',
  Descending = 'DESC',
}
