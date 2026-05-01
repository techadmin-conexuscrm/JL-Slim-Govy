import type { Offer } from '../types'
import { api, extractErrorMessage } from '../axios'

export const AVAILABLE_RESOURCES = [
  'orders',
  'products',
  'campaigns',
  'offers',
  'customers',
  'fulfillments',
  'transactions',
  'members',
  'tasks',
  'imports',
  'chats',
  'messages',
  'notes',
  'calls',
  'attachments',
] as const

export type Resource = (typeof AVAILABLE_RESOURCES)[number]

export interface SearchParams<T extends Resource = Resource> {
  organizationId: string | undefined
  resource: T
  limit?: number
  page?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  q?: string
  filters?: Record<string, any>
}

export type SearchData<T extends Resource> = T extends 'offers' ? Offer<true>[] : any[]

export type SearchResult<T extends Resource> = {
  count: number
  data: SearchData<T>
}

export async function searchResources<T extends Resource>(
  params: SearchParams<T>,
  apiKey: string,
): Promise<SearchResult<T>> {
  try {
    const { data } = await api.post(
      `/api/v1/search?api_key=${apiKey}`,
      {
        organizationId: params.organizationId,
        resource: params.resource,
        limit: params.limit ?? 10,
        page: params.page ?? 1,
        sortBy: params.sortBy ?? '',
        sortOrder: params.sortOrder ?? undefined,
        q: params.q ?? '',
        filters: params.filters ?? {},
      },
      {
        params: {
          resource: params.resource,
          organizationId: params.organizationId,
        },
      },
    )
    return { data: data.data, count: data.meta?.total ?? 0 }
  } catch (error) {
    throw extractErrorMessage(error)
  }
}
