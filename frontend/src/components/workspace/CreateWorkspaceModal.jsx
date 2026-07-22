import { useState } from "react";
import "./CreateWorkspaceModal.css";

const CreateWorkspaceModal = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "Private",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Workspace name is required");
      return;
    }

    onCreate(formData);

    setFormData({
      name: "",
      description: "",
      visibility: "Private",
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Create Workspace</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Workspace Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter workspace name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Visibility</label>

            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
            >
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
            >
              Create Workspace
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;