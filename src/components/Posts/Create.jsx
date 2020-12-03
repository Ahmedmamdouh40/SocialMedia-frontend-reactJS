import React from 'react';
import Navbar from '../Header/Navbar';
import styles from '../css/create.module.css';
import Cookies from 'universal-cookie';
import { Component } from 'react';
import axios from 'axios';

const cookies = new Cookies();

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hashtag: '',
            content: '',
            userId: ''
        }
    }

    handleChange = ({ target }) => {
        this.setState({ ...this.state, [target.name]: target.value });

    };


    onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/posts", this.state, {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        }).then(res => {
            //alert  done
            this.props.history.replace('/');
        }).catch(e => {
            console.log(e);
        })
    }


    render() {
        return (
            <React.Fragment>
                <Navbar />
                <br />
                <div className={styles.create}>
                    <form onSubmit={this.onSubmit}>
                        <legend className="text-center">Create New Post</legend>

                        <div className="form-group">
                            <label>Hashtag</label>
                            <input type="text" name="hashtag" ref={this.titleRef} className="form-control" placeholder="Hashtag.." onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Content:</label>
                            <textarea className="form-control" name="content" rows="7" cols="25" ref={this.contentRef} placeholder="Here write your content.." onChange={this.handleChange}></textarea>
                        </div>


                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Form;