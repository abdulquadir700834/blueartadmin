import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  useEditEmailTemplateMutation,
} from "../Store/Store";
import { ToastContainer, toast } from "react-toastify";

const Email = (props) => {
  const [editTemplate, responseInfo] = useEditEmailTemplateMutation();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  console.log("props", props)
  const post = {
    key: props.key ? props.key : null,
    emailtemplate_id: props.id,
    subject: subject,
    content: content,
  };
  const handleInputChange = (e, editor) => {
    setContent(editor.getData());
    console.log("values", content);
  };
  const handleChange = (e) => {
    setSubject(e.target.value);
    console.log(subject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("post", post);
    editTemplate(post);
    alert("updated ");
  };

  useEffect(() => {

    if (responseInfo?.data?.status === true) {
      toast?.success(responseInfo?.data?.message)
    } else {
      toast?.error(responseInfo?.data?.message)
    }

  }, [responseInfo])

  const API_URl = "https://noteyard-backend.herokuapp.com"
  const UPLOAD_ENDPOINT = "api/blogs/uploadImg";

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("uploadImg", file);
            fetch(`${API_URl}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body
            })
              .then((res => res.json()))
              .then((res) => {
                resolve({ default: `${API_URl}/${res.url}` })
              })
              .catch((err) => {
                reject(err);
              })
          })
        })
      }
    }
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>


        <div className="ck-mar">
          <div class="mb-3">
            <label class="form-label">Subject</label>
            <input
              type="text"
              class="form-control card shadow"
              placeholder="Subject"
              name="subject"
              defaultValue={props.subject}
              onChange={handleChange}
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Content</label>
            <CKEditor
              config={{
                extraPlugins: [uploadPlugin]
              }}
              editor={ClassicEditor}
              data={props.content}
              class="form-control"
              onChange={(e, editor) => {
                handleInputChange(e, editor);
              }}
            />
          </div>


          <div className="col-12 text-center">
            <ToastContainer />
            <input
              style={{ width: "auto", padding: "8px 20px" }}
              className="btn btn-primary  rounded-pill"
              type="submit"
              value={"Submit"}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Email;
