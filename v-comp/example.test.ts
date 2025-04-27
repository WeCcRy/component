import { test, describe, vi, expect, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'

vi.mock('axios') // 通过vi.mock来mock第三方模块，mock的模块名需要和import的模块名一致
const mockedAxios = axios as Mocked<typeof axios> // // 断言axios的类型，否则ts无法获取axios中的方法，使用Mocked来断言axios的类型

describe('functions', () => {
  // callback test
  test('create a mock function', () => {
    // 通过vi.fn创建一个函数监视程序
    const callback = vi.fn()
    // 传入callback，callback会监视函数的调用
    testFn(12, callback)
    expect(callback).toHaveBeenCalled() // 判断函数是否被调用
    expect(callback).toHaveBeenCalledWith(12) // 判断函数的参数是否为12
  })
  test('spy on method', () => {
    const obj = {
      getName: () => 1,
    }
    // 通过spyOn来监视对象的方法实现，如果检测单一函数，则需要写成对象形式
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled() // 判断函数是否被调用
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2) // 判断函数的调用次数
  })

  // mock第三方模块，首先mock模块(如果是TS，需要进行类型断言)，然后实现模块中的方法，最后对方法进行测试
  test('mock third party module', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 })) mockImplementation是mock函数的实现方式
    // 将mockedAxios.get方法实现为一个返回Promise的函数，返回值为123
    mockedAxios.get.mockResolvedValue({ data: 123 }) //类似于上面
    const result = await request()
    expect(result).toBe(123)
  })
})
