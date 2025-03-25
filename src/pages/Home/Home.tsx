import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./Home.css";
import { data } from "../../data";
import Card from "../../components/Card/Card";
const Home = () => {
    const [filterData, setFilterData] = useState(data);
    function handleChange(event) {
      
        const chandeData = data.filter((item) =>
            item.detail.toLocaleLowerCase().includes(event.target.value)
        );
        setFilterData(chandeData);
    }
    return (
        <div className="home">
            <Header />
            <input
                onChange={handleChange}
                className="search__input"
                type="text"
                placeholder="Kasallik belgilarini vergul bilan yozing"
            />
            <ul className="card__wrapper">
                {filterData.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        detail={item.detail}
                        image={item.image}
                    />
                ))}
            </ul>
                {filterData.length===0 ? <h2>Bunday kasallik topilmadi. Iltimos shifokorga murojat qiling.</h2>:""}
        </div>
    );
};

export default Home;
