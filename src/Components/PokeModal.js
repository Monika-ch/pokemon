import React, { Component } from "react";
import { Card, CardBody, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../css/PokeModal.css";

export default class PokeModal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="modal">
          <Modal isOpen={this.props.isModalOpen} className="modal-dialog">
            <ModalHeader className="justify-content-center modal-header">
              <h1>{this.props.modalTitle}</h1>
            </ModalHeader>
            <ModalBody className="modal-body">
              <Card className="card">
                <h2>{this.props.modalContent}</h2>
                <CardBody className="btn-group">
                  <div>
                    <button
                      className="button1"
                      type="submit"
                      onClick={this.props.onClickButton1}
                    >
                      {this.props.modalButton1}
                    </button>
                    <button
                      className="button2"
                      type="submit"
                      onClick={this.props.onClickButton2}
                    >
                      {this.props.modalButton2}
                    </button>
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
