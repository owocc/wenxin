export default function useTabbarConfig() {
  const tabbarList = [
    {
      icon: 'i-ph-circles-three-plus',
      selectIcon: 'i-ph-circles-three-plus-duotone',
      text: '新建',
      to: '/pages/index/index',
      index: 0
    },
    {
      icon: 'i-ph-user',
      selectIcon: 'i-ph-user-duotone',
      text: '我的',
      to: '/pages/me/index',
      index: 2
    }
  ]

  return {
    tabbarList
  }
}
