import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import EditAuthorForm from "./EditAuthorForm";
import "./EditAuthorModal.css";

export default function EditAutorModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='edit-author-button' onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditAuthorForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}