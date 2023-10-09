"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { store } from "../../globalStore/store";
function withAuth<T>(Component) {
  const token = store?.getState()?.post.token;
  // eslint-disable-next-line react/display-name
  return (props: T) => {
    // make a api call to check if user is authenticated
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const accessToken = store.getState().post.token;

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        redirect("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <Component {...props} />;
    }
    return null;
  };
}

export default withAuth;
