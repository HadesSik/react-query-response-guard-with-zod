import { useSuspenseQuery } from '@tanstack/react-query'
import { FC, Suspense } from 'react'
import API from '../../modules/API'
import DataParserWithErrorBoundary from '../../components/DataParser'

interface IFPureReactQueryProps {
  className?: string
}

const PureReactQuery: FC<IFPureReactQueryProps> = ({ className }) => {
  const { data: correctData } = useSuspenseQuery<
    {
      userId: number
      id: number
      title: string
      body: string
    }[]
  >({
    queryKey: ['pure', 'correctQuery'],
    queryFn: () => API.GET('posts?userId=1').then((res) => res.data),
  })

  const { data: wrongData } = useSuspenseQuery<
    {
      userid: number
      id: string
      title: string
      body: string
    }[]
  >({
    queryKey: ['pure', 'wrongQuery'],
    queryFn: () => API.GET('posts?userId=1').then((res) => res.data),
  })

  return (
    <div className={className} style={{ border: '1px solid #ddd' }}>
      <h2>PureReactQuery [LEVEL 1]</h2>
      <hr />
      <div>
        <h3 style={{ backgroundColor: 'green' }}>will correct query</h3>
        <h4>result</h4>
        <pre>{JSON.stringify(correctData, null, 2)}</pre>
        <h5>logic</h5>
        <div>
          <Suspense fallback="loading...">
            <DataParserWithErrorBoundary
              data={correctData?.[0]}
              dataKey="userId"
            />
            <DataParserWithErrorBoundary data={correctData?.[0]} dataKey="id" />
            <DataParserWithErrorBoundary
              data={correctData?.[0]}
              dataKey="title"
            />
            <DataParserWithErrorBoundary
              data={correctData?.[0]}
              dataKey="body"
            />
          </Suspense>
        </div>
      </div>
      <hr />
      <div>
        <h3 style={{ backgroundColor: 'orange' }}>will wrong query</h3>
        <h4>result</h4>
        <pre>{JSON.stringify(wrongData, null, 2)}</pre>
        <h5>logic</h5>
        <div>
          <Suspense fallback="loading...">
            <DataParserWithErrorBoundary
              data={wrongData?.[0]}
              dataKey="userid"
            />
            <DataParserWithErrorBoundary data={wrongData?.[0]} dataKey="id" />
            <DataParserWithErrorBoundary
              data={wrongData?.[0]}
              dataKey="title"
            />
            <DataParserWithErrorBoundary data={wrongData?.[0]} dataKey="body" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default PureReactQuery
