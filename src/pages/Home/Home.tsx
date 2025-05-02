import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { data } from "../../data";
import './Home.css'; // CSS faylni import qilish

const Home = () => {
    const [jins, setJins] = useState("");
    const [yoshOraligi, setYoshOraligi] = useState("");
    const [availableSymptoms, setAvailableSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [result, setResult] = useState(null);

    const ageOptions = ["0-12", "13-18", "19-35", "36-100"];

    // Simptomlarni yangilash
    useEffect(() => {
        if (jins && yoshOraligi) {
            const filtered = data
                .filter((item) => item.jins.includes(jins))
                .filter((item) => item.yoshOraligi.includes(yoshOraligi));

            const allSymptoms = [
                ...new Set(filtered.flatMap((d) => d.simptomlar)),
            ];
            setAvailableSymptoms(allSymptoms);
            setSelectedSymptoms([]);
            setResult(null);
        }
    }, [jins, yoshOraligi]);

    const toggleSymptom = (symptom) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleDiagnosis = () => {
        const matched = data.find(
            (item) =>
                item.jins.includes(jins) &&
                item.yoshOraligi.includes(yoshOraligi) &&
                selectedSymptoms.every((s) => item.simptomlar.includes(s))
        );
        setResult(
            matched || {
                kasallik: "Mos keluvchi kasallik topilmadi",
                image: null,
            }
        );
    };

    const handleReset = () => {
        setJins("");
        setYoshOraligi("");
        setAvailableSymptoms([]);
        setSelectedSymptoms([]);
        setResult(null);
    };

    return (
        <div className="home-container">
            <Header />
            <h2 className="title">
                Sizga bir nechta savollarni beraman, javobingizga qarab tashxis qo'yaman
            </h2>

            {/* Jins tanlash */}
            <div className="radio-group">
                <label>Jins:</label>
                <br />
                {["erkak", "ayol"].map((j) => (
                    <label key={j}>
                        <input
                            type="radio"
                            name="gender"
                            value={j}
                            checked={jins === j}
                            onChange={(e) => setJins(e.target.value)}
                        />
                        {j.charAt(0).toUpperCase() + j.slice(1)}
                    </label>
                ))}
            </div>

            {/* Yosh oralig‘i tanlash */}
            {jins && (
                <div className="radio-group">
                    <label>Yosh oralig‘i:</label>
                    <br />
                    {ageOptions.map((age) => (
                        <label key={age}>
                            <input
                                type="radio"
                                name="age"
                                value={age}
                                checked={yoshOraligi === age}
                                onChange={(e) => setYoshOraligi(e.target.value)}
                            />
                            {age}
                        </label>
                    ))}
                </div>
            )}

            {/* Simptomlarni tanlash */}
            {availableSymptoms.length > 0 && (
                <div className="symptom-section">
                    <h3>Simptomlarni tanlang:</h3>
                    <div className="symptom-buttons">
                        {availableSymptoms.map((symptom) => (
                            <button
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                className={selectedSymptoms.includes(symptom) ? "active" : ""}
                            >
                                {symptom}
                            </button>
                        ))}
                    </div>

                    <div className="button-group">
                        <button onClick={handleDiagnosis} className="diagnose">
                            Tashxisni ko‘rish
                        </button>
                        <button onClick={handleReset} className="reset">
                            Qayta boshlash
                        </button>
                    </div>
                </div>
            )}

            {/* Natija */}
            {result && (
                <div className="result-section">
                    <h3>Natija:</h3>
                    <p><strong>Kasallik:</strong> {result.kasallik}</p>
                    {result.image && (
                        <img src={result.image} alt={result.kasallik} />
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
