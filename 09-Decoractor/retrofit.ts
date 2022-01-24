// import 'reflect-metadata'
// import {request} from '@/utils/request'
// const ParameterMetadataKey = Symbol('paramter')
// const BodyParametersMetadataKey = Symbol('body')
// const QureyParameterMetadataKey = Symbol('qurey')
// const HeaderMetadataKey = Symbol('Header')

// /**
//  * Paramter注解，通过reflect-metadata将注解数据与方法进行绑定，方便方法调用时进行取用
//  * @param parameterKey parameter在传参时的Key名
//  */
// export function paramter (parameterKey: string) {
//   return function paramterKeySet (target: any, propertyKey: string | symbol, parameterIndex: number) {
//     const qureyParameters: any[] = Reflect.getOwnMetadata(ParameterMetadataKey, target, propertyKey) || []
//     const qureyParamter = {
//       name: parameterKey,
//       index: parameterIndex
//     }
//     qureyParameters.push(qureyParamter)
//     Reflect.defineMetadata(ParameterMetadataKey, qureyParameters, target, propertyKey)
//   }
// }

// /**
//  * Paramters 直接按照object，进行批量数据插入，不建议使用,一个api方法中，也有且只有一个，否则异常
//  */
// export function body (target: any, propertyKey: string | symbol, parameterIndex: number) {
//   const qureyParameters: any[] = Reflect.getOwnMetadata(BodyParametersMetadataKey, target, propertyKey) || []
//   const qureyParamter = {
//     index: parameterIndex
//   }
//   qureyParameters.push(qureyParamter)
//   Reflect.defineMetadata(BodyParametersMetadataKey, qureyParameters, target, propertyKey)
// }

// /**
//  * Query的目的是与Paramer在post请求时做区分，常规使用中不建议使用，同时，也会在这部分进行限制
//  * @param parameterKey 请求中的key名称
//  */
// export function qurey (parameterKey: string) {
//   return function qureyKeySet (target: any, propertyKey: string | symbol, parameterIndex: number) {
//     const qureyParameters: any[] = Reflect.getOwnMetadata(QureyParameterMetadataKey, target, propertyKey) || []
//     const qureyParamter = {
//       name: parameterKey,
//       index: parameterIndex
//     }
//     qureyParameters.push(qureyParamter)
//     Reflect.defineMetadata(QureyParameterMetadataKey, qureyParameters, target, propertyKey)
//   }
// }

// // TODO: 处理Paramters与Paramter混用的问题，处理Qurery混用的问题
// /**
//  * 发出post请求，body参数使用Paramter或Paramters注解，url路径使用Qurey注解，这点需要注意
//  * @param path 路径
//  */
// export function Post (path: string) {
//   return function postHandler (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
//     descriptor.value = function (...args: any[]) {
//       // 取出存放在function中的相关注解数据
//       const parameters: any[] = Reflect.getOwnMetadata(ParameterMetadataKey, target, propertyName)
//       const parametersBody: any[] = Reflect.getOwnMetadata(BodyParametersMetadataKey, target, propertyName)
//       let headerParameter = Reflect.getOwnMetadata(HeaderMetadataKey, target, propertyName)
//       const qureyParameters: any[] = Reflect.getOwnMetadata(QureyParameterMetadataKey, target, propertyName)

//       // 处理header异常情况
//       if (undefined === headerParameter || headerParameter == null) {
//         headerParameter = {}
//       }

//       // 处理在post请求中，混入url参数的情况
//       let pathParameters = '?'
//       if (undefined !== qureyParameters && qureyParameters != null && qureyParameters.length > 0) {
//         for (const qureyParamter of qureyParameters) {
//           pathParameters += qureyParamter.name
//           pathParameters += '='
//           pathParameters += args[qureyParamter.index]
//           pathParameters += '&'
//         }
//       }
//       // 处理parameter与parameters混用的情况，正常情况下，parameter与parameters不可同时使用
//       let body: { [ key: string ]: any} = {}
//       for (const parameterInfo of parameters) {
//         body[parameterInfo.name] = args[parameterInfo.index]
//       }
//       if (undefined !== parametersBody && parametersBody != null && parametersBody.length > 0) {
//         body = Object.assign(body, args[parametersBody[0].index])
//       }
//       // TODO: 测试数据
//       const data = '{"name":"BeJson","sex":"man"}'
//       const person = JSON.parse(data)
//       // TODO: 处理path中跟参问题
//       path += pathParameters
//       path = path.slice(0, path.length - 1)
//       // return request.post(path, body, {
//       //  headers: headerParameter
//       // })
//       console.log('logger_info_path', path)
//       console.log('logger_info_body', body)
//       console.log('logger_info_header', headerParameter)
//       return new Promise((resolve, reject) => {
//         resolve(person)
//       })
//       // url参数混入处理
//     }
//   }
// }

// /**
//  * get调用
//  * @param path 路径
//  */
// export function Get (path: string) {
//   return function getHandler (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
//     descriptor.value = function (...args: any[]) {
//       const qureyParameters: any[] = Reflect.getOwnMetadata(ParameterMetadataKey, target, propertyName)
//       let headerParameter = Reflect.getOwnMetadata(HeaderMetadataKey, target, propertyName)
//       // 处理header异常情况
//       if (undefined === headerParameter || headerParameter == null) {
//         headerParameter = {}
//       }
//       let body = '?'
//       for (const parameterInfo of qureyParameters) {
//         body += parameterInfo.name
//         body += '='
//         body += args[parameterInfo.index]
//         body += '&'
//       }
//       path += body
//       path = path.slice(0, path.length - 1)
//       return request.get(path, {
//         headers: headerParameter
//       })
//     }
//   }
// }

// /**
//  * 新增header属性
//  * @param header {} 对象存储key
//  */
// export function Header (header: {}) {
//   return function addHeader (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
//     Reflect.defineMetadata(HeaderMetadataKey, header, target, propertyName)
//     console.log('retrofit_from_head', header)
//   }
// }
