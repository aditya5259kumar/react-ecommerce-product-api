import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const docEl = document.documentElement;
    const body = document.body;
    const prevScrollBehavior = docEl.style.scrollBehavior;
    try {
      docEl.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      body.scrollTop = 0; // for Safari
      docEl.scrollTop = 0;
    } finally {
      requestAnimationFrame(() => {
        docEl.style.scrollBehavior = prevScrollBehavior || "";
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
