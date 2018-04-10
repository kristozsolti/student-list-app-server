import React, { Component } from 'react';
import { loadHistoryList, refreshHistoryListState, unsubscribeFromEvents, searchHistory, historySearchResult, showLoadingAnimation, noMoreResults } from '../api/api';
import OneHistory from './History';
import { Row, Col, Glyphicon, FormGroup, InputGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import BottomScrollListener from 'react-bottom-scroll-listener';

class HistoryList extends Component {
    state = {
        inputValue: '',
        historyList: [],
        paginationFrom: 0,
        paginationTo: 10,
        showLoader: false,
        noMoreResults: false,
        search: false

    }

    componentDidMount() {
        const from = this.state.paginationFrom;
        const to = this.state.paginationTo;
        loadHistoryList(from, to);

        refreshHistoryListState((history) => {
            this.setState(prevState => ({
                historyList: prevState.historyList.concat(history)
            }));
        });

        historySearchResult((searchResult) => {
            this.setState({ historyList: searchResult })
        });

        showLoadingAnimation((status) => this.setState({
            showLoader: status
        }));

        noMoreResults((status) => this.setState({
            noMoreResults: status
        }));

    }

    handleSearchInput = (event) => {
        event.preventDefault();
        this.setState({
            inputValue: event.target.value,
            search: true
        });

        //SetTimeout otherwise the last character is not present
        setTimeout(() => {
            searchHistory(this.state.inputValue);
        }, 0);

    }

    handleSearchInputReset = () => {
        this.setState({
            inputValue: '',
            historyList: [],
            paginationFrom: 0,
            paginationTo: 10,
            showLoader: false,
            noMoreResults: false,
            search: false
        });

        loadHistoryList(0, 10);
    }

    onBottomHandler = () => {
        if (!this.state.search && !this.state.noMoreResults) {
            const from = this.state.paginationTo;
            const to = from + 10;

            this.setState({
                paginationFrom: from,
                paginationTo: to,
                showLoader: true
            });

            loadHistoryList(this.state.paginationFrom, this.state.paginationTo);
        }
    }

    render() {
        const histories = this.state.historyList.map(
            (history, index) =>
                <OneHistory key={history.id} index={index} {...history} />
        );
        const loader = (
            <Modal show={this.state.showLoader}>
                <Modal.Body className="text-center">
                    <h3><Glyphicon glyph="refresh" />Loading...</h3>
                </Modal.Body>
            </Modal>
        );
        const noResults = (
            <Row>
                <Col md={6} xs={6} mdOffset={4} xsOffset={4}>
                    <h3><Glyphicon glyph="remove" /> No (more) result(s).</h3>
                </Col>
            </Row>
        );
        return (
            <div>
                <Row>
                    <Col md={4} mdOffset={4} xs={6} xsOffset={3}>
                        <FormGroup>
                            <ControlLabel>Search by date</ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <Glyphicon glyph="search" />
                                </InputGroup.Addon>
                                <FormControl type="date" value={this.state.inputValue} onChange={(e) => this.handleSearchInput(e)} />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md={1} xs={1}>
                        <ControlLabel>Reset search field</ControlLabel>
                        <Button bsStyle="info" onClick={this.handleSearchInputReset}>
                            <Glyphicon glyph="repeat" /> Reset
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
                        {histories}
                        {this.state.showLoader ? loader : null}
                        {this.state.noMoreResults ? noResults : null}
                        <BottomScrollListener onBottom={this.onBottomHandler} />
                    </Col>
                </Row>
            </div>
        );
    }

    componentWillUnmount() {
        unsubscribeFromEvents();
    }

}

export default HistoryList;
