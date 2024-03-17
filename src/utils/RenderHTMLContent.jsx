
import React from 'react';

const RenderHTMLContent = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default RenderHTMLContent;
