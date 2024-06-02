'use client'

import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

const RegisterForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { create } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    watch
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await create(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/login')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [create, router],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <p>
        {`This is where your users will login to manage their account, view their comment history, and more. To manage all users, `}
        <Link href="/admin/collections/users">login to the admin dashboard</Link>
        {'.'}
      </p>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        type="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
      />
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={register}
        validate={value => value === password.current || 'The passwords do not match'}
        error={errors.passwordConfirm}
      />
      <Button
        type="submit"
        appearance="primary"
        label={isLoading ? 'Processing' : 'Register'}
        disabled={isLoading}
        className={classes.submit}
      />
      <div>
        <Link href={`/login${allParams}`}>Already have an account?</Link>
      </div>
    </form>
  )
}

export default RegisterForm
