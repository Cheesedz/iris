import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import RegisterForm from './RegisterForm'

import classes from './index.module.scss'

export default async function Register() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <Gutter className={classes.register}>
      <RenderParams className={classes.params} />
      <h1>Register</h1>
      <RegisterForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account',
  openGraph: mergeOpenGraph({
    title: 'Register',
    url: '/register',
  }),
}
