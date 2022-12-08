import React, {useState} from "react";
import { Modal } from "../../context/Modal"; 
import CreateBookForm from "./CreateBookForm";
import './CreateBookModal.css';

export default function CreateBookModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-book-button' onClick={() => setShowModal(true)}>
                Create Book
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateBookForm />
                </Modal>
            )}
        </>
    )
}