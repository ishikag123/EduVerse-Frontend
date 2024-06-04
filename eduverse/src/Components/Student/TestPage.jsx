import React from "react";
import { useContext, useState } from "react";
import { getAllStudents, uploadVideo } from "../../Services/api";
import { AccountContext } from "../../Context/AccountProvider";

export const TestPage = () => {
  const { student, stoken } = useContext(AccountContext);
  const [video, setVideo] = useState();

  const uploadDemoVideo = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", video);
    data.append("upload_preset", "EduVerse_Preset");
    console.log(video);
    try {
      const vidURL = await uploadVideo(data);
      console.log(vidURL);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <button onClick={() => getStudents()}>Get students</button>
      <h1>{student.email}</h1> */}
      <form action="" onSubmit={uploadDemoVideo}>
        <input
          type="file"
          id="vidFile"
          //style={{ display: "none" }}
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <button>Upload</button>
      </form>
    </div>
  );
};
