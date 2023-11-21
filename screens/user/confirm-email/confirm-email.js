// import React, { useEffect } from 'react';
// import { Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { connect } from 'react-redux';
// import actionCreator from '../store/action-creator';
// import {fetchSessionRequest} from "../reusable/requests/session/sessionRequest";
// import {confirmEmailRequest} from "../reusable/requests/user/userRequest";
//
// const ConfirmEmail = (props) => {
//     const navigation = useNavigation()
//
//     useEffect(() => {
//         confirmEmail();
//     }, []);
//
//     const fetchSession = async () => {
//         const res = await fetchSessionRequest()
//
//         if (!res.ok) {
//             props.getSessionError()
//         } else {
//             const data = await res.json()
//             props.getSessionSuccess(data)
//         }
//     }
//
//     const confirmEmail = async () => {
//         const confirmToken = props.navigation.getParam('confirmToken', '');
//         const res = await confirmEmailRequest(confirmToken);
//         const json = await res.json();
//
//         if (res.ok) {
//             await fetchSession();
//             navigation.navigate('SignIn');
//             Alert.alert('Your mail has been confirmed');
//             return json;
//         }
//     };
// };
//
// const ConnectedConfirmEmail = connect(null, actionCreator)(ConfirmEmail);
// export default ConnectedConfirmEmail;
