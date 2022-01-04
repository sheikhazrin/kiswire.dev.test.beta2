import React from 'react';

function TextError(props) {
  return <div className="d-block invalid-feedback">{props.children}</div>;
}

export default TextError;
