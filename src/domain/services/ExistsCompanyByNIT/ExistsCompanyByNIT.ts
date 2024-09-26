import { CompanyRepository } from '@domain/repositories/CompanyRepository'

export class ExistsCompanyByNIT {
  private readonly companyRepository: CompanyRepository

  constructor (companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository
  }

  async run (nit: string): Promise<boolean> {
    const company = await this.companyRepository.getByNIT(nit)

    if (company !== null) return true

    return false
  }
}
