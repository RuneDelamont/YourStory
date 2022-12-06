import React, {useState} from "react";
import { Modal } from "../../context/Modal";
import CreateAuthor from "./CreateAuthor";
import "./CreateAuthor.css";

export default function CreateAuthorModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id='create-author-button' onClick={() => setShowModal(true)}>
                Create Author
            </button>
            {/* {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateAuthor />
                </Modal>
            )} */}
        </>
    )
}