import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast("Please Select an Image!");
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "ankur2227");
      fetch("https://api.cloudinary.com/v1_1/ankur2227/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast("Please Select an Image!")
      setPicLoading(false);
      return;
    }
  };