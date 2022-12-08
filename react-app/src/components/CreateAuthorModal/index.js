import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import CreateAuthor from './CreateAuthorForm'
import "./CreateAuthorForm";

export default function CreateAuthorModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-author-button' onClick={() => setShowModal(true)}>
                Create Author
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateAuthor />
                </Modal>
            )}
        </>
    )
}