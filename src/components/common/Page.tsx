import { ReactNode, useEffect } from 'react'

const Page = ({ title, children }: { title: string; children: ReactNode }) => {
  useEffect(() => {
    document.title = title || ''
  }, [title])
  return children
}

export default Page
