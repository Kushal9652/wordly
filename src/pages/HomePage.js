import { useEffect, useState, useRef } from "react";
import { useTitle } from "../hooks/useTitle";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { PostCard, SkeletonCard } from "../components";

export const HomePage = () => {
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [toggle, setToggle] = useState(false);
  useTitle("Home");

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
      setIsLoading(false); // Data has been fetched
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [toggle]);

  return (
    <section>
      {isLoading ? (
        // Show skeleton cards while loading
        new Array(2).fill(null).map((_, index) => <SkeletonCard key={index} />)
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} toggle={toggle} setToggle={setToggle} />
        ))
      )}
    </section>
  );
}
