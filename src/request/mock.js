// mockjs
import Mock from 'mockjs';
import MockAsync from 'mockjs-async';
import request from './request';

MockAsync.mock('/getFilters', 'post' ,function() {
  return request('/static/data.json', {}, 'GET').then((res) => {
    return {
      message: '成功',
      code: 200,
      data: res
    };
  });
});