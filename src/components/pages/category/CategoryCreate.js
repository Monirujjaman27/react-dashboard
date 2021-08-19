import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import { tostNtf } from '../../healpers/Alert';
import Bradcrumb from '../../inc/Bradcrumb';
import Routes from '../../Routes';
import { storeData } from '../../services/CategoryService';

export default class CategoryCreate extends Component {

    state = {
        name: "",
        description: "",
        isLoading: false,
        errors: {},
    };
    // get data form impute 
    changeInput = (e) => {
        console.log(`e.target.name`, e.target.name)
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    //  action when enter submite  
    submiuteForm = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        // loading effect when form submit 
        this.setState({ isLoading: true });
        // data submite into form 
        const postData = {
            name: this.state.name,
            description: this.state.description,
            user_id: 1,
        };
        // response after form submite 
        const response = await storeData(postData);
        if (response.status) {
            tostNtf('Category Create successfully');
            this.setState({
                name: "",
                description: "",
                isLoading: false,
            });
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
                <Bradcrumb title={`Create Category`} />
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
                                            <Link to={Routes.web.admin.category} className="btn btn-default btn-sm">Back</Link>
                                            <button type="submit" className="btn btn-primary btn-sm">Save</button>
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
