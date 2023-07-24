import React from 'react'

const Terms = ({data}) => {
  return (
    <>
    {data?.slice(1)?.map((info)=><>
  <div dangerouslySetInnerHTML={{__html:info?.content}}/>
  </>)}
    </>
  )
}

export default Terms
