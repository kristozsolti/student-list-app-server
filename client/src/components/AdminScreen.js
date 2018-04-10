import React, { Component } from 'react';
import StudentList from './StudentList';
import { saveStudentList, clearStudentList } from '../api/api';
import { Row, Col, Panel, Button, Glyphicon, Modal } from 'react-bootstrap';

class AdminScreen extends Component {
  state = {
    showModal: false
  }

  handleSaveStudentList = (studentList, date) => {
    saveStudentList(studentList, date);
  }

  showConfirmModal = () => {
    this.setState({ showModal: true })
  }

  hideConfirmModal = () => {
    this.setState({ showModal: false })
  }

  handleClearStudentList = () => {
    clearStudentList();
    this.hideConfirmModal();
  }

  render() {
    const saveStudentListBtn = (
      <Button bsStyle="info" onClick={() => this.handleSaveStudentList(this.props.studentList, this.props.date)}>
        <Glyphicon glyph="save" /> Save Student List
      </Button>
    );
    const clearStudentListBtn = (
      <Button bsStyle="danger" onClick={this.showConfirmModal}>
        <Glyphicon glyph="trash" /> Clear Student List
      </Button>
    );
    const confirmModal = (
      <Modal show={this.state.showModal} onHide={this.hideConfirmModal}>
        <Modal.Header>
          <Modal.Title>
            <Glyphicon glyph="alert" /> Are You sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to clear the student list.
          </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideConfirmModal}>
            <Glyphicon glyph="remove" />
            Close
          </Button>
          <Button bsStyle="danger" onClick={this.handleClearStudentList}>
            <Glyphicon glyph="trash" />
            Clear Student List
          </Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <Row>
        <Col md={12}>
          <Panel>
            <Panel.Body>
              <Col md={2}>
                {this.props.isAdmin ? saveStudentListBtn : null}
              </Col>
              <Col md={8}>
                <StudentList
                  saveStudentList={this.handleSaveStudentList}
                  saveStudentHandler={this.props.saveStudentHandler}
                  removeStudentHandler={this.props.removeStudentHandler}
                  studentList={this.props.studentList}
                  studentList2={this.props.studentList2}
                  presence={this.props.presence}
                  isAdmin={this.props.isAdmin}
                  date={this.props.date}
                />
                {confirmModal}
              </Col>
              <Col md={2}>
                {this.props.isAdmin ? clearStudentListBtn : null}
              </Col>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default AdminScreen;
