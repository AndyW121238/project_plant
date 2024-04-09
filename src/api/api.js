import request from '@/utils/request'

// 用户表-查询列表数据
export function userlist(params) {
  return request({
    url: 'user/getlist',
    method: 'post',
    data: params
  })
}

// 用户表-删除
export function userdel(params) {
  return request({
    url: 'user/del',
    method: 'post',
    data: params
  })
}

// 用户表-保存
export function usersave(params) {
  return request({
    url: 'user/register',
    method: 'post',
    data: params
  })
}

// 管理员登陆
export function adminLogin(params) {
  return request({
    url: 'user/login',
    method: 'post',
    data: params
  })
}

