import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon, Image, Button } from 'react-bootstrap';
import { listenForFbLogin } from '../api/api';

class Header extends Component {
    state = {
        loggedIn: null,
    }

    componentDidMount() {
        listenForFbLogin((response) => {
            this.setState({ loggedIn: response });
        });
    }

    handleLogOut = () => {
        this.setState({ loggedIn: null });
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Glyphicon glyph="book" />
                        <Link to="/"> Catalogue</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Brand>
                        <Glyphicon glyph="list-alt" />
                        <Link to="/history"> History</Link>
                    </Navbar.Brand>
                    {
                        this.state.loggedIn
                            ? <div className="pull-right">
                                <Navbar.Text>
                                    Signed in as:
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Image src={this.state.loggedIn.pictureUrl} width={25} circle />
                                    {this.state.loggedIn.name}
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Button bsSize="xs" onClick={this.handleLogOut}>
                                        <Glyphicon glyph="log-out" /> LogOut
                                </Button>
                                </Navbar.Text>
                            </div>
                            : null
                    }
                    <Navbar.Brand className="pull-right">
                        <Glyphicon glyph="user" />
                        <Link to="/admin"> Admin</Link>
                    </Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
