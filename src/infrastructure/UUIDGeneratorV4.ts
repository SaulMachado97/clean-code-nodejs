import { v4 as uuidv4 } from 'uuid'
import { UUIDGenerator } from '@domain/utils/uuidGenerator'

export class UUIDGeneratorV4 implements UUIDGenerator {
  generate (): string {
    return uuidv4()
  }
}
