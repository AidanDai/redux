function bindActionCreator(actionCreator, dispatch) {
  return function() { return dispatch(actionCreator.apply(this, arguments)) }
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 * 把 action creators 转成拥有同名 keys 的对象，但使用 dispatch 把每个 action creator 包围起来，
 * 这样可以直接调用它们。
 *
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 * 一个键值是 action creators 函数的对象。
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *  一个 dispatch 函数，由 Store 实例提供。
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 * 一个与原对象类似的对象，只不过这个对象中的的每个函数值都可以直接 dispatch action。
 * 如果传入的是一个函数作为 actionCreators，返回的也是一个函数。
 */
export default function bindActionCreators(actionCreators, dispatch) {
  // 传入一个 actionCreators 函数
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  // 传入一个 actionCreators 函数作为键值的对象
  // actionCreators 参数校验（必须为对象）
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
      `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    )
  }

  // 遍历对象绑定 dispatch 与每一个 actionCreator 的调用关系
  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}
