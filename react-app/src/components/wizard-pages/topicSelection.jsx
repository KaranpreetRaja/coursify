import React from 'react';

export default function TopicSelection({ visibility, topics, selectedTopics, onTopicChange }) {

    const handleSelection = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            onTopicChange([...selectedTopics, value]);
        } else {
            onTopicChange(selectedTopics.filter(topic => topic !== value));
        }
    };

    return (
        <div className={visibility ? '' : 'hidden'}>
            <div className="font-sans text-sm bg-white h-3/4 p-8 rounded-lg w-full my-auto">
                <div className="flex justify-between items-center mb-11">
                    <h1 className="text-3xl font-semibold">Select Course topics</h1>
                </div>
                <div>
                    {topics.map((topic, index) => (
                        <div className="checkbox-wrapper-4">
                            <input
                                type="checkbox"
                                id={`topic-${index}`}
                                name="creationOption"
                                value={topic}
                                checked={selectedTopics.includes(topic)}
                                onChange={handleSelection}
                                className="inp-cbx"
                            />
                            <label className="cbx" htmlFor={`topic-${index}`}>
                                <span>
                                    <svg width="12px" height="10px"></svg>
                                </span>
                                <span>{topic}</span>
                            </label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
