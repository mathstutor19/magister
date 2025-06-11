import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { data } from "../../data";
import "./Home.css";
import { Link } from "react-router-dom";

// Ma'lumot strukturasining interfeysi
interface KasallikItem {
    jins: string[];
    yoshOraligi: string[];
    simptomlar: string[];
    kasallik: string;
    image: string | null;
}

const Home: React.FC = () => {
    const [jins, setJins] = useState<string>("");
    const [yoshOraligi, setYoshOraligi] = useState<string>("");
    const [availableSymptoms, setAvailableSymptoms] = useState<string[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [result, setResult] = useState<KasallikItem[]>([]);

    const ageOptions: string[] = ["0-12", "13-18", "19-35", "36-100"];

    useEffect(() => {
        if (jins && yoshOraligi) {
            const filtered = (data as KasallikItem[])
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

        const toggleSymptom =async (symptom: string) => {
             const filtered = (data as KasallikItem[])
                .filter((item) => item.jins.includes(jins))
                .filter((item) => item.yoshOraligi.includes(yoshOraligi))
                  const allSymptoms = [
                ...new Set(filtered.filter((d) => d.simptomlar.includes(symptom)).flatMap((d)=>d.simptomlar)),
            ];
            setAvailableSymptoms(allSymptoms)
               
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    //   const toggleSymptom = (symptom: string) => {
    //     setSelectedSymptoms((prev) =>
    //         prev.includes(symptom)
    //             ? prev.filter((s) => s !== symptom)
    //             : [...prev, symptom]
    //     );
    // };

    const handleDiagnosis = () => {
        const filtered = (data as KasallikItem[]).filter(
            (item) =>
                item.jins.includes(jins) &&
                item.yoshOraligi.includes(yoshOraligi) 
        );

        let matched: KasallikItem[] = [];

        if (selectedSymptoms.length === 1) {
            matched = filtered.filter((item) =>
                item.simptomlar.includes(selectedSymptoms[0])
            );
            console.log(matched,'1')
        } else  {
            console.log(selectedSymptoms)
            for(let item of selectedSymptoms){
                matched=filtered.filter((i) =>
                i.simptomlar.includes(item)
            );
            }
            matched = filtered.filter((item) => {
                const matchCount = selectedSymptoms.filter((s) =>
                    item.simptomlar.includes(s)
                ).length;
                return matchCount / selectedSymptoms.length >= 0.6;
            });
        }

        if (matched.length === 0) {
            setResult([
                {
                    kasallik: "Mos keluvchi kasallik topilmadi",
                    image: null,
                    jins: [],
                    yoshOraligi: [],
                    simptomlar: [],
                },
            ]);
        } else {
            setResult(matched);
        }
    };

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
                Sizga bir nechta savollarni beraman, javobingizga qarab tashxis
                qo‘yaman
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
            {result.length > 0 && (<>
                    <h3>Natijalar:</h3>
                <div className="result-section">
                    {result.sort((a,b)=>a.simptomlar.length-b.simptomlar.length).map((item, index) => (
                        <div key={index} className="result-item">
                              <span className="result-percentage">{Math.round(selectedSymptoms.length *100 / item.simptomlar.length)}%</span>
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.kasallik}
                                    className="result-image"
                                />
                            )}
                            <div className="result-content">
                                <p>
                                    <strong>Kasallik:</strong> {item.kasallik}
                                </p>
                                <Link to={`card/${item.id}`} className="result-button" >Batafsil</Link>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    );
};

export default Home;
