import { useStore } from '@/store'

export function usePermission(pageName: string, handlePermission: string) {
  const store = useStore()
  const permissions = store.state.login.userPermissions
  const verifyPermission = `system:${pageName}:${handlePermission}`
  return !!permissions.find((item) => item === verifyPermission)
}
