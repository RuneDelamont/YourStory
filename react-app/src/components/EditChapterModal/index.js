import React, { useState } from 'react';
import { Modal } from "../../context/Modal";
import EditChapterForm from './EditChapterForm';
import "./EditChapterModal.css";

export default function EditChapterModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='edit-chapter-button' onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChapterForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}