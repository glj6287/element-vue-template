const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  jobNumber: state => state.user.jobNumber,
  nickName: state => state.user.nickName,
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  roleNames: state => state.user.roleNames,
  menus: state => state.user.menus,
  buttons: state => state.user.buttons,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
