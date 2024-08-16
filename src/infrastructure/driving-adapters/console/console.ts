/*
// import { InMemoryUserRepository } from '../../implementations/InMemory/InMemoryUserRepository'
import { DynamoDBUserRepository } from '../../implementations/aws/dynamo-db/DynamoDBUserRepository'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator/UserCreatorUseCase'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter/UserGetterUseCase'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater/UserUpdaterUseCase'
// import { UserDeleterUseCase } from '../../../application/usecases/UserDeleter/UserDeleterUseCase'

(async () => {
  // const inMemoryRepo = new InMemoryUserRepository()
  const inDynamoRepo = new DynamoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(inDynamoRepo)
  const userGetterUseCase = new UserGetterUseCase(inDynamoRepo)
  const userUpdaterUseCase = new UserUpdaterUseCase(inDynamoRepo)
  // const userDeleterUseCase = new UserDeleterUseCase(inMemoryRepo)

  // Creamos un usuario
  const userCreater = {
    id: 'SPK_4',
    name: 'Rosa Lopez',
    email: 'rosa.lopez@example.com',
    username: 'rosa.lopez',
    age: 50,
    phone: '+573137991316',
    status: true
  }
  // await userCreatorUseCase.run(userCreater)

  // obtenemos los usuarios y los mostramos
  const userData = await userGetterUseCase.run()
  console.log('Los datos son: ')
  console.log(userData)

  // actualizamos el usuario
  await userUpdaterUseCase.run({
    id: 'SPK_1',
    username: 'naty.pineda2',
    phone: '(+57) 321-318-2593'
  })

  const userData2 = await userGetterUseCase.run()
  console.log('Los datos actualizados son: ')
  console.log(userData2)

  /*
  // Agregamos un nuevo usuario
  // Creamos un usuario
  await userCreatorUseCase.run({
    id: '2',
    name: 'Saul Machado',
    email: 'saul.machado@example.com',
    username: 'saul.machado',
    age: 27,
    phone: '+1-123-456',
    status: true
  })

  // mostramos nuevamente la lista
  const userData3 = await userGetterUseCase.run()
  console.log('Los datos actualizados son: ')
  console.log(userData3)

  // Ahora eliminamos el primer usuario
  const userDeleted = await userDeleterUseCase.run('1')
  console.log('Usuario elimindado: ')
  console.log(userDeleted)

  // mostramos nuevamente la lista
  const userData4 = await userGetterUseCase.run()
  console.log('Los datos actualizados despues de eliminar son: ')
  console.log(userData4)
})()
*/
