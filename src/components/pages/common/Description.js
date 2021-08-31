import React, { Component } from 'react'
import { tostNtf } from '../../healpers/Alert';
import { storeData } from '../../services/DescriptionService';

export default class Description extends Component {
    state = {
        type: 'Title',
        description: '',
        url: '',
        errors: []
    };

    changeInput = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    submiteForm = async (e) => {
        e.preventDefault();
        const data = {
            type: this.state.type,
            description: this.state.description,
            url: this.state.url,
            user_id: 1,
        }
        const response = await storeData(data);
        console.log(`response`, response);
        if (response.status) {
            await tostNtf(response.message);
            this.setState({
                description: '',
                type: '',
                url: '',
            });
            ('.modal').hide();
        } else {
            console.log(`ressponse.errors`, response.errors)
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }

    }

    render() {
        return (
            <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">+ New Description</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.submiteForm} enctype="multipart/form-data">

                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Type:</label>
                                    <select className="form-control" name="type" onChange={(e) => this.changeInput(e)} value={this.state.category}>
                                        <option value="Title">Title</option>
                                        <option value="Description">Description</option>
                                        <option value="Step">Step</option>
                                        <option value="Moreinfo">Moreinfo</option>
                                        <option value="Code">Code</option>
                                        <option value="Image">Image</option>
                                        <option value="Command">Command</option>
                                    </select>
                                </div>
                                {this.state.errors && this.state.errors.description && (
                                    <span className="text-danger">{this.state.errors.description[0]}</span>
                                )}
                                {this.state.type == 'Title' ?
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Title:</label>
                                        <input onChange={(e) => this.changeInput(e)} value={this.state.description} placeholder="Title" type="text" name="description" className="form-control" />
                                    </div>
                                    : this.state.type == 'Description' ?
                                        <div className="form-group">
                                            <label htmlFor="message-text" className="col-form-label">Description:</label>
                                            <textarea name="description" onChange={(e) => this.changeInput(e)} className="form-control" id="message-text" placeholder="Description" />
                                        </div>
                                        : this.state.type == 'Step' ?
                                            < div className="form-group">
                                                <label htmlFor="message-text" className="col-form-label">Step:</label>
                                                <input onChange={(e) => this.changeInput(e)} value={this.state.description} placeholder="Step" name="description" type="text" className="form-control" placeholder="Step" />
                                            </div>
                                            : this.state.type == 'Moreinfo' ?
                                                <div className="form-group">
                                                    <label htmlFor="message-text" className="col-form-label">More Info:</label>
                                                    <input onChange={(e) => this.changeInput(e)} value={this.state.description} type="text" name="description" className="form-control" placeholder="More Info text" />
                                                    <input onChange={(e) => this.changeInput(e)} value={this.state.url} type="url" name="url" className="form-control" placeholder="Info url" />
                                                </div>
                                                : this.state.type == 'Image' ?
                                                    <div className="form-group">
                                                        <label htmlFor="message-text" className="col-form-label">Image:</label>
                                                        <input onChange={(e) => this.changeInput(e)} value={this.state.description} type="file" name="description" />
                                                    </div>
                                                    : this.state.type == 'Code' ?
                                                        <div className="form-group">
                                                            <label htmlFor="message-text" className="col-form-label">Code:</label>
                                                            <textarea onChange={(e) => this.changeInput(e)} name="description" type="text" placeholder="Code" className="form-control" />
                                                        </div>
                                                        : this.state.type == 'Command' ?
                                                            <div className="form-group">
                                                                <label htmlFor="message-text" className="col-form-label">Command:</label>
                                                                <textarea onChange={(e) => this.changeInput(e)} name="description" type="text" className="form-control" placeholder="Command" />
                                                            </div>
                                                            : null
                                }
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-sm btn-primary">Save Changes</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div >


        )
    }
}
