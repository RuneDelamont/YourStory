import React, {useState} from "react";
import { Modal } from "../../../context/Modal";
import LogInForm from "./LogInForm";
import './LogInForm.css';

export default function LogInFormModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button id='login-button' onClick={() => setShowModal(true)}>
                Log In
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LogInForm />
                </Modal>
            )}
        </>
    )
}