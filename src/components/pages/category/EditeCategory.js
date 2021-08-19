import React, { Component } from 'react'
import Bradcrumb from '../../inc/Bradcrumb';
import { ADMIN_PREFIX, API_PREFIX } from '../../healpers/profix';
import { Link } from 'react-router-dom';
import SpinnerLoading from '../../inc/SpinnerLoading';
import { Update } from '../../services/CategoryService';
import axios from 'axios';
import Routes from '../../Routes';

export default class EditeCategory extends Component {
    state = {
        id: "",
        name: "",
        description: "",
        isLoading: false,
        errors: {},
    };

    componentDidMount() {
        axios.get((`${Routes.api.admin.category}/${this.props.match.params.id}/edit`))
            .then(response => {
                this.setState({
                    id: response.data.data.id,
                    name: response.data.data.name,
                    description: response.data.data.description,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // get data form impute 
    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


    //  action when enter submite  
    submiuteForm = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        const { history } = this.props;
        // loading effect when form submit 
        // data submite into form 
        const postData = {
            name: this.state.name,
            description: this.state.description,
            user_id: 1,
        };
        // response after form submite 
        const response = await Update(this.state.id, postData);
        if (response.status) {
            this.setState({
                name: "",
                description: "",
                isLoading: false,
            });
            history.push(`${ADMIN_PREFIX}category`);
        } else {
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }
    };
    render() {
        return (
            <div className="content-wrapper" >
                <Bradcrumb title={`Edit Category`} />
                {this.state.isloading === true ?
                    <div className="d-flex justify-content-center loadingspinner">
                        <SpinnerLoading width="1rem" animation="1s linear infinite spinner-grow" />
                        <SpinnerLoading width="1rem" animation="1.5s linear infinite spinner-grow" />
                        <SpinnerLoading width="1rem" animation="2s linear infinite spinner-grow" />
                    </div>
                    : null}
                <section className="content">
                    <div className="container-fluid">
                        <section className="row">
                            <div className="col-sm-12 col-md-8 m-md-auto">
                                <div className="card">
                                    <form onSubmit={this.submiuteForm}>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label>Name</label>
                                                {this.state.errors && this.state.errors.name && (
                                                    <p className="text-danger">{this.state.errors.name[0]}</p>
                                                )}
                                                <input onChange={(e) => this.changeInput(e)} value={this.state.name} name="name" className="form-control" placeholder="Name" />
                                                {this.state.errors && this.state.errors.description && (
                                                    <p className="text-danger">{this.state.errors.description[0]}</p>
                                                )}
                                                <label>Desctiption</label>
                                                <textarea onChange={(e) => this.changeInput(e)} value={this.state.description} name="description" placeholder="Description" className="form-control">{this.state.description}</textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer justify-content-between">
                                            <Link to={`${ADMIN_PREFIX}category`} className="btn btn-default btn-sm">Back</Link>
                                            <button type="submit" className="btn btn-primary btn-sm">Save changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>

        )
    }
}
