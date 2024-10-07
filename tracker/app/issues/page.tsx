'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@radix-ui/themes'

const IssuesPage = () => {
  return (
    <div>
      <Button>New issue</Button>
    </div>
  )
}

export default IssuesPage