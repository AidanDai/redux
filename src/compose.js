/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 * 从右到左来组合多个函数。
 * 最右边的函数可以采用多个参数，因为它为复合函数结果提供签名。
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 * 需要合成的多个函数。
 * 从右到左把接收到的函数合成后的最终函数。
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  // return funcs.reduce((a, b) => {
  //   return (...args) => {
  //     return a(b(...args))
  //   }
  // })
  // funcs = [a, b, c, d]
  // return a(
  //   b(
  //     c(
  //       d(...args)
  //     )
  //   )
  // )
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
