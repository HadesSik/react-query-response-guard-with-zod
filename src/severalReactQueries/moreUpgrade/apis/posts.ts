import { z } from 'zod'
import useZodQuery from '../modules/useZodQuery'

const POSTS_by_UserId_CORRECT_SCHEMA = z.array(
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })
)

/**
 * @description userId를 통해 posts를 가져오는 API입니다.
 * @param userId userId를 전달합니다.
 * @returns
 */
export const useQuery_POSTS_by_UserId_CORRECT = (userId: number) =>
  useZodQuery(POSTS_by_UserId_CORRECT_SCHEMA, 'GET', {
    endpoint: 'posts',
    query: {
      userId,
    },
  })

const POSTS_by_UserId_WRONG_SCHEMA = z.array(
  z.object({
    userid: z.number(), // 서버와 약속이 다르다고 가정하기 위해 userid로 작성
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })
)

/**
 * @description userId를 통해 posts를 가져오는 API입니다.
 * @param userId userId를 전달합니다.
 * @returns
 */
export const useQuery_POSTS_by_UserId_WRONG = (userId: number) =>
  useZodQuery(
    POSTS_by_UserId_WRONG_SCHEMA,
    'GET',
    {
      endpoint: 'posts',
      query: {
        userId,
      },
    },
    {
      // 위 api와 같은 endpoint를 쓰기 때문에 임의로 키 값을 변경
      queryKey: ['test'],
    }
  )
