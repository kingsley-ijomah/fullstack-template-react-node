import React from 'react';

export default function Errors(props) {
  const { errors, ...rest } = props;
  return (
    <>
      {errors && errors.data && (
        <div
          style={{
            color: 'red',
            border: '1px #fdccd solid',
            backgroundColor: '#feebec',
            width: '500px',
          }}
          data-testid="error"
          {...rest}>
          <p style={{ padding: '10px' }}>{errors.data}</p>
        </div>
      )}
    </>
  );
}
