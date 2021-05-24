import React from 'react';

function DeleteAccountModal(props) {
    return (
        <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modalLabel">Delete account?</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    This will delete your profile information and all of your posts.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={props.onDeleteAccountClick}>Delete</button>
                </div>
                </div>
            </div>
        </div>

    )
}

export default DeleteAccountModal;