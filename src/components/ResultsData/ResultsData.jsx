import React from "react"

function ResultsData({ countRef, values }) {
    const data = Object.entries(values)

    return (
        <div className='results-container'>
            {data.map(item => (
                <p key={item[0]}>
                    <span style={{ fontWeight: 'bold' }}>{item[0]}: </span>
                    {item[1]}
                </p>
            ))}
            <p>Previous count is {countRef}</p>
        </div>
    )
}

export default ResultsData