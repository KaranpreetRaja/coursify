import { useEffect } from "react";
import Topic from "./topic";

export default function Topic_Selection({ visibility }) {
    return(
        <div className={visibility ? '' : 'hidden'}>
            <div className="font-sans text-sm bg-white h-3/4 p-8 rounded-lg w-full my-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-semibold">Topic Selection</h1>
                </div>

                <div className="w-full overflow-y-scroll h-96 mt-11 w-full justify-center flex flex-wrap">
                    <Topic topicName="Eat a lot" index={1}/>
                    <Topic topicName="Read a book" index={2}/>
                    <Topic topicName="Scratch your belly" index={3}/>
                    <Topic topicName="Do nothing" index={4}/>
                    <Topic topicName="Do nothing again" index={5}/>
                    <Topic topicName="Eat again" index={6}/>
                </div>
            </div>
        </div>
    )
}