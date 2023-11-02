import { FC, Suspense } from 'react'
import DataParserWithErrorBoundary from '../../components/DataParser'
import {
  POST_USER_1_CORRECT,
  TPostUser1CorrectResponse,
  TPostUser1WrongResponse,
} from './apis/posts'
import useSuspenseQueryFn from './modules/useSuspenseQueryFn'

interface IFMoreUpgradeReactQueryProps {
  className?: string
}

const MoreUpgradeReactQuery: FC<IFMoreUpgradeReactQueryProps> = ({
  className,
}) => {
  const { data: correctData } = useSuspenseQueryFn<TPostUser1CorrectResponse>(
    'GET',
    {
      queryKey: [POST_USER_1_CORRECT],
    }
  )

  const { data: wrongData } = useSuspenseQueryFn<TPostUser1WrongResponse>(
    'GET',
    {
      queryKey: [POST_USER_1_CORRECT],
    }
  )

  return (
    <div className={className} style={{ border: '1px solid #ddd' }}>
      <h2>MoreUpgradeReactQuery [LEVEL 3]</h2>
      <hr />
      <div>
        <h3 style={{ backgroundColor: 'green' }}>will success query</h3>
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
        <h3 style={{ backgroundColor: 'orange' }}>will fail query</h3>
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

export default MoreUpgradeReactQuery
