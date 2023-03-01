import React, { useState, useEffect, useRef } from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import "./styles.css"

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false)
  const accordionRef = useRef(null)

  useEffect(() => {
    const onClick = e => {
      if (!accordionRef.current.contains(e.target)) {
        setIsActive(false)
      }
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [accordionRef])

  return (
    <section className="accordion-item" ref={accordionRef}>
      <section className={classNames("accordion-title", isActive && "accordion-title-active")} onClick={() => setIsActive(!isActive)}>
        <h2>{title}</h2>
        <p>{isActive ? "-" : "+"}</p>
      </section>
      {isActive &&
        <ul className="accordion-content">
          {content.map((item, index) => <li key={index}>{item.text}</li>)}
        </ul>}
    </section>
  )
}

Accordion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired
  })).isRequired
}

export default Accordion