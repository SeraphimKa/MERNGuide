import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Note {
  _id: string;
  title: string;
  description?: string;
}

function Notes() {
  const baseURL = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const [data, setData] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL);

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          throw new Error("Failed to fetch data.");
        }
      } catch (error) {
        setError("Error fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  return (
    <>
      <h2>Notes:</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="notes">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/note/${item._id}`}>
                <h3>{item.title}</h3>
                <p>
                  {item.description && item.description.length > 50
                    ? `${item.description.substring(0, 50)}...`
                    : item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button className="add-note-button">
        <Link to={"/add-note"}>+</Link>
      </button>
    </>
  );
}

export default Notes;
