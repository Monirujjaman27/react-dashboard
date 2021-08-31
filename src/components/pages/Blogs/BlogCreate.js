import axios from 'axios';
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import { tostNtf } from '../../healpers/Alert';
import Bradcrumb from '../../inc/Bradcrumb';
import SpinnerLoading from '../../inc/SpinnerLoading';
import Routes from '../../Routes';
import { storeData } from '../../services/BlogService';
import { delData } from '../../services/DescriptionService';
import Description from '../common/Description';

export default class BlogCreate extends Component {

    state = {
        title: "",
        slug: "",
        category: "",
        user_id: 1,
        tags: "",
        thumbnail: '',
        thumbnailid: 1,
        previewthumb: '',
        isLoading: false,
        errors: {},
        categorys: [],
        nullDescription: []
    };
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        axios.get(Routes.api.admin.getEnabledCategory).then((res) => {
            this.setState({
                categorys: res.data.data,
            });
        });
        axios.get(Routes.api.admin.nullDescription).then((res) => {
            this.setState({
                nullDescription: res.data.data,
            });
        });
    }
    // get data form impute 
    changeInput = (e) => {
        e.preventDefault();
        console.log(`${e.target.name}:`, e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handelOnchagefile = (files) => {
        console.log(`files`, files)
        this.setState({
            thumbnail: files,
            previewthumb: files,
        })
    }
    //  action when enter submite  
    submiuteForm = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        // loading effect when form submit 
        this.setState({ isLoading: true });
        // const data = {
        //     title: this.state.title,
        //     slug: this.state.slug,
        //     category: this.state.category,
        //     thumbnail: this.state.thumbnail,
        //     tags: this.state.tags,
        //     user_id: 1,
        // };
        // response after form submite 
        // const response = await storeData(data);

        const formdata = new FormData();
        formdata.append('title', this.state.title);
        formdata.append('slug', this.state.slug);
        formdata.append('category', this.state.category);
        formdata.append('thumbnail', this.state.thumbnail);
        formdata.append('tags', this.state.tags);
        formdata.append('user_id', this.state.user_id);

        await fetch(Routes.api.admin.blog, {
            method: 'POST',
            body: formdata,
        }).then(response => response.json())
            .then(data => {
                if (data.status) {
                    tostNtf(data.message);
                    this.setState({
                        title: '',
                        slug: '',
                        category: '',
                        tags: '',
                        thumbnail: '',
                        thumbnailid: 2,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        errors: data.errors,
                        isLoading: false,
                    });
                    console.log(`ressponse.errors`, data.errors)
                }
            })
    };


    async deleteDescriptionItem(id) {
        this.setState({ isloading: true });
        const res = await delData(id);
        if (res.status === 200) {
            this.getData();
            await tostNtf(res.data.message);
            this.setState({ isloading: false });
        } else {
            await tostNtf('Oppes something went wrong :) Please try again', 'warning')
        }
    }
    render() {
        return (
            <div className="content-wrapper" >
                <Bradcrumb title={`New Blog`} />
                <Description />
                {this.state.isloading === true ?
                    <div className="d-flex justify-content-center loadingspinner">
                        <SpinnerLoading width="1rem" animation="1s linear infinite spinner-grow" />
                        <SpinnerLoading width="1rem" animation="1.5s linear infinite spinner-grow" />
                        <SpinnerLoading width="1rem" animation="2s linear infinite spinner-grow" />
                    </div>
                    : null}
                <section className="content">
                    <div className="container-fluid">
                        <form onSubmit={this.submiuteForm} enctype="multipart/form-data">
                            <section className="row">
                                <div className="col-sm-12 col-md-9">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <label className="text-info">Title</label>{this.state.errors && this.state.errors.title && (<span className="text-danger">{this.state.errors.title[0]}</span>)}
                                                        <input type="text" onChange={(e) => this.changeInput(e)} value={this.state.title} name="title" className="form-control" placeholder="Title" />
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <label className="text-info">Slug</label>{this.state.errors && this.state.errors.slug && (<span className="text-danger">{this.state.errors.slug[0]}</span>)}
                                                        <input onChange={(e) => this.changeInput(e)} value={this.state.slug} name="slug" className="form-control" placeholder="Slug" />
                                                    </div>
                                                </div>
                                            </div>
                                            {this.state.nullDescription && this.state.nullDescription.map((item) => {
                                                return (
                                                    <div className="card-header p-1" key={item.id}>
                                                        <strong>ID/NO :</strong> {item.id} | <strong> Type: </strong>{item.type}
                                                        <div className="float-right">
                                                            <i className="fa fa-edit btn text-info btn-sm mr-3"></i>
                                                            <i onClick={() => { if (window.confirm('Are you sure you want to delete this item?')) this.deleteDescriptionItem(item.id) }} className="fa fa-trash text-danger pointer"></i>
                                                        </div>
                                                        {item.type == 'Title' ?
                                                            <div className="description__title">
                                                                <div>{item.description}</div>
                                                            </div>
                                                            : item.type == 'Description' ?
                                                                <div className="description__desc">
                                                                    <div>{item.description}</div>
                                                                </div>
                                                                : item.type == 'Step' ?
                                                                    <div className="description__step">
                                                                        <div>{item.description}</div>
                                                                    </div>
                                                                    : item.type == 'Moreinfo' ?
                                                                        <div className="description__info">
                                                                            <div><strong>Read Also:</strong> <a target="_blank" href={item.url}>{item.description}</a></div>
                                                                        </div>
                                                                        : item.type == 'Code' ?
                                                                            <div className="description__code">
                                                                                <code>{item.description}</code>
                                                                            </div>
                                                                            : item.type == 'Image' ?
                                                                                <div className="description__img">
                                                                                    <div>{item.description}</div>
                                                                                </div>
                                                                                : item.type == 'Image' ?
                                                                                    <div className="description__command">
                                                                                        <span> {item.description}</span>
                                                                                    </div>
                                                                                    : null
                                                        }
                                                    </div>
                                                )
                                            })
                                            }
                                            <button type="button" class="btn btn-sm btn-primary mt-2" data-toggle="modal" data-target=".bd-example-modal-lg">+ Add Description</button>
                                        </div>
                                        <div className="modal-footer justify-content-between">
                                            <Link to={Routes.web.admin.blog} className="btn btn-default btn-sm">Back</Link>
                                            <button type="submit" className="btn btn-primary btn-sm">Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label className="text-info"><i className="fas fa-tag"></i> Category</label>
                                                {this.state.errors && this.state.errors.category && (<p className="text-danger">{this.state.errors.category[0]}</p>)}
                                                <select onChange={(e) => this.changeInput(e)} value={this.state.category} className="form-control" name="category">
                                                    <option>---- Select category ---</option>
                                                    {this.state.categorys && this.state.categorys.map((item) => {
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
                                                <label for="img_input_label" className="img_input_label"></label>
                                                <input id="img_input_label" className="d-none" onChange={(e) => this.handelOnchagefile(e.target.files[0])} type="file" accept="image/*" />
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
