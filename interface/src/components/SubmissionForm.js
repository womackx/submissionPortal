class SubmissionForm extends Component {
    constructor() {
        this.state = {
            url: ""
        }
    }

    handleChange = (valueName) => (event) => this.setState({[valueName]: event.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .onSubmit(this.state);
        this.setState({url: ""});
    }

    render() {
        return (
            <div className="submissionForm" onSubmit={this.handleSubmit}>
                <h2>
                    Name: {this.props.name}</h2>
                <h2>
                    Time: {this.props.key}</h2>
                <h3>
                    Time: {this.props.timeLeft}</h3>

                <form>
                    <input
                        type="text"
                        name="url"
                        value={this.state.url}
                        onChange={this.handleChange("url")}/>
                </form>
            </div>
        );
    }
}