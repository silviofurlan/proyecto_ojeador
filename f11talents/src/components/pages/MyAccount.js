import { Redirect } from "react-router";
import { useContext } from "react/cjs/react.development";
import { AuthTokenContext } from "../../index";
import { useUserAccount } from "../../hooks/useUserAccount";
import UserProfiles from "../UserProfiles";
import { UserInfo } from "../UserInfo";
import Divisoria from "../Divisoria";

export default function MyAccount() {
    const { token, user } = useContext(AuthTokenContext);
    const [userAccount] = useUserAccount(token);

    if (token) {
        if (user.role === "scout") {
            return (
                <>
                    <div>
                        <Divisoria />

                        <div className='contenedorBanner'>
                            <div className='datosBanner'>
                                <h1>Hola usuario Ojeador</h1>
                            </div>
                        </div>
                    </div>
                    <div className='contenedorWrapperPerfil'>
                        <div className='userInfo'>
                            <UserInfo resume={userAccount} />
                        </div>
                    </div>
                </>
            );
        }
        return (
            <>
                <Divisoria />
                <div className='contenedorBanner'>
                    <div className='datosBanner'>
                        <h1>Hola usuario Familia</h1>
                    </div>
                </div>

                <div className='contenedorWrapperPerfil'>
                    <div className='userInfo'>
                        <div>
                            <UserInfo resume={userAccount} />
                        </div>
                    </div>
                </div>

                <UserProfiles />
            </>
        );
    }
    return <Redirect to='/login' />;
}
