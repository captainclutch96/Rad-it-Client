import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
interface registerProps {}
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/core";

export const Register: React.FC<registerProps> = ({}) => {
    return (
      <Wrapper variant="small">
        <Formik 
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
            console.log(values);
        }}
      >
        {({ isSubmitting }) => (
            <Form>
              <InputField 
              name="username" 
              placeholder="username" 
              label="Username"
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
              Register
            </Button>
            </Form>
            )}
        </Formik>
        </Wrapper>
    );
};

export default Register;