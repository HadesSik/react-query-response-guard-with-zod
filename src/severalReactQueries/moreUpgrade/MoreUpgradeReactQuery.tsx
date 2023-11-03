import { FC, Suspense } from 'react'
import DataParserWithErrorBoundary from '../../components/DataParser'
import {
  useQuery_POSTS_by_UserId_CORRECT,
  useQuery_POSTS_by_UserId_WRONG,
} from './apis/posts'

interface IFMoreUpgradeReactQueryProps {
  className?: string
}

const MoreUpgradeReactQuery: FC<IFMoreUpgradeReactQueryProps> = ({
  className,
}) => {
  const { data: correctData } = useQuery_POSTS_by_UserId_CORRECT(1)

  const { data: wrongData } = useQuery_POSTS_by_UserId_WRONG(1)

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
