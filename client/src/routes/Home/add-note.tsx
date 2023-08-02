import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddNote() {
  const navigate = useNavigate();
  const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const addNote = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          navigate("..");
        }, 1000);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link to="/" className="back-button">
        Back
      </Link>

      <form onSubmit={addNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              className="title"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              cols={50}
              className="description"
            />
          </div>
        </div>
        <input
          type="submit"
          value={submitted ? "Saving note..." : "Save Note"}
          disabled={submitted}
        />

        <div className="text-center">
          {submitted && <p className="success-message">Note has been added!</p>}
        </div>
      </form>
    </>
  );
}

export default AddNote;
