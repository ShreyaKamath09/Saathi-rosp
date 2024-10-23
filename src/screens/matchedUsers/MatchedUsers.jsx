import React, { useState, useEffect } from "react";
import { client, databases } from "../../services/appwriteConfig";
import { Query } from "appwrite";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./MatchedUsers.css";
import ProfilePicha from "../../assets/Profilepicha.png";
import ProfileIcon from "../../assets/ProfileIcon.png";
import HomeIcom from "../../assets/HomeIcon.png";
import YourProfileIcon from "../../assets/YourProfileIcon.png";
import UpgradeIcon from "../../assets/UpgradeIcon.png";
import CoolDude from "../../assets/CoolDude.png";

const MatchedUsers = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [all, setAll] = useState([]);
    const [matchingAnswers, setMatchingAnswers] = useState([]);
    const displayedUserIDs = [];
    const displayedAnswers = [];
    const userID = "648436770231600bf3e7";

    useEffect(() => {
        const answer = currentUser.map((user) => user.answer);
        setAnswers(answer);
    }, [currentUser]);

    useEffect(() => {
        const getProfile = databases.listDocuments(
            "6475bc41d08143bd0b2e",
            "6477c45dbbca449075e2",
            [Query.equal("userID", userID)]
        );
        getProfile.then(
            function (response) {
                setCurrentUser(response.documents);
            },
            function (error) {
                console.log(error);
            }
        );
    }, []);

    useEffect(() => {
        const getAll = databases.listDocuments(
            "6475bc41d08143bd0b2e",
            "6477c45dbbca449075e2"
        );
        getAll.then(
            function (response) {
                setAll(response.documents);
            },
            function (error) {
                console.log(error);
            }
        );
    }, []);

    useEffect(() => {
        const matches = all.filter((user) => answers.includes(user.answer));
        const matchingAnswersData = matches.map((match) => ({
            userID: match.userID,
            answer: match.answer,
        }));
        setMatchingAnswers(matchingAnswersData);
    }, [answers, all]);

    console.log(matchingAnswers);

    const displayingAnswer = (answer) => {
        switch (answer?.trim()) {
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

            // Cleanliness Preferences
            case "I'm a neat freak":
                return "Neat Freak";
            case "Pretty tidy":
            case "I keep things pretty tidy":
                return "Tidy Person";
            case "I can be messy, but I clean up after myself":
                return "Messy, but cleans";
            case "My living space is pretty cluttered":
                return "Cluttered Space";

            // Social Preferences
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

            // Sleep Schedule
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

            // Music Preferences
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

            // Pet Preferences
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

            // Food Preferences
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

            // Roommate Preferences
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

            // Gender Preference
            case "Nah, I'm cool":
                return "No Preference";
            case "Yes, I would prefer":
                return "Female Flatmate";

            // Dietary Restrictions
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
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="matchedUsersMid">
                <div className="part1MU">
                    <h4>
                        {" "}
                        <img
                            src={ProfilePicha}
                            alt=""
                            srcSet=""
                            className="ProfilePicha"
                        />{" "}
                        Sarah
                    </h4>
                    <p>
                        <img src={ProfileIcon} alt="" srcSet="" />
                        <a href="./matchedUsers">Your Matches</a>
                    </p>
                    <p>
                        <img src={HomeIcom} alt="" srcSet="" />
                        <a href="./findflat">Find Flats</a>
                    </p>
                    <p>
                        <img src={YourProfileIcon} alt="" srcSet="" />
                        <a href="./profile">Your Profile</a>
                    </p>
                    <p>
                        <img src={UpgradeIcon} alt="" srcSet="" />
                        Upgrade
                    </p>
                </div>
                <div className="part2MU">
                    <h2>Your Matches</h2>
                    {matchingAnswers.map((match) => {
                        if (
                            match.userID !== "648436770231600bf3e7" &&
                            !displayedUserIDs.includes(match.userID)
                        ) {
                            displayedUserIDs.push(match.userID);
                            return (
                                <div key={match.userID}>
                                    <div className="matchusercontainer">
                                        <img
                                            src={CoolDude}
                                            alt=""
                                            srcSet=""
                                            height={"200 rem"}
                                        />
                                        <div className="match_info">
                                            <h4>{match.userID}</h4>
                                            <div className="request">
                                                <button>Request</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="part3MU">
                    <h2>Match Preferences</h2>
                    {matchingAnswers.map((match) => {
                        const displayedAnswerText = displayingAnswer(
                            match.answer
                        );

                        if (
                            match.userID !== "648436770231600bf3e7" &&
                            displayedAnswerText &&
                            !displayedAnswers.includes(displayedAnswerText)
                        ) {
                            displayedAnswers.push(displayedAnswerText);
                            return (
                                <div key={match.answer}>
                                    <p>{displayedAnswerText}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MatchedUsers;
