import React from 'react'
import Link from 'next/link'

import type { Footer } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'
import FooterComponent from './FooterComponent'

export async function Footer() {
  let footer: Footer | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    console.error('Failed to fetch footer:', error)
  }

  return (
    <>
      <FooterComponent footer={footer} />
    </>
  )
}
