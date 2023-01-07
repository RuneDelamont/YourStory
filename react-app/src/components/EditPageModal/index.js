import React, { useState } from 'react';
import { Modal } from "../../context/Modal";
import EditPageForm from './EditPageForm';
import './EditPageModal.css';

export default function EditPageModal({page}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='edit-page-button-modal' onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPageForm setShowModal={setShowModal} page={page} />
                </Modal>
            )}
        </>
    )
}