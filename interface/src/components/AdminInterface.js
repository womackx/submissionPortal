import React, {Component} from "react";
import CandidateList from "./CandidateList";
import CandidateForm from "./CandidateForm";
import AdminLoginForm from "./AdminLoginForm";
import privates from "../privates";

export default class AdminInterface extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false,
            badLogIn: false,
            candidates: []
        };
        this.loadCandidates();
    }

    loadCandidates = () => {
        fetch(`${privates.ip}`).then((response) => response.json().then((actualResponse) => this.setState({candidates: actualResponse})));
    }

    deleteUser = (id) => {
        const newCandidates = [...this.state.candidates].filter((candidate) => candidate._id !== id);
        this.setState({candidates: newCandidates});
        const request = new Request(`${privates.ip}/` + id, {method: "DELETE"});
        fetch(request);
    }

    createCandidate = ({name, exerciseURL, hoursGiven}) => {
        const randomPin = Math.floor(Math.random() * 999999);
        const timeGiven = hoursGiven;
        const userObj = {
            name,
            givenKey: randomPin,
            url: "",
            submitted: false,
            countDownDate: 0,
            exerciseURL,
            timeGiven
        };
        const request = new Request(`${privates.ip}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        });
        fetch(request).then((responseObj) => {
            const newCandidates = [...this.state.candidates];
            responseObj
                .json()
                .then((newCandidate) => {
                    newCandidates.push(newCandidate);
                    this.setState({candidates: newCandidates});
                });
        });
    }

    login = ({nb1234}) => {
        if (nb1234 === "qacadmin124") {
            this.setState({loggedIn: true});
        } else {
            this.setState({badLogin: true});
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <div>
                    <CandidateList deleteUser={this.deleteUser} candidates={this.state.candidates}/>
                    <CandidateForm onSubmit={this.createCandidate}/>
                </div>
            );
        } else {
            return (
                <div>
                    <AdminLoginForm onSubmit={this.login} badLogin={this.state.badLogin}/>
                </div>
            );
        }
    }
}