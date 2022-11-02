import {useState, useContext} from "react";
import pluk from "../../../../../pluk-elements";
import userUrl from "../../../../../hooks/userUrl";
import LoaderContext from "../../../../context/LoaderContext";

const HeaderController = () => {
    const {AKS_URL} = userUrl();
    const [subrole, setSubrole] = useState(0);
    const [issuanceHasPolicy, setIssuanceHasPolicy] = useState(true);
    const {setLoading} = useContext(LoaderContext);


    const userSubroleVerifier = (code) => {
        pluk.fetch({
            api: `${AKS_URL}/dbm/getuserprofile`,
            payload: {
                code: code
            },
            success: (data) => {
                setSubrole(data[0].has_sub_role_id)
            }
        })
    }
    const issuanceBasketVerifier = (code, subRole) => {
        setLoading(true)
        pluk.fetch({
            api: `${AKS_URL}/policy/issuancepolicyverifier`,
            payload: {
                employee_ID: code,
                transaction_state: subRole
            },
            success: (data) => {
                console.log(data);
                data.result.length > 0 ? setIssuanceHasPolicy(false) : setIssuanceHasPolicy(true); 
                console.log(data);
            }
        })
    }

    return {
        issuanceHasPolicy,
        setIssuanceHasPolicy,
        issuanceBasketVerifier,
        userSubroleVerifier,
    }
}

export default HeaderController;