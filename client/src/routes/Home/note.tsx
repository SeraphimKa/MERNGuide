import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);

        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
        } else {
          throw new Error("Failed to fetch the data.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [baseURL]);

  const updateNote = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: "PUT",
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
          navigate("/");
        }, 1000);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNote = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(baseURL, {
        method: "DELETE",
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          Back
        </Link>
        <button onClick={removeNote} className="delete">
          Remove
        </button>
      </div>

      <form onSubmit={updateNote}>
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

export default UpdateNote;
