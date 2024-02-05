import React from "react";

const Agreements = ({ data }) => {
  return (
    <>
      <div className="privecyText"  dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
};

export default Agreements;
