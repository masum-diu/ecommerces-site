import React from "react";

const Agreements = ({ data }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
};

export default Agreements;
