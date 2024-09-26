import { Company } from '@domain/entities/company/Company'
import { CompanyRepository } from '@domain/repositories/CompanyRepository'
import { UUIDGeneratorV4 } from '@infrastructure/UUIDGeneratorV4'
import { UUIDGenerator } from '@domain/utils/uuidGenerator'
import { ExistsCompanyByNIT } from '@domain/services/ExistsCompanyByNIT/ExistsCompanyByNIT'
import { CompanyAlreadyExistException } from '@domain/exceptions/CompanyAlreadyExistException'

interface CompanyInput {
  nit: string
  company_name: string
  address: string
  location: string
  phone: string
  status: boolean
}

export class CompanyCreatorUseCase {
  private readonly _companyRepository: CompanyRepository
  private readonly _existsCompanyByNIT: ExistsCompanyByNIT
  private readonly _uuidGenerator: UUIDGenerator

  constructor (companyRepository: CompanyRepository, uuidGenerator: UUIDGenerator) {
    this._companyRepository = companyRepository
    this._existsCompanyByNIT = new ExistsCompanyByNIT(companyRepository)
    this._uuidGenerator = new UUIDGeneratorV4()
  }

  async run (body: CompanyInput): Promise<Company> {
    const company: Company = {
      id: this._uuidGenerator.generate(),
      nit: body.nit,
      company_name: body.company_name,
      address: body.address,
      location: body.location,
      phone: body.phone,
      status: body.status
    }
    const flagExistCompany = await this._existsCompanyByNIT.run(body.nit)
    if (!flagExistCompany) {
      const companyCreated: Company = await this._companyRepository.save(company)
      return companyCreated
    } else {
      throw new CompanyAlreadyExistException()
    }
  }
}
