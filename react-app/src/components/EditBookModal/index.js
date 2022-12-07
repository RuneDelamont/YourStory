import React, { useState } from 'react';
import { Modal } from "../../context/Modal";
import EditBookForm from "./EditBookForm";
import "./EditBookModal.css";

export default function EditBookModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='edit-book-button' onClick={() => setShowModal(true)}>
                Edit Book
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditBookForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}