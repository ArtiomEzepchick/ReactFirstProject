import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types'

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false)
  const accordionRef = useRef(null)

  useEffect(() => {
    const onClick = e => {
      if (!accordionRef.current.contains(e.target)) {
        setIsActive(false)
      }
    }
  
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [accordionRef]);

  return (
    <div className="accordion-item" ref={accordionRef}>
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
}

export default Accordion