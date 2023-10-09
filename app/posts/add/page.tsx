"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "@/globalStore/store";
import { createPosts } from "@/globalStore/slices/postSlice";
import { useRouter } from "next/navigation";
import withAuth from "@/app/auth/withAuth";
const Add = () => {
  const router = useRouter();
  const { userData } = useAppSelector((state) => state.post);
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const redirect = () => router.replace("/posts");
  const handleAdd = () => {
    if (title.length < 1 && content.length < 1) {
      setError(true);
    }
    dispatch(
      createPosts({
        userId: userData.userId,
        title,
        content,
        username: userData.username,
        redirect,
      })
    );
  };

  useEffect(() => {
    setError(false);
  }, [title, content]);
  return (
    <div>
      <div>
        <label>Title:</label>
        <ReactQuill
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter the title here..."
        />
      </div>
      <div>
        <label>Content:</label>
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          placeholder="Write your blog post content here..."
        />
      </div>
      {error && (
        <span className="text-red-500 text-sm">Please enter all fields</span>
      )}
      <div className="flex justify-end my-5">
        <button
          className="border-none bg-red-500 text-white  p-2 px-3 rounded-md text-sm "
          onClick={handleAdd}
        >
          {loading ? "Creating..." : " Create Post"}
        </button>
      </div>
    </div>
  );
};

export default Add;
