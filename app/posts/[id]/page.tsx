"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "@/globalStore/store";
import { createPosts, editPosts } from "@/globalStore/slices/postSlice";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/function";

const ViewPost = () => {
  const { id } = useParams();

  const router = useRouter();
  const { posts } = useAppSelector((state) => state.post);
  const post = posts.find((postItem) => postItem._id === id);

  return (
    <div className="flex flex-col justify-center items-center bg-white p-4 gap-y-4 mt-10 w-[90%] md:w-1/2 mx-auto rounded-md">
      <div>
        <h1 className="" dangerouslySetInnerHTML={{ __html: post?.title }} />
      </div>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        <div className="flex justify-between">
          <div>
            <p className="text-xs italic text-gray-400">Created</p>
            <span className="text-sm text-gray-500">
              {formatDate(post?.createdAt)}
            </span>
          </div>
          <div>
            <p className="text-xs italic text-gray-400">Author</p>
            <span className="text-sm text-gray-500">{post?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
