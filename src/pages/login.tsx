import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/core";
import { useLoginMutation} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";


const Login: React.FC<{}> = ({}) => {
  const router= useRouter();
  const [, login] = useLoginMutation();
    return (
      <Wrapper variant="small">
        <Formik 
        initialValues={{ UsernameOrEmail: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
            <Form>
              <InputField 
              name="UsernameOrEmail" 
              placeholder="username or email" 
              label="Username or Email"
              />
              <Box mt={4}>
              <InputField 
              name="password" 
              placeholder="password" 
              label="Password"
              type="password"
              />
            </Box>
            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
              Login
            </Button>
            </Form>
            )}
        </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Login);