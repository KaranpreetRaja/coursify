import React from 'react';

export default function TopicSelection({ visibility, topics, selectedTopics, onTopicChange }) {

    const handleSelection = (event) => {
        const { value, checked } = event.target;
        const topic = JSON.parse(value);

        if (checked) {
            onTopicChange([...selectedTopics, topic]);
        } else {
            onTopicChange(selectedTopics.filter(selectedTopic => selectedTopic.topic !== topic.topic));
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
                        <div className="checkbox-wrapper-4" key={index}>
                            <input
                                type="checkbox"
                                id={`topic-${index}`}
                                name="creationOption"
                                value={JSON.stringify(topic)}
                                checked={selectedTopics.some(selectedTopic => selectedTopic.topic === topic.topic)}
                                onChange={handleSelection}
                                className="inp-cbx"
                            />
                            <label className="cbx" htmlFor={`topic-${index}`}>
                                <span>
                                    <svg width="12px" height="10px">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </span>
                                <span>{topic.topic}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
