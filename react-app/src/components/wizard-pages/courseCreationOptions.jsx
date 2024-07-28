import { useState } from "react";

export default function CourseCreationOptions({ visibility, onChange }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={visibility ? '' : 'hidden'}>
      <div className="font-sans text-sm bg-white h-3/4 p-8 rounded-lg w-full my-auto">
        <div className="flex justify-between items-center mb-11">
          <h1 className="text-3xl font-semibold">Select Course Creation Option</h1>
        </div>
        <div className="radio-group">
          <input
            type="radio"
            id="googleSearch"
            name="creationOption"
            value="googleSearch"
            // checked={selectedOption === 'googleSearch'}
            onChange={handleOptionChange}
            className="radio-input"
          />
          <label htmlFor="googleSearch" className="radio-label">
            <span className="radio-inner-circle"></span>
            Create course using Google Search
          </label>

          <input
            type="radio"
            id="uploadedDocuments"
            name="creationOption"
            value="uploadedDocuments"
            // checked={selectedOption === 'uploadedDocuments'}
            onChange={handleOptionChange}
            className="radio-input"
          />
          <label htmlFor="uploadedDocuments" className="radio-label">
            <span className="radio-inner-circle"></span>
            Create course using uploaded documents
          </label>
        </div>
      </div>
    </div>
  );
}
