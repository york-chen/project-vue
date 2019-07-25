export const validatePhone = (rule, value, callback) => {
    if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码'));
        return
    }
    callback();
};