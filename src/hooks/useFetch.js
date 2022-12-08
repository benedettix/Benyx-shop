import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
        setDataCopy(res.data);
      } catch (err) {
        setError("Couldn't fetch the data");
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError("Couldn't fetch the data");
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch, setData, dataCopy };
};

export default useFetch;
