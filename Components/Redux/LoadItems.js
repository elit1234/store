import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../Redux/store";

const LoadItems = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/api/loadAllItems")
      .then((res) => {
        if (res && res.data) {
          dispatch(
            setItems({
              featuredItems: res.data.featured,
              notFeatured: res.data.notFeatured,
              lastUpdated: rightNow,
            })
          );
        }
      })
      .catch(function (err) {
        alert("Something went wrong reaching the server");
      });
  };

  useEffect(() => {
    let rightNow = Math.floor(Date.now() / 1000);
    if (!items.lastUpdated) fetchData();
    else {
      const timeDiff = rightNow - items.lastUpdated;
      if (timeDiff > 3600) fetchData();
    }
  }, []);

  return null;
};

export default LoadItems;
