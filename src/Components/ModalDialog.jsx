import React, { useId } from 'react'
import { Button, Modal } from 'react-bootstrap'
const ModalDialog = React.forwardRef(function Input({
    title,
    status,
    msg,
    btnText ="OK",
    btnText2,
    btn2func,
    ...props
}, ref) {
    const id = useId()
    let logo = "images/success.gif";
    let btnClas = "btn btn-danger";
    if (status == 'success') {
        logo = "images/success.gif";
        btnClas = "btn btn-success";
    } else if (status == 'error') {
        logo = "images/error.webp";
        btnClas = "btn btn-danger";
    } else {
        logo = "images/warning.gif";
        btnClas = "btn btn-danger";
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton>
                <Modal.Title id={id}>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex justify-content-center flex-column align-items-center'>

                <img src={logo} alt="error" style={{ width: "7rem" }} />

                <p className='mt-3 fs-6'>
                    {msg}
                </p>

            </Modal.Body>
            <Modal.Footer>
                <Button className={btnText2 ? 'btn btn-danger' : btnClas} onClick={props.onHide}>{btnText}</Button>
                {btnText2 && <Button className={btnClas} onClick={btn2func}>{btnText2}</Button>}
            </Modal.Footer>
        </Modal>
    )
})

export default ModalDialog