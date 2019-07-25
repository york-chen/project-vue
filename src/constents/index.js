let roleMenu = new Map();
roleMenu.set('normal', '普通用户');
roleMenu.set('mgr', '管理员');
roleMenu.set('all', [
    {label: '普通用户', value: 'normal'},
    {label: '管理员', value: 'mgr'}
]);
let permissionType = new Map();
permissionType.set(1, '完全访问');
permissionType.set(20, 'root账户访问');
permissionType.set(30, '普通用户访问');
permissionType.set(60, '查看密码');
permissionType.set(70, '禁止查看');
export default {
    roleMenu: roleMenu,
    permissionType
}