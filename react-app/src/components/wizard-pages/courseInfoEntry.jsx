import { useEffect, useState } from "react";
import Topic from "../topic";

export default function CourseInfoEntry({ visibility, onChange }) {
  const [course_name, setCourseName] = useState('');
  const [course_description, setCourseDescription] = useState('');

  const handleInputChange = () => {
    onChange({ course_name, course_description});
  };

  return (
    <div className={visibility ? '' : 'hidden'}>
      <div className="font-sans text-sm bg-white h-3/4 p-8 rounded-lg w-full my-auto">
        <div className="flex justify-between items-center mb-11">
          <h1 className="text-3xl font-semibold">Course Information</h1>
        </div>

          {/* Input box for name */}
          <div>
              <label htmlFor="courseName" className="block text-lg text-gray-600 mb-2">
              Course Name:
              </label>
              <input
              type="text"
              id="courseName"
              className="w-full border border-gray-300 p-2 rounded-md text-md"
              placeholder="Enter course name"
              onChange={(e) => {
                setCourseName(e.target.value);
                handleInputChange();
              }}
              />
          </div>

          <p className="text-lg text-gray-600 mt-4 mb-4">
              Please provide a brief description of your course (Optional):
          </p>
          <textarea
              className="w-full border border-gray-300 p-2 rounded-md text-md max-h-20"
              placeholder="Add a description..."
              onChange={(e) => {
                setCourseDescription(e.target.value);
                handleInputChange();
              }}
          ></textarea>

      </div>
    </div>

  );
}
