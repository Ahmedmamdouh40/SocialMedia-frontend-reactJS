import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';
import styles from '../css/post.module.css';
import Navbar from '../Header/Navbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';




const cookies = new Cookies();

export default class Profile extends React.Component {

    current_user = cookies.get('userData');
    constructor(props) {
        super(props);
        console.log(this.current_user);
        this.state = {
            posts: [],
            load: false,
            filtered: [],
            userData: []
        }
    }
    updateUserData(userID) {

    }
    componentWillMount() {
        console.log("will");

    }

    componentDidMount() {
        axios.get("http://localhost:8000/api/user", {
            headers: { Authorization: `Bearer ${cookies.get('token')}` }
        }).then(res => {
            this.setState({ userData: res.data })
            axios.get(`http://localhost:8000/api/posts/me/${this.state.userData.id}`, {
                headers: { Authorization: `Bearer ${cookies.get('token')}` }
            })
                .then(res => {
                    console.log(res.data.data)
                    this.setState({
                        posts: res.data.data,
                        filtered: res.data.data,
                        load: true
                    })
                })

        }).catch(err => {
            console.log(err);
        })

    }

    onSearch = ({ target }) => {
        const posts = this.state.posts.filter(post => {
            return post.hashtag.includes(target.value);
        });

        this.setState({filtered: posts});
    }


    render() {
        return (
            <React.Fragment>
                <Navbar />
                {this.state.load ?
                    <div>
                         <div className={styles.post}>
                            <TextField onChange={this.onSearch} id="outlined-search" label="Search field" type="search" variant="outlined" />


                        </div>
                        <div className={styles.add}>
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                <Link to="/create" className={styles.btn}>
                                    Create
                                </Link>
                            </Button>
                        </div>

                        {this.state.filtered.map(post => {
                            return (
                                <React.Fragment>
                                    <div className={styles.post}>
                                        <div className="card">
                                            <div className="card-header">
                                                {post.hashtag}
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{post.content}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                </React.Fragment>
                            )
                        })}

                    </div>
                    :
                    <p>loading</p>}
            </React.Fragment>
        )
    }
}