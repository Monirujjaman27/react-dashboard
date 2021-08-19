import React from 'react'
import { Link } from 'react-router-dom'
import { ADMIN_PREFIX } from '../healpers/profix'

export default function Bradcrumb(props) {
    return (
        <div className="content-header" >
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{props.title}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to={`${ADMIN_PREFIX}dashboard`}>Dashboard</Link></li>
                            <li className="breadcrumb-item active">{props.title}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div >
    )
}
