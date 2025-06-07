import { useState } from "react";

import MoodHeader from "../components/MoodHeader";
import GuidedForm from "../components/GuidedForm";
import FreeInput from "../components/FreeInput";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mood = () => {
    const [selection, setSelection] = useState(null); // null | "guided" | "text"

    return (
        <div>
        {!selection ? (
            <MoodHeader onSelect={setSelection} />
        ) : selection === "guided" ? (
            <div>
                <GuidedForm />
                <ToastContainer />
            </div>
        ) : (
            <div>
                <FreeInput />
                <ToastContainer />
            </div>
        )}
        </div>
    );
}

export default Mood;