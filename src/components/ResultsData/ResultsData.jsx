import React from "react"

const areEqual = (prevProps, nextProps) => {
    const prevCountValue = prevProps.counterValue
    const nextCountValue = nextProps.counterValue

    return nextProps.label === 'Previous count is' && prevCountValue === nextCountValue
}

const Paragraph = React.memo(({ value, label }) => {
    return (
        <p>
            <span style={{ fontWeight: 'bold' }}>{label}: </span>
            {value}
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

export default ResultsData