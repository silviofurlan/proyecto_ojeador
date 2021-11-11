import { Redirect } from "react-router";
import { useContext } from "react/cjs/react.development";
import { AuthTokenContext } from "../../index";
import { useUserAccount } from "../../hooks/useUserAccount";
import { UserInfo } from "../UserInfo";
import UserProfiles from "../UserProfiles";
import NewProfileForm from "../NewProfileForm";

export default function MyAccount() {
    const { token } = useContext(AuthTokenContext);
    const [userAccount] = useUserAccount(token);

    if (token) {
        return (
            <div className='App'>
                <header className='App-header'>
                    <div className='main'>
                        <UserInfo resume={userAccount} />
                        <UserProfiles />
                        <NewProfileForm />
                    </div>
                </header>
            </div>
        );
    }
    return <Redirect to='/login' />;
}
