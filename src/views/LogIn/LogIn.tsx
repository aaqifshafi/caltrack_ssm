import { FC, ReactElement, useContext, useState } from "react";
import { loginUser } from "../../services/auth.services";
import AccountBase from "../../components/Base/AccountBase/AccountBase";
import { Formik, Field } from "formik";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Button,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PASSWORD_MIN_LENGTH } from "../../common/constants";
import { AppContext } from "../../context/AppContext/AppContext";
import { useLocation, useNavigate } from "react-router";

const LogIn: FC = (): ReactElement => {
  const { setContext } = useContext(AppContext);

  const [show, setShow] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toast = useToast();

  return (
    <AccountBase>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
          setLoading(true);
          loginUser(values.email, values.password)
            .then((credential) =>
              setContext({
                user: credential.user,
                userData: null,
              })
            )
            .then(() => {
              navigate(location.state || "/activity", { replace: true });
              toast({
                title: "Welcome back!",
                description: "Log calories to continue your fitness journey.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
                variant: "subtle",
              });
              setEmailError(false);
              setPasswordError(false);
            })
            .catch((e) => {
              switch (e.message) {
                case "Firebase: Error (auth/user-not-found).":
                  setEmailError(true);
                  setPasswordError(false);
                  break;
                case "Firebase: Error (auth/wrong-password).":
                  setPasswordError(true);
                  setEmailError(false);
                  break;
              }
            })
            .finally(() => setLoading(false));
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack p={10}>
              <FormControl pr={4} isInvalid={emailError}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
                <FormErrorMessage>Email doesn&apos;t exist.</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  (!!errors.password && touched.password) || !!passwordError
                }
                isRequired={true}
                pr={4}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    validate={(value: string) => {
                      return value.length < PASSWORD_MIN_LENGTH
                        ? "Password must contain at least 6 characters"
                        : null;
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" onClick={() => setShow(!show)}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password || "Password is incorrect."}
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack mb={8}>
              <HStack>
                <Button type="submit" colorScheme="purple" isLoading={loading}>
                  Log In
                </Button>
                <Button onClick={() => navigate("/")}>Cancel</Button>
              </HStack>
              <Text fontSize="sm">
                Not yet a member? Join us now!
                <Button
                  colorScheme="yellow"
                  variant="link"
                  ml={2}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </Text>
            </VStack>
          </form>
        )}
      </Formik>
    </AccountBase>
  );
};

export default LogIn;
