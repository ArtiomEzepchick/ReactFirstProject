import React from "react";

const withIsLoadingCheck = (Component) => {
    return ({ isLoading, ...props }) => {
        return (isLoading) ? <Component {...props} className='blocked' /> : <Component {...props} />
    }
}

export default withIsLoadingCheck