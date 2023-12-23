import clsx from 'clsx'
export default function useStyle() {
  // 页面背景class
  const pageBaseClasses = 'min-h-screen  flex flex-col'
  const pageBackGround = clsx(
    'bg-gradient-to-tr bg-fixed',
    'from-gray-50 via-gray-100 to-green-100',
    'dark:from-slate-900 dark:via-slate-900 dark:to-gray-900'
  )

  return {
    pageBaseClasses,
    pageBackGround
  }
}
