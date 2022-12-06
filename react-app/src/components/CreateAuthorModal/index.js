import React, {useState} from "react";
import { Modal } from "../../context/Modal";
// import CreateAuthor from "./CreateAuthorModal";
import CreateAuthor from './CreateAuthorForm'
import "./CreateAuthorForm";

export default function CreateAuthorModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='create-author-button' onClick={() => setShowModal(true)}>
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