import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import CreatePageForm from './CreatePageForm';
import './CreatePageModal.css';

export default function CreatePageModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-page-button' onClick={() => setShowModal(true)}>
                New page
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePageForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}