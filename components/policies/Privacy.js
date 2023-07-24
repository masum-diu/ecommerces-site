import React from 'react'

const Privacy = ({data}) => {
  // console.log(data)
  return (
    <>
  {data?.slice(0)?.map((info)=><>
  <div dangerouslySetInnerHTML={{__html:info?.content}}/>
  </>)}
    </>
  )
}

export default Privacy
