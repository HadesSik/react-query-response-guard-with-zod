interface IFDataParserProps<T = Record<string, unknown>> {
  data: T
  dataKey: keyof T
  className?: string
}

const DataParser = <T,>({ data, dataKey, className }: IFDataParserProps<T>) => {
  return (
    <div className={className} style={{ display: 'flex', gap: '20px' }}>
      <span>data.{String(dataKey)} : </span>
      <div
        style={{
          maxWidth: '200px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >{`${data[dataKey]}`}</div>
      <span> [{typeof data[dataKey]}]</span>
    </div>
  )
}

export default DataParser
