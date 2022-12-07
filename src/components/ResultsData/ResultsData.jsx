import React from "react"

const areEqual = (prevProps, nextProps) => {
    const prevCountValue = prevProps.data.find(item => item.label === 'count')
    const nextCountValue = nextProps.data.find(item => item.label === 'count')

    return prevCountValue.value === nextCountValue.value
}

const ResultsData = React.memo(({ data }) => {
    return (
        <div className='results-container'>
            <h2>Results</h2>
            {data.map(({ label, value }) => (
                <p key={label}>
                    <span style={{ fontWeight: 'bold' }}>{label}: </span>
                    {value}
                </p>
            ))}
        </div>
    )
}, areEqual)

export default ResultsData