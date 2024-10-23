import React, { useEffect, useState } from "react";
import { account, databases } from "../../services/appwriteConfig";
import { Query } from "appwrite";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./Profile.css";
import GoBack from "../../assets/go_back.png";
import ProfilePicha from "../../assets/Profilepicha.png";
import EditProfile from "../../assets/editprofile.svg";
import GraduationCap from "../../assets/Graduation_cap.png";
import Books from "../../assets/books.png";

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [Profile, setProfile] = useState([]);
    const userID = "648436770231600bf3e7";

    useEffect(() => {
        const getData = account.get();
        getData.then(
            function (response) {
                setUserDetails(response.$id);
            },
            function (error) {
                console.log(error);
            }
        );
    }, [userDetails]);

    useEffect(() => {
        const getProfile = databases.listDocuments(
            "6475bc41d08143bd0b2e",
            "6477c45dbbca449075e2",
            [Query.equal("userID", userID)]
        );
        getProfile.then(
            function (response) {
                setProfile(response.documents);
            },
            function (error) {
                console.log(error);
            }
        );
    }, []);

    const categoryMap = {
        "Interesting Facts": {
            // Personality traits
            "Brave Heart": true,
            "Loyal Soul": true,
            "Quick Wit": true,
            Ambitious: true,

            // Social preferences
            "Party Lover": true,
            Introvert: true,
            "Close Circle": true,
            "Online Social": true,
            "Outdoor Person": true,

            // Schedule and habits
            "Early Bird": true,
            "Night Owl": true,
            "Flexible Schedule": true,

            // Music and entertainment
            "Pop Fan": true,
            "Rock Fan": true,
            "Country Fan": true,
            "Music Lover": true,

            // Cleanliness
            "Neat Freak": true,
            "Tidy Person": true,
            "Messy, but cleans": true,
        },
        "Compatibility Preference": {
            // Living preferences
            "Pet Lover": true,
            "Pet Allergic": true,
            "Not a Dog Person": true,
            "Not a Cat Person": true,
            "Pet Tolerant": true,

            // Dietary preferences
            "Non-Vegetarian": true,
            Vegetarian: true,
            "Jain Diet": true,
            "Veg Roommate": true,
            "Halal/Kosher": true,
            "No Diet Restriction": true,

            // Roommate preferences
            "Neat Roomie": true,
            "Social Roomie": true,
            "Privacy Freak": true,
            "Easy Going": true,
            Responsible: true,

            // Gender preference
            "No Preference": true,
            "Female Flatmate": true,
        },
    };

    const modifyAnswer = (answer) => {
        const cleanAnswer = answer?.trim();
        switch (cleanAnswer) {
            // Hogwarts Houses
            case "Gryffindor":
                return "Brave Heart";
            case "Hufflepuff":
                return "Loyal Soul";
            case "Ravenclaw":
                return "Quick Wit";
            case "Slytherin":
                return "Ambitious";
            case "What's Hogwarts":
                return "Muggle";

            // Cleanliness
            case "I'm a neat freak":
                return "Neat Freak";
            case "Pretty tidy":
            case "I keep things pretty tidy":
                return "Tidy Person";
            case "I can be messy, but I clean up after myself":
                return "Messy, but cleans";
            case "My living space is pretty cluttered":
                return "Cluttered Space";

            // Social
            case "Going out to parties and events":
                return "Party Lover";
            case "Hosting small gatherings at home":
                return "Introvert";
            case "Having a few close friends over":
                return "Close Circle";
            case "Online communities and forums (e.g., social media groups, online gaming)":
                return "Online Social";
            case "Outdoor activities (e.g., hiking, sports, game nights)":
                return "Outdoor Person";

            // Schedule
            case "Early bird, the early bird catches the worm!":
                return "Early Bird";
            case "I like to sleep in a bit, but I am not a night owl!":
                return "Late Riser";
            case "I'm a night owl , I like staying up late!":
            case "I'm a night owl, I love staying up late":
                return "Night Owl";
            case "I'm somewhere in between. i can adjust my schedule":
                return "Flexible Schedule";
            case "My schedule changes depending on the day's tasks and priorities.":
                return "Variable Schedule";

            // Music
            case "Pop music all the way !":
                return "Pop Fan";
            case "Rock and roll":
                return "Rock Fan";
            case "Country":
                return "Country Fan";
            case "Any song that feels good":
                return "Music Lover";
            case "Don't like music":
                return "Music Averse";

            // Pets
            case "Absolutely, I love pets!":
                return "Pet Lover";
            case "I have allergies, so not ideal for me":
                return "Pet Allergic";
            case "No dogs":
                return "Not a Dog Person";
            case "No cats":
                return "Not a Cat Person";
            case "As long as they're well behaved":
                return "Pet Tolerant";

            // Food
            case "Non-veg":
                return "Non-Vegetarian";
            case "Veg":
                return "Vegetarian";
            case "Chinese":
                return "Chinese Food Fan";
            case "Italian/Mediterranean":
                return "Mediterranean Fan";
            case "Something else":
                return "Diverse Tastes";

            // Roommate
            case "Someone who's neat and tidy":
                return "Neat Roomie";
            case "Someone who's outgoing and social":
                return "Social Roomie";
            case "Someone who's respectful of privacy":
                return "Privacy Freak";
            case "Someone who's easy going and relaxed":
                return "Easy Going";
            case "Someone who's responsible and reliable":
                return "Responsible";

            // Gender
            case "Nah, I'm cool":
                return "No Preference";
            case "Yes, I would prefer":
                return "Female Flatmate";

            // Diet
            case "Yes, I'm jain":
                return "Jain Diet";
            case "I don't prefer Non-veg eating roommate":
                return "Veg Roommate";
            case "Nah, I'm cool with anything":
                return "No Diet Restriction";
            case "Yes, I'm vegan/vegetarian":
                return "Vegan/Vegetarian";
            case "I follow halal/kosher dietary laws":
                return "Halal/Kosher";

            default:
                return cleanAnswer;
        }
    };

    const getUniqueFactsByCategory = (category) => {
        if (!Profile || Profile.length === 0) {
            return <div>No facts available</div>;
        }

        const uniqueFactsSet = new Set();
        Profile.forEach((profile) => {
            const modifiedAnswer = modifyAnswer(profile.answer);
            if (modifiedAnswer && categoryMap[category]?.[modifiedAnswer]) {
                uniqueFactsSet.add(modifiedAnswer);
            }
        });

        const uniqueFacts = Array.from(uniqueFactsSet);

        if (uniqueFacts.length === 0) {
            return <div>No {category.toLowerCase()} available</div>;
        }

        return uniqueFacts.map((fact, index) => (
            <div key={index} className="fact-container">
                <h4>{fact}</h4>
            </div>
        ));
    };

    return (
        <>
            <Navbar />
            <div className="quiz_mid_container">
                <div className="quiz_mid_container_back">
                    <div className="quiz_mid_container_back_circle">
                        <img src={GoBack} alt="" />
                    </div>
                    <a href="./matchedUsers">Go back</a>
                </div>

                <div className="quiz_mid_profileinfo">
                    <div className="profileinfo_container">
                        <div className="profileinfo_container1">
                            <img
                                src={ProfilePicha}
                                alt=""
                                className="profile_picha"
                            />
                            <div className="profile_deets">
                                {userDetails ? (
                                    <>
                                        <h3>Sarah</h3>
                                    </>
                                ) : (
                                    <div>Please login</div>
                                )}
                                Female, 20
                                <br />
                                <button className="edit_profile">
                                    <img src={EditProfile} alt="" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="profileinfo_container2">
                            <h4>Bio</h4>
                            Friendly and happy-going
                            <br />
                            <div className="bio_salutation">
                                - posted by Sarah
                            </div>
                        </div>

                        <div className="profileinfo_container3">
                            <div className="university">
                                <img src={GraduationCap} alt="" /> Attending
                                Thadomal Shahani Engineering College
                            </div>
                            <div className="branch">
                                <img src={Books} alt="" /> Majoring in
                                Information Technology
                            </div>
                        </div>

                        <div className="profileinfo_container4">
                            <h3>Interesting Facts</h3>
                            <div className="facts-grid">
                                {getUniqueFactsByCategory("Interesting Facts")}
                            </div>
                        </div>

                        <div className="profileinfo_container6">
                            <h3>Compatibility Preference</h3>
                            <div className="facts-grid">
                                {getUniqueFactsByCategory(
                                    "Compatibility Preference"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
