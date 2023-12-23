export default function useSafeAreaInsets() {
  const systemInfo = uni.getSystemInfoSync()

  const topPaddingStyle = () => {
    return {
      paddingTop: `${systemInfo.safeAreaInsets?.top || 0}px`
    }
  }

  const bottomPaddingStyle = () => {
    return {
      paddingBottom: `${systemInfo.safeAreaInsets?.bottom || 8}px`
    }
  }
  return {
    topPaddingStyle,
    bottomPaddingStyle
  }
}
