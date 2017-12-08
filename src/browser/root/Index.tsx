import * as React from "react";

class Index extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <div className="splash-container">
                    <div className="splash">
                        <a href="/feed" style={{ textDecoration: "none" }}>
                            <h1 className="splash-head">Title</h1>
                        </a>
                        <p className="splash-subhead">Subtitle</p>
                        <p>
                            <a href="/feed" className="pure-button pure-button-primary">
                                Action
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
