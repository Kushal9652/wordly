import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useState } from "react";
import "../styles/button.css";

export const CreatePost = () => {
  const navigate = useNavigate();
  useTitle("Create Post");
  const postRef = collection(db, "posts");
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  async function handleCreatePost(event) {
    event.preventDefault();

    if (!postContent.trim()) return alert("Post content cannot be empty!");
    setIsSubmitting(true);

    const document = {
      title: event.target.title.value,
      description: event.target.description.value,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
      createdAt: new Date(),
    };

    try {
      await addDoc(postRef, document);
      setPostContent(""); // Clear input field
      setIsCreated(true); // Show "Created" message
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="create">
      <div className="heading">
        <h1>Add New Post</h1>
      </div>
      {isCreated ? (
        <div className="created-message">
          <p>Post Submitted Successfully!</p>
          <button onClick={() => navigate("/")} className="home-button">
            Go to Home
          </button>
        </div>
      ) : (
        <form className="createPost" onSubmit={handleCreatePost}>
          <input
            type="text"
            className="title"
            name="title"
            placeholder="Title"
            maxLength="50"
            required
          />
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="description"
            name="description"
            placeholder="Description"
            maxLength="600"
            required
          ></textarea>
          <button
            type="submit"
            className={isSubmitting ? "button-loading submit" : "submit"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitted" : "Create"}
          </button>
        </form>
      )}
    </section>
  );
}
