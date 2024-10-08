'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@radix-ui/themes'

const IssuesPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push('/issues/new')}>New issue</Button>
    </div>
  )
}

export default IssuesPage