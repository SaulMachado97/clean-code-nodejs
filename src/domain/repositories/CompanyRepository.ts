import { Company } from '@domain/entities/company/Company'

export interface CompanyRepository {
  getById: (id: string) => Promise<Company | null>
  getAll: () => Promise<Company[]>
  save: (user: Company) => Promise<Company>
  getByNIT: (nit: string) => Promise<Company | null>
  update: (user: Company) => Promise<Company>
  delete: (user: Company) => Promise<void>
}
