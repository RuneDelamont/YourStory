import React, {useState} from "react";
import { Modal } from "../../../context/Modal";
import SignUpForm from "./SignUpForm";
import "./SignUpForm.css";

export default function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='sign-up-button' onClick={() => setShowModal(true)}>
                Sign Up
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    )
}