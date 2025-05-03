import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { data } from "../../data";
import "./Home.css"; // CSS fayl

const Home = () => {
    const [jins, setJins] = useState("");
    const [yoshOraligi, setYoshOraligi] = useState("");
    const [availableSymptoms, setAvailableSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [result, setResult] = useState([]);

    const ageOptions = ["0-12", "13-18", "19-35", "36-100"];

    // Jins va yosh oralig‘iga qarab simptomlarni yangilash
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
            setResult([]);
        }
    }, [jins, yoshOraligi]);

    // Simptom tanlash yoki olib tashlash
    const toggleSymptom = (symptom) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    // Tashxis funksiyasi — 1 ta simptom bo‘lsa to‘liq mos, 2+ bo‘lsa 50% mos
    const handleDiagnosis = () => {
        const filtered = data.filter(
            (item) =>
                item.jins.includes(jins) &&
                item.yoshOraligi.includes(yoshOraligi)
        );
    
        let matched = [];
    
        if (selectedSymptoms.length === 1) {
            // Faqat bitta simptom tanlangan bo‘lsa: uni o‘z ichiga olgan barcha kasalliklar
            matched = filtered.filter((item) =>
                item.simptomlar.includes(selectedSymptoms[0])
            );
        } else if (selectedSymptoms.length >= 2) {
            // Kamida 2 ta simptom bo‘lsa: 60% yoki undan ko‘p mos bo‘lgan kasalliklar
            matched = filtered.filter((item) => {
                const matchCount = selectedSymptoms.filter((s) =>
                    item.simptomlar.includes(s)
                ).length;
                return matchCount / selectedSymptoms.length >= 0.6;
            });
        }
    
        // Agar hech narsa topilmasa, bitta "topilmadi" degan natija qaytariladi
        if (matched.length === 0) {
            setResult([{ kasallik: "Mos keluvchi kasallik topilmadi", image: null }]);
        } else {
            setResult(matched); // Hamma mos kasalliklar chiqariladi
        }
    };
    
    // Formani tozalash
    const handleReset = () => {
        setJins("");
        setYoshOraligi("");
        setAvailableSymptoms([]);
        setSelectedSymptoms([]);
        setResult([]);
    };

    return (
        <div className="home-container">
            <Header />
            <h2 className="title">
                Sizga bir nechta savollarni beraman, javobingizga qarab tashxis qo‘yaman
            </h2>

            {/* Jins tanlash */}
            <div className="radio-group">
                <label>Jins:</label>
                <div className="options">
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
            </div>

            {/* Yosh oraligi tanlash */}
            {jins && (
                <div className="radio-group">
                    <label>Yosh oralig‘i:</label>
                    <div className="options">
                        {ageOptions.map((age) => (
                            <label key={age}>
                                <input
                                    type="radio"
                                    name="age"
                                    value={age}
                                    checked={yoshOraligi === age}
                                    onChange={(e) =>
                                        setYoshOraligi(e.target.value)
                                    }
                                />
                                {age}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Simptomlar tanlash */}
            {availableSymptoms.length > 0 && (
                <div className="symptom-section">
                    <h3>Simptomlarni tanlang:</h3>
                    <div className="symptom-buttons">
                        {availableSymptoms.map((symptom) => (
                            <button
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                className={
                                    selectedSymptoms.includes(symptom)
                                        ? "active"
                                        : ""
                                }
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

            {/* Natijalar */}
            {result.length > 0 && (
                <div className="result-section">
                    <h3>Natijalar:</h3>
                    {result.map((item, index) => (
                        <div key={index} className="result-item">
                            <p>
                                <strong>Kasallik:</strong> {item.kasallik}
                            </p>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.kasallik}
                                    className="result-image"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
