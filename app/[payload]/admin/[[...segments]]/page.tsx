"use client"

import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({ params, searchParams }: Args) => {
  return generatePageMetadata({ 
    config, 
    params, 
    searchParams
  })
}

const Page = async ({ params, searchParams }: Args) => {
  const resolvedConfig = await config; // config is Promise<SanitizedConfig>
  const importMap = resolvedConfig.importMap; // ImportMap

  return (
    <RootPage 
      config={config} 
      importMap={importMap}
      params={params} 
      searchParams={searchParams} 
    />
  )
}

export default Page
