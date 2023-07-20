import { useEffect } from "react";
import Nanobar from "nanobar";

const LoadingBar = () => {
  useEffect(() => {
    const nanobar = new Nanobar({ id: "zoa-bar" });
    return () => {
      nanobar.go(100);
    };
  }, []);
  return null;
};

export default LoadingBar;
