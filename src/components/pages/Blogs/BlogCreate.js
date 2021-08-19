import axios from 'axios';
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import { tostNtf } from '../../healpers/Alert';
import Bradcrumb from '../../inc/Bradcrumb';
import Routes from '../../Routes';
import { storeData } from '../../services/BlogService';

export default class BlogCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { category: [] };
        this.changeInput = this.changeInput.bind(this);
    }
    state = {
        title: "",
        slug: "",
        category: "",
        tags: "",
        thumbnail: "",
        previewthumb: '',
        isLoading: false,
        errors: {},
        category: []
    };
    componentDidMount() {
        axios.get(Routes.api.admin.enabledCategory).then((res) => {
            this.setState({
                category: res.data.data,
            });
        });
    }
    getData = () => {

    }
    // get data form impute 
    changeInput = (e) => {
        console.log(`e.target.title`, e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
        });
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    this.setState({ previewthumb: reader.result })
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    };
    //  action when enter submite  
    submiuteForm = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        // loading effect when form submit 
        this.setState({ isLoading: true });
        // data submite into form 
        const postData = {
            title: this.state.title,
            slug: this.state.slug,
            category: this.state.category,
            thumbnail: this.state.thumbnail,
            user_id: 1,
        };
        // response after form submite 
        const response = await storeData(postData);
        if (response.status) {
            tostNtf('Category Create successfully');
            this.setState({
                title: '',
                slug: '',
                category: '',
                tags: '',
                thumbnail: '',
                isLoading: false,
            });
        } else {
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
            console.log(`ressponse.errors`, response.errors)
        }
    };
    render() {
        return (
            <div className="content-wrapper" >
                <Bradcrumb title={`New Blog`} />
                <section className="content">
                    <div className="container-fluid">
                        <form onSubmit={this.submiuteForm}>
                            <section className="row">
                                <div className="col-sm-12 col-md-9">
                                    <div className="card">
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <label className="text-info">Title</label>{this.state.errors && this.state.errors.title && (<p classtitle="text-danger">{this.state.errors.title[0]}</p>)}
                                                        <input type="text" onChange={(e) => this.changeInput(e)} value={this.state.title} name="title" className="form-control" placeholder="Title" />
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <label className="text-info">Slug</label>{this.state.errors && this.state.errors.description && (<p className="text-danger">{this.state.errors.description[0]}</p>)}
                                                        <input onChange={(e) => this.changeInput(e)} value={this.state.slug} name="slug" className="form-control" placeholder="Slug" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer justify-content-between">
                                            <Link to={Routes.web.admin.blog} className="btn btn-default btn-sm">Back</Link>
                                            <button type="submit" className="btn btn-primary btn-sm">Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-3">
                                    <div className="card">
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label className="text-info"><i className="fas fa-tag"></i> Category</label>
                                                {this.state.errors && this.state.errors.category && (<p className="text-danger">{this.state.errors.category[0]}</p>)}
                                                <select onChange={(e) => this.changeInput(e)} value={this.state.category} className="form-control" name="category">
                                                    <option>---- Select category ---</option>
                                                    {this.state.category && this.state.category.map((item) => {
                                                        return (
                                                            <option key={item.id} value={item.id} > {item.name}</option>
                                                        )
                                                    })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                {this.state.errors && this.state.errors.tags && (<p className="text-danger">{this.state.errors.tags[0]}</p>)}
                                                <label className="text-info"><i className="fas fa-tags"></i> Tags <small>Use ; Between Tags </small></label>
                                                <input onChange={(e) => this.changeInput(e)} value={this.state.tags} type="text" name="tags" className="form-control" placeholder="Tags" />
                                            </div>
                                            <div className="form-group">
                                                <label className="text-info"><i className="fas fa-image"></i> Thumbnail</label>
                                                {this.state.errors && this.state.errors.thumbnail && (<p className="text-danger">{this.state.errors.thumbnail[0]}</p>)}
                                                {(this.state.previewthumb) ?
                                                    <img className="img-thumbnail" src={this.state.previewthumb} />
                                                    : null}
                                                <input onChange={(e) => this.changeInput(e)} type="file" name="thumbnail" accept="image/*" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </form>
                    </div>
                </section>
            </div >

        )
    }
}
