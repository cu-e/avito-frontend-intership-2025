import type { ComponentProps } from 'react';

function MaxContainer(props: ComponentProps<'div'>) {
  const { style, ...rest } = props;

  return (
    <div
      {...rest}
      style={{ width: '100%', maxWidth: '1000px', display: 'flex', padding: '0 20px', ...style }}
    ></div>
  );
}

export default MaxContainer;
