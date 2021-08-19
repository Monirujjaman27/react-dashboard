import React from 'react'

export default function SpinnerLoading(props) {
    const spinnarstyle = {
        width: props.width,
        height: props.width,
        animation: props.animation,
        textAlign: 'center',
    };
    return (
        <div className="spinner-grow" style={spinnarstyle} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}
