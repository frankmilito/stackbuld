"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/globalStore/store";
import { deletePosts, getPosts } from "@/globalStore/slices/postSlice";
import { useRouter } from "next/navigation";

import { paginate, formatDate, truncateText } from "@/lib/function";
import Pagination from "@/components/Pagination";
import RandomQuotes from "@/components/RandomQuotes";
import Link from "next/link";
const Posts = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { posts, userData } = useAppSelector((state) => state.post);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="  ">
      <h2 className="text-4xl my-20 leading-10 md:leading-normal w-full md:w-2/3 font-cursive mb-6 md:mb-10">
        <RandomQuotes />
      </h2>
      <div className="flex justify-between mb-10">
        <button
          className="border-none bg-red-500 text-white  p-2 px-3 rounded-md text-sm"
          onClick={() => router.push("/posts/add")}
        >
          Add Post
        </button>
        <input
          type="text"
          placeholder="Search posts"
          className=" rounded-lg p-2 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {posts.length > 0 ? (
          paginate(posts, currentPage, 8)
            .filter((post: Post) => post.title.toLowerCase().includes(search))
            .map((item: Post) => (
              <div
                // href={`/posts/${item._id}`}
                key={item._id}
                className="flex flex-col justify-between gap-y-6 bg-white p-3 rounded-md cursor-pointer hover:shadow-md hover:shadow-gray-300 "
              >
                <Link href={`/posts/${item._id}`}>
                  <div
                    className="text-sm font-bold"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></div>
                  <div
                    className="text-sm my-4 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(item.content, 100),
                    }}
                  ></div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs italic text-gray-400">
                        {item.updatedAt ? "Updated" : "Created"}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatDate(
                          item.updatedAt ? item.updatedAt : item.createdAt
                        )}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs italic text-gray-400">Author</p>
                      <span className="text-sm text-gray-500">
                        {item.username}
                      </span>
                    </div>
                  </div>
                </Link>
                {item.username === userData.username && (
                  <div className="flex justify-between">
                    <button
                      className="border border-red-500 text-red-500  p-1 px-3 rounded-md text-xs"
                      onClick={() => router.push(`/posts/edit/${item._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="border-none bg-red-500 text-white  p-1 px-3 rounded-md text-xs"
                      onClick={() =>
                        dispatch(deletePosts({ postId: item._id }))
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
                {/* </div> */}
              </div>
            ))
        ) : (
          <div className="bg-white p-3 rounded-md cursor-pointer flex-1 ">
            <h1 className="text-sm text-center font-semibold">
              No Posts Available
            </h1>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={posts.length > 0 ? Math.ceil(posts.length / 8) : 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Posts;
