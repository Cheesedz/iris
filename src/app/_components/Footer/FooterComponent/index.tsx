'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer, Media } from '../../../../payload/payload-types'
import { noHeaderFooterUrls } from '../../../constants'
import { Button } from '../../Button'
import { Gutter } from '../../Gutter'

import classes from './index.module.scss'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <div className={classes.footer}>
        <Gutter>
          <div className={classes.wrap}>
            <Link href="/">
              <Image src="/logo-white.svg" alt="Logo" width={128} height={120} />
            </Link>

            <p>{footer.copyright}</p>

            <div className={classes.sociallinks}>
              {navItems.map(item => {
                console.log('item', item)
                // no idea why icon is null, so src in image will be static for now
                const icon = item?.link?.icon as Media

                return (
                  <Button
                    key={item.link.label}
                    el="link"
                    href={item.link.url}
                    newTab={true}
                    className={classes.socialLinkItem}
                  >
                    <Image
                      src="/admin ui/footer/github.svg"
                      alt={item.link.label}
                      width={24}
                      height={24}
                      className={classes.socialIcon}
                    />
                  </Button>
                )
              })}
            </div>
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
