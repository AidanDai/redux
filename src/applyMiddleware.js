import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 * 创建一个 store 增强器，它将中间件应用于 Redux store 的 dispatch。
 * 这对于各种任务非常方便，例如以简洁的方式表达异步操作，或记录每个操作有效负载。
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 * redux-thunk 就是一个很好的 Redux 中间件的例子
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 * 因为中间件可能是异步的，所以异步中间件应该是中间件链中的第一个。
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 * 注意每一个中间件将被传入 dispatch 和 getState 参数。
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 * Redux middleware 调用链
 * 一个应用了 middleware 后的 store enhancer。
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 获得中间件执行逻辑函数链
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
