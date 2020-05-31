import { Transition } from 'react-transition-group';
import React, { useState } from 'react';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: any = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 1 },
};

export const Fade = () => {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition in={inProp} timeout={1500}>
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          >
            {`${state} ${inProp}`}
          </div>
        )}
      </Transition>
      <button onClick={() => setInProp(!inProp)}>
        Click to Enter
      </button>
    </div>
  );
};
