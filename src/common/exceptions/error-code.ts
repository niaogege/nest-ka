type ValueOf<T> = T[keyof T];

export const ERR = {
  // 登录相关
  ERR_10000: { code: 10000, message: '参数校验异常' },
  ERR_10001: { code: 10001, message: '用户已存在' },
  ERR_10002: { code: 10002, message: '用户名或openid不对导致本地验证失效' },
  ERR_10003: { code: 10003, message: '验证码错误' },
  ERR_10004: { code: 10004, message: '密码验证失败' },
  ERR_10005: { code: 10005, message: '用户不存在' },
  // token相关
  ERR_11001: { code: 401, message: '登录无效或无权限访问' },
  ERR_11002: { code: 401, message: '登录已过期或者token失效' },
  ERR_11003: { code: 11003, message: '请联系管理员申请权限' },
  ERR_11004: { code: 11004, message: '越权操作' },
  ERR_11005: { code: 11005, message: '当前用户无此角色' },
  ERR_11006: { code: 11006, message: '非法操作' },
  ERR_11007: { code: 11007, message: '用户已禁用' },
  ERR_11008: { code: 11008, message: '角色已禁用' },
  ERR_11009: { code: 401, message: '当前header缺少token' },
  // Account 账单相关
  ERR_20001: { code: 20001, message: '当前创建的文件或目录已存在' },
  ERR_20002: { code: 20002, message: '无需操作' },
  ERR_20003: { code: 20003, message: '已超出支持的最大处理数量' },
  // Category 类目相关
  ERR_30001: { code: 30001, message: '预览环境不支持此操作' },

  // Bill 账单 相关
} as const;

export type ErrInfo = ValueOf<typeof ERR>;
