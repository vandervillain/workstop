import * as React from 'react';

interface P {
}

interface S {
}

class Profile extends React.Component<P, S> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="profile-page row">
            </div>
        );
    }
}

export default Profile;
