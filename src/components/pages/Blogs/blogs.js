import React, { Component } from 'react'
import ReactDatatable from '@ashvin27/react-datatable';
import Bradcrumb from '../../inc/Bradcrumb';
import axios from 'axios';
import SpinnerLoading from '../../inc/SpinnerLoading';
import { delData, StEaD } from '../../services/BlogService';
import { Link } from 'react-router-dom';
import { tostNtf } from '../../healpers/Alert';
import Routes from '../../Routes';
import dateFormat from 'dateformat';
export default class Blogs extends Component {
    state = {
        isloading: false,
        records: [],
    };
    componentDidMount() {
        this.getData();
    };
    getData = async () => {
        this.setState({ isloading: true });
        await axios.get(Routes.api.admin.blog).then((res) => {
            const records = res.data.data
            this.setState({
                records,
                isloading: false
            })
        });
    };

    constructor(props) {
        super(props);
        this.columns = [
            {
                key: "id",
                text: "Id",
            },
            {
                key: "title",
                text: "Title",
                className: "text-dark",
                align: "left",
                sortable: true,
                cell: record => {
                    return (
                        <>
                            <span title={record.title}>
                                {record.title.length > 15 ? record.title.substring(0, 15) : ''}
                            </span>
                        </>
                    )
                }
            },
            {
                key: "thumbnail",
                text: "Thumbnail",
                align: "left",
            },
            {
                key: 'status',
                text: "Status",
                className: "status",
                align: "left",
                cell: record => {
                    return (
                        <>
                            <span onClick={() => this.changeStatus(record.id)} className={`btn btn- sm badge ${record.status == 0 ? 'badge-info' : 'badge-warning'} `}>
                                {record.status == 0 ? 'Enable' : 'Desable'}
                            </span>
                        </>
                    );
                }
            },
            {
                key: "created_at",
                text: "Created At",
                className: "created-at",
                align: "left",
                cell: record => {
                    return dateFormat(record.created_at, 'dd mmm yyyy, h:MM TT')
                }
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <>
                            <Link to={`${Routes.web.admin.blog} /edit/${record.id} `}
                                className="btn text-info btn-sm"
                                style={{ marginRight: '3px' }}>
                                <i className="fa fa-edit"></i>
                            </Link>
                            <button
                                className="btn text-danger btn-sm"
                                onClick={() => { if (window.confirm('Are you sure you want to delete this item?')) this.deleteRecord(record) }}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </>
                    );
                }
            }
        ];
        this.config = {
            page_size: 20,
            length_menu: [20, 50, 100],
            show_pagination: true,
            pagination: 'advance',

        }

        this.state = {
            records: this.state.records
        }

    }


    // action change status enabled and desabled 
    changeStatus = async (id) => {
        this.setState({ isloading: true });
        const res = await StEaD(id);
        if (res.status == 200) {
            this.getData();
            tostNtf('Status Changed successfully')
        } else {
            tostNtf('Oppes something went wrong :) Please try again', 'warning')
        }
    }


    //delete record from the row
    async deleteRecord(record) {
        this.setState({ isloading: true });
        const res = await delData(record.id);
        if (res.status === 200) {
            this.getData();
            tostNtf('blog Delete successfully');
        } else {
            tostNtf('Oppes something went wrong :) Please try again', 'warning')
        }
    }

    render() {
        return (<div className="content-wrapper" >
            <Bradcrumb title={`Blog`} />
            <section className="content p-0">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Link to={Routes.web.admin.blogCreate} className="btn btn-info btn-sm mb-2"> <i className="fas fa-plus"></i>  Add New</Link>
                            <div className="card p-2">
                                {this.state.isloading === true ?
                                    <div className="d-flex justify-content-center loadingspinner">
                                        <SpinnerLoading width="1rem" animation="1s linear infinite spinner-grow" />
                                        <SpinnerLoading width="1rem" animation="1.5s linear infinite spinner-grow" />
                                        <SpinnerLoading width="1rem" animation="2s linear infinite spinner-grow" />
                                    </div>
                                    : null}
                                <div className="table-responsive">
                                    <ReactDatatable
                                        className="table table-hover table-striped"
                                        config={this.config}
                                        records={this.state.records}
                                        columns={this.columns}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}