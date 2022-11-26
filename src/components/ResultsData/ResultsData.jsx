import React from "react"

function ResultsData({ memoCount, values }) {
    const data = Object.entries(values)

    return (
        <div className='results-container'>
            {data.map(item => (
                <p key={item[0]}>
                    <span style={{ fontWeight: 'bold' }}>{item[0]}: </span>
                    {item[1]}
                </p>
            ))}
            <p>Previous count is {memoCount}</p>
        </div>
    )
}

export default ResultsData