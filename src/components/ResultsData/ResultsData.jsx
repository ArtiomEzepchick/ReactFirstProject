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

Paragraph.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    label: PropTypes.string.isRequired
}

const ResultsData = ({ data, counterValue, isLoaded }) => {
    if (!isLoaded) return null

    return (
        <div className='results-container'>
            <h2>Results</h2>
            {data.map(({ label, value }) => {
                return (
                    <Paragraph
                        key={label}
                        value={String(value)}
                        label={label}
                        counterValue={counterValue}
                    />
                )
            })}
        </div>
    )
}

ResultsData.propTypes = {
    counterValue: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        label: PropTypes.string
    })).isRequired,
    isLoaded: PropTypes.bool.isRequired
}

export default ResultsData