"use client";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useAppSelector } from "@/globalStore/store";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/function";

const ViewPost = () => {
  const { id } = useParams<{ id: string }>();

  const { posts } = useAppSelector((state) => state.post);
  const post = posts.find((postItem) => postItem._id === id);

  return (
    <div className="flex flex-col justify-center items-center bg-white p-4 gap-y-4 mt-10 w-[90%] md:w-1/2 mx-auto rounded-md">
      <div>
        <h1
          className="font-bold"
          dangerouslySetInnerHTML={{ __html: post?.title || "" }}
        />
      </div>
      <div>
        <div
          className="mb-5"
          dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        />
        <div className="flex justify-between gap-y-6">
          <div>
            <p className="text-xs italic text-gray-400">Created</p>
            <span className="text-sm text-gray-500">
              {formatDate(post?.createdAt || "")}
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
