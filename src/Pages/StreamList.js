import { useEffect, useState } from "react";
import {
  FaCheck,
  FaEdit,
  FaSave,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

function StreamList() {
  const [userInput, setUserInput] = useState("");

  const [streamItems, setStreamItems] = useState(() => {
    const savedItems = localStorage.getItem("streamItems");

    if (savedItems) {
      return JSON.parse(savedItems);
    }

    return [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    localStorage.setItem("streamItems", JSON.stringify(streamItems));
  }, [streamItems]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedInput = userInput.trim();

    if (trimmedInput === "") {
      return;
    }

    const newItem = {
      id: Date.now(),
      title: trimmedInput,
      completed: false,
    };

    setStreamItems((currentItems) => [
      ...currentItems,
      newItem,
    ]);

    console.log("Movie added:", trimmedInput);

    setUserInput("");
  }

  function handleDelete(id) {
    setStreamItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function handleComplete(id) {
    setStreamItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  }

  function beginEditing(item) {
    setEditingId(item.id);
    setEditedText(item.title);
  }

  function saveEdit(id) {
    const trimmedText = editedText.trim();

    if (trimmedText === "") {
      return;
    }

    setStreamItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              title: trimmedText,
            }
          : item
      )
    );

    setEditingId(null);
    setEditedText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditedText("");
  }

  return (
    <section className="stream-page">
      <h1>Create Your List</h1>

      <p>
        Enter a movie or television show that you would like to watch.
      </p>

      <form className="stream-form" onSubmit={handleSubmit}>
        <label htmlFor="stream-input">
          Movie or Show Title
        </label>

        <div className="input-row">
          <input
            id="stream-input"
            type="text"
            value={userInput}
            onChange={(event) =>
              setUserInput(event.target.value)
            }
            placeholder="Enter a movie or TV show"
          />
        </div>

        <div className="button-row">
          <button type="submit">
            Add to List
          </button>
        </div>
      </form>

      <div className="list-section">
        <h2>Your Movie List</h2>

        {streamItems.length === 0 ? (
          <p className="empty-message">
            No movies or shows have been added.
          </p>
        ) : (
          <ul className="stream-list">
            {streamItems.map((item) => (
              <li
                key={item.id}
                className={
                  item.completed
                    ? "stream-item completed"
                    : "stream-item"
                }
              >
                {editingId === item.id ? (
                  <div className="edit-area">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(event) =>
                        setEditedText(event.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="icon-button save-button"
                      onClick={() => saveEdit(item.id)}
                      title="Save"
                    >
                      <FaSave />
                    </button>

                    <button
                      type="button"
                      className="icon-button cancel-button"
                      onClick={cancelEdit}
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="item-title">
                      {item.title}
                    </span>

                    <div className="item-actions">
                      <button
                        type="button"
                        className="icon-button complete-button"
                        onClick={() =>
                          handleComplete(item.id)
                        }
                        title="Complete"
                      >
                        <FaCheck />
                      </button>

                      <button
                        type="button"
                        className="icon-button edit-button"
                        onClick={() =>
                          beginEditing(item)
                        }
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        className="icon-button delete-button"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default StreamList;