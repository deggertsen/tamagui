import { TitleAndMetaTags } from '@components/TitleAndMetaTags'
import { withSupabase } from '@lib/withSupabase'
import { WhitelistNotice } from '@protected/studio/(loaded)/(sponsor-protected)/SponsorshipRequired'
import { Lock } from '@tamagui/lucide-icons'
import { ButtonLink } from 'app/Link'
import { UserGuard, useUser } from 'hooks/useUser'
import dynamic from 'next/dynamic'
import { H2, Paragraph, Spinner, YStack } from 'tamagui'

import { ToastProvider as StudioToastProvider } from '../../app/ToastProvider'
import { siteRootDir } from '@protected/studio/constants'

const StudioLayout = dynamic(() => import('@protected/studio/layout'), { ssr: false })

export const getStudioLayout: GetLayout = (page, pageProps) => {
  return withSupabase(
    <StudioToastProvider>
      <TitleAndMetaTags title="Studio — Tamagui" />

      <UserGuard>
        <StudioLayout>
          <GithubConnectionGuard>
            <SponsorshipGuard>{page}</SponsorshipGuard>
          </GithubConnectionGuard>
        </StudioLayout>
      </UserGuard>
    </StudioToastProvider>,
    pageProps,
    true
  )
}

const GithubConnectionGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()

  if (!user?.app_metadata.providers.includes('github')) {
    return (
      <ErrorScreen
        title="GitHub account not connected."
        message="This page is only accessible for sponsors. We need your GitHub account connected to check your status."
        action={{ url: '/account', text: 'Connect GitHub' }}
      />
    )
  }
  return <>{children}</>
}

const SponsorshipGuard = ({ children }: { children: React.ReactNode }) => {
  const { accessStatus } = useUser()

  if (!accessStatus) {
    return <Spinner />
  }

  // if (accessStatus.isWhitelisted) {
  //   return (
  //     <>
  //       <WhitelistNotice />
  //       {children}
  //     </>
  //   )
  // }


  if (!accessStatus.access.studio.access) {
    return (
      <ErrorScreen
        title="You don't have access to Studio"
        message={accessStatus.access.studio.message}
        action={{ url: `${siteRootDir}/account#studio-queue`, text: 'More Info' }}
      />
    )
  }

  return <>{children}</>
}

const ErrorScreen = ({
  title = 'Error',
  message,
  action,
}: {
  title?: string
  message?: string
  action?: {
    text: string
    url: string
  }
}) => {
  return (
    <YStack padding="$2" alignItems="center" space>
      <Lock size="$10" />
      <H2 textAlign="center">{title}</H2>
      {!!message && <Paragraph textAlign="center">{message}</Paragraph>}{' '}
      {action && <ButtonLink href={action.url}>{action.text}</ButtonLink>}
    </YStack>
  )
}
