import { useState } from "react";
import { toast } from "react-toastify";
const usePostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (url, data) => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    console.log("token", token);
    console.log("url", url);
    console.log("data", data);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponse(result);
      if (!res.ok) {
        toast.error(result.message);
      } else {
        console.log("result", result);
        toast.success(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};

export default usePostData;
