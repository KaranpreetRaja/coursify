import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import File from "../file.jsx"
import axios from 'axios';

export default function FileUpload({ visibility, onChange }) {
  const [blobs, setBlobs] = useState([])
  const [files, setFiles] = useState([])

  const fileToBlob = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const textDecoder = new TextDecoder('utf-8');
    const blob = textDecoder.decode(arrayBuffer);
    return blob;
  };

  const handleFileUpload = async (e) => {
    const selectedFiles = e.target.files;
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const blobContents = await Promise.all(
      Array.from(selectedFiles).map(async (file) => {
        const blob = await fileToBlob(file);
        return blob;
      })
    );

    setBlobs((prevBlobs) => [...prevBlobs, ...blobContents]);
  };

  useEffect(() => {
    onChange(files)
  }, [files])

  return (
    <div className={visibility ? '' : 'hidden'}>
      <div className="font-sans text-sm bg-white h-3/4 p-8 rounded-lg w-full my-auto ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Upload Documents</h1>

          <label className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus:outline-none focus:ring focus:border-blue-300 flex flex-row items-center space-x-2 cursor-pointer">
            <AiOutlineArrowUp />
            <span>Upload Files</span>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="w-full overflow-y-scroll h-96 mt-11 space-y-4 ml-2">
          {
            files.map((value, index) => {
              <File FileName={"W"} Size={123} />
            })
          }

          {/* <File
                FileName="Dog Stories"
                Size={`${3311} Bytes`}
              />
              <File
                FileName="Dog Stories"
                Size={`${3311} Bytes`}
              />
              <File
                FileName="Dog Stories"
                Size={`${3311} Bytes`}
              /> */}
        </div>
      </div>
    </div>
  )
}