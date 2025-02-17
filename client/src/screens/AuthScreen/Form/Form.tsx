import { View, TextInput, TouchableOpacity, Text } from "react-native";
import React, { FC, useState } from "react";
import { validateAuthDetails } from "../../../utils/validateAuthDetails";
import { useAppDispatch } from "../../../hooks/useRedux";
import { setIsAuth } from "../../../redux/users/slice";
import { login, register } from "../../../redux/users/slice";

interface IForm {
  type: "login" | "register";
}
const Form: FC<IForm> = ({ type }) => {
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  const validateForm = () => {
    const validationError = validateAuthDetails(
      authData.username,
      authData.email,
      authData.password,
      type
    );
    if (validationError) {
      setErrorMessage(validationError);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleFormSubmit = async () => {
    if (validateForm()) {
      let error = "";
      if (type === "login") {
        dispatch(
          login({
            email: authData.email,
            password: authData.password,
          })
        );
      } else {
        dispatch(
          register({
            username: authData.username,
            email: authData.email,
            password: authData.password,
          })
        );
      }
      if (!error) {
        dispatch(setIsAuth(true));
      }
      setErrorMessage(error);
    }
  };
  return (
    <View
      className="flex justify-center items-center w-full"
      style={{ gap: 40 }}
    >
      <View className="w-full" style={{ gap: 20 }}>
        {type === "register" && (
          <TextInput
            className="w-full h-[50px] rounded-md bg-[#48484864] font-[Montserrat-Medium] px-4 text-white"
            placeholder="Username"
            placeholderTextColor="#737373"
            onChangeText={(text) =>
              setAuthData({ ...authData, username: text })
            }
          />
        )}
        <TextInput
          className="w-full h-[50px] rounded-md bg-[#48484864] font-[Montserrat-Medium] px-4 text-white"
          placeholder="Email"
          placeholderTextColor="#737373"
          onChangeText={(text) => setAuthData({ ...authData, email: text })}
        />
        <TextInput
          className="w-full h-[50px] rounded-md bg-[#48484864] font-[Montserrat-Medium] px-4 text-white"
          placeholder="Password"
          placeholderTextColor="#737373"
          secureTextEntry
          onChangeText={(text) => setAuthData({ ...authData, password: text })}
        />
        {errorMessage && (
          <Text className="text-red-600 font-[Montserrat-Medium]">
            {errorMessage}
          </Text>
        )}
      </View>
      <TouchableOpacity
        className="flex flex-row justify-center w-full rounded-md bg-white"
        onPress={handleFormSubmit}
      >
        <Text className="text-black text-lg py-2 font-[Montserrat-SemiBold]">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
