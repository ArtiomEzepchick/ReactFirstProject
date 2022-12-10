import React from "react"
import PropTypes from 'prop-types'

const areEqual = (prevProps, nextProps) => {
    const prevCountValue = prevProps.counterValue
    const nextCountValue = nextProps.counterValue

    return nextProps.label === 'Previous count is' && prevCountValue === nextCountValue
}

const Paragraph = React.memo(({ value, label }) => {
    const upperCasedLabel = label[0].toUpperCase() + label.slice(1)

    return (
        <p>
            <span>{upperCasedLabel}:
                <span className="value">
                    {value}
                </span>
            </span>
        </p>
    )
}, areEqual)

const ResultsData = ({ data, counterValue }) => {
    return (
        <div className='results-container'>
            <h2>Results</h2>
            {data.map(({ label, value }) => {
                return (
                    <Paragraph
                        key={label}
                        value={value}
                        label={label}
                        counterValue={counterValue}
                    />
                )
            })}
        </div>
    )
}

ResultsData.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    counterValue: PropTypes.number.isRequired
}

export default ResultsData