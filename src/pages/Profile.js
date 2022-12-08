import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, IMG, Input, Label, ProfileWrapper } from "../styles";
// import styled from "styled-components";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import axios from "axios";
import { storage } from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username);
  const [password, setPassword] = useState(currentUser?.password);
  const [email, setEmail] = useState(currentUser?.email);
  const [img, setImg] = useState(currentUser?.img);
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState("");
  const P = styled.p`
    font-size: 18px;
    color: white;
  `;
  const updateProfile = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.put("/users/" + currentUser.id, {
        username,
        password,
        email,
        img: url,
      });

      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err.err));
      console.log(err);
    }
  };
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setUrl(url);
        });
      }
    );
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItmes: "center",
      }}
    >
      <ProfileWrapper>
        <Form onSubmit={(e) => updateProfile(e)}>
          <Label for="username">Your Username:</Label>
          <Input
            type="text"
            placeholder="Enter your new username"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <Label for="password">Your Password:</Label>
          <Input
            type="password"
            placeholder="Enter your new password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Label for="email">Your Email:</Label>
          <Input
            type="email"
            placeholder="Enter your new email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="file">
            <div>
              <span>Add Image</span>
            </div>
          </Label>

          <input type="file" accept="image/*" onChange={handleChange} />

          {url ? (
            <button disabled>Uploaded</button>
          ) : (
            <button onClick={(e) => handleUpload(e)}>Upload to Firebase</button>
          )}

          {file && <P>{percent} "% done"</P>}
          <div>
            {url ? (
              <IMG style={{ marginTop: "15px" }} src={url} alt="" />
            ) : (
              <IMG
                style={{ marginTop: "15px" }}
                src={img.includes("https:") ? img : "./avatar.png"}
                alt=""
              />
            )}
          </div>

          <Button>
            {loading ? (
              <CircularProgress style={{ width: "30px", height: "30px" }} />
            ) : (
              "Update Profile"
            )}{" "}
          </Button>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
        </Form>
      </ProfileWrapper>
    </Container>
  );
}

export default Profile;
