import request from './request';


/**
 * 统一请求入口
 * type: 请求类型
 * url：接口名字
 * params：参数
 */
const processor = (type='', url='', params={}) => {
    // 使用promise解决异步问题
    // 因为自定义的axios包含baseUrl,此处只需要写后面的接口即可
    return new Promise((resolve) => {
        request[type](url, params).then(res => {
            resolve(res.data)
        })
    })
}

/**
 * 导航菜单的统一接口
 * type 请求类型
 * url 接口
 * getDataSize 向接口发起请求时，通过此参数设置每次请求返回的数据条数
 * isAll 是否查询全部列表数据，为true时接口返回所有，为false时分页获取数据，每次获取指定数量
 */
const getNavlist = (type, url, getDataSize, isAll) => {
    const params = {
        userCode: '123',
        pageSize: getDataSize
    }
    return processor(type, url, params)
}

/**
 * 封装 数据表格的统一接口
 * type 请求类型
 * url 接口
 * pageSize 页面
 * pageNum 每页显示个数
 */
const getTablelist = (type, url, pageSize, pageNum) => {
    const params = {
        pageSize: pageSize * 1 || 0,
        pageNum: pageNum * 1 || 10,
    }
    return processor(type, url, params)
}

/**
 * 封装 统一【查询、删除、更新、新增】接口
 * type 请求类型
 * url 接口
 * params 传入请求参数传入参数(应为一个对象)
 */
const getPoster = (type, url, params) => {
    return processor(type, url, params)
}

// 3、暴露接口
export {
    getNavlist,
    getTablelist,
    getPoster
}